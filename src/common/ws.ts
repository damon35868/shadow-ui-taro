import mitt from "mitt";
import { SocketTask, connectSocket } from "@tarojs/taro";
import { getItem } from "./utils";
import { config } from "../config";
import { log } from "./log";

export interface Ws {
  connect(): void;
  close(): void;
  onMessage(): void;
  onError(): void;
  onOpen(): void;
  subscribe(channel: string, data: any, userId: number | null): void;
  listen(): void;
  onClose(): void;
  reConnect(): void;
}

export interface Event {
  EventName: string;
  From: string;
  To: string;
  Data: string;
}

export type WsEventFunc = (event: Event) => void;

export interface WsConnectOptions {
  header: { [key: string]: string };
}

export interface SubscribeEvent {
  EventName: string;
  Data: any;
}

export interface WsHandler {
  [key: string]: (data: any) => void;
}

class WS implements Ws {
  public userId: number | null | undefined;
  public client: SocketTask = {} as SocketTask;
  public inited: boolean | undefined;
  private subscribeEvents: { [key: string]: SubscribeEvent } = {};
  private wsurl: string | undefined;
  private handlers: any = {};
  private timer: any = null;
  private options: any;
  public emitter: any;
  private lastPongTIme: number = 0;
  private initTimer;

  constructor() {
    if (!config.request.wsUrl) {
      config.log && log.error("log连接失败");
      return;
    }
    this.initTimer = setInterval(() => {
      console.log("init websocket");
      if (getItem("token")) {
        const wsUrl = config.request.wsUrl + "?authorization=user$$" + getItem("token");

        this.wsurl = wsUrl;
        this.emitter = mitt();

        this.connect().then(() => {
          this.listen();
        });

        clearInterval(this.initTimer);
      }
    }, 10);
  }
  setOptions(options: WsConnectOptions) {
    this.options = options;
  }

  async connect(): Promise<void> {
    console.log("[ws连接中]");
    this.client = await connectSocket({
      url: this.wsurl,
      // header: {
      //   'authorization': getItem('token')
      // },
      fail: res => {
        console.log("[ws连接失败]", res);
      },
      success: res => {
        console.log("[ws连接成功]", res);
        this.inited = true;
      },
      ...this.options
    });
  }

  //0 - 表示连接尚未建立，1 - 表示连接已建立，可以进行通信，2 - 表示连接正在进行关闭，3 - 表示连接已经关闭或者连接不能打开
  liveProbe(): boolean {
    if (this.client.readyState === 1) {
      clearInterval(this.timer);
      this.timer = null;
      this.reSubscribe();
      this.lastPongTIme = this.now();
      return true;
    }
    return false;
  }

  async reConnect() {
    if (this.timer) return;
    this.timer = setInterval(async () => {
      if (this.liveProbe()) return;
      console.log("ws重连");
      await this.connect();
    }, 3000);
  }

  onError(): void {
    this.client.onError((err: any) => {
      console.log("wss onError", err);
      this.reConnect();
    });
  }

  onOpen(): void {
    this.client.onOpen((_: any) => {
      clearInterval(this.timer);
      this.lastPongTIme = this.now();
    });
  }

  addHandler(key: string, fun: WsHandler) {
    this.handlers[key] = fun;
  }

  onMessage(): void {
    this.client.onMessage(res => {
      const messages = res.data.split("\n");
      // console.log("来消息", messages);
      for (const message of messages) {
        const event = JSON.parse(message);

        // 如果事件名称为 'pong' 代表目前是与后端持续连接中,不需要做任何逻辑判断
        if (event.EventName === "pong") {
          this.lastPongTIme = this.now();
          continue;
        }

        const { userId } = JSON.parse(event.Data || "{}");
        if (this.userId === userId) {
          this.emitter.emit(event.EventName, event);
        }

        // 告知后端已经收到消息,不需要继续发送当前事件的消息
        this.client.send({
          data: JSON.stringify({ EventName: "ack", Data: message })
        });
      }
    });
  }

  on(eventName: string, wsEventFunc: WsEventFunc) {
    if (!this.emitter) return;

    this.emitter.on(eventName, wsEventFunc);
  }

  off(eventName: string, wsEventFunc: WsEventFunc) {
    if (!this.emitter) return;

    this.emitter.off(eventName, wsEventFunc);
  }

  onClose(): void {
    // this.userId = null
    this.client.onClose(_ => {
      this.client.close({
        code: 3001,
        fail: res => console.log("wss close fail ", res),
        success: res => console.log("wss close success ", res)
      });
      this.reConnect();
    });
  }

  reSubscribe() {
    this.listen();
    for (const key in this.subscribeEvents) {
      const event = this.subscribeEvents[key];
      this.client.send({ data: JSON.stringify(event) });
    }
  }

  subscribe(channel: string, data: any, userId: number): void {
    let timer: any;
    this.userId = userId;
    timer = setInterval(() => {
      if (!this.client || this.client.readyState !== 1) {
        return;
      }

      const event = {
        EventName: channel,
        Data: JSON.stringify(data)
      } as SubscribeEvent;
      this.subscribeEvents[channel] = event;
      this.client.send({
        data: JSON.stringify(event)
      });
      clearInterval(timer);
    }, 1000);
  }

  now(): number {
    return Date.now();
  }

  public close() {
    this.client.close({
      code: 3001,
      fail: res => console.log("wss close fail ", res),
      success: res => console.log("wss close success ", res)
    });
  }

  ping() {
    const event = {
      EventName: "ping"
    } as SubscribeEvent;

    setInterval(() => {
      if (this.now() - this.lastPongTIme >= 6000) {
        if (this.timer) return;
        this.client.close({
          code: 3001,
          fail: res => console.log("wss close fail ", res),
          success: res => console.log("wss close success ", res)
        });
        this.reConnect();
      } else {
        this.client.send({
          data: JSON.stringify(event)
        });
      }
    }, 3000);
  }

  async listen() {
    this.onMessage();
    this.onError();
    this.onOpen();
    this.onClose();
    this.ping();
  }
}

export const wsClient = new WS();
