import { log as logHandler } from "../common/log";
import { configTypes, middlewareConfigType, requestConfigType } from "./types";
import { useInitToken } from "../common/state";
import { config } from "./instance";
export { config } from "./instance";

function requestConfig(reqConfig: requestConfigType | undefined) {
  if (typeof reqConfig !== "object") return;

  Object.assign(config, { request: reqConfig });
  config.log && logHandler.success("[配置请求成功]");
}

function middlewareConfig(middleware: middlewareConfigType | undefined) {
  if (typeof middleware !== "object") return;

  Object.assign(config, { middleware });
  config.log && logHandler.success("[配置中间件成功]");
}

export function globalConfig(newConfig: configTypes) {
  const { request, middleware, log } = newConfig || {};

  Object.assign(config, { log });
  middlewareConfig(middleware);
  requestConfig(request);

  Object.freeze(config);
  config.log && logHandler.success("[全局配置完成，已冻结配置文件]", config);

  return { useInitToken };
}
