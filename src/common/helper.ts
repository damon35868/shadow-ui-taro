import { ErrorCode } from "./enums";
import { toast } from "./utils";

class Helper {
  async run({ apiFn, text, errorText, callback }: { apiFn: () => Promise<any>; text?: string; errorText?: string; callback?: (res: any) => any }) {
    try {
      const res = await apiFn();
      const { code, message } = res || {};
      if (code === ErrorCode.error) throw new Error(message);
      if (code === -1) {
        throw new Error(res.msg && typeof res.msg === "object" ? res.msg.message : `${text}失败`);
      }

      text && toast(`${text}成功`);
      callback && callback(res);
    } catch (e: any) {
      toast(errorText || e.message);
    }
  }
}

export const helper = new Helper();
