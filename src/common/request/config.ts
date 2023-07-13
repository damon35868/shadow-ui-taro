import { configTypes } from "./types";

export const config: configTypes = {
  baseUrl: "",
  header: {}
};

export function requestConfig(newConfig: configTypes) {
  if (typeof newConfig !== "object") return;
  Object.assign(config, newConfig);

  console.log(`[配置成功]%c ${newConfig}`, "color: #00CC00");
}
