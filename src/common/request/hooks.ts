import { request } from "@tarojs/taro";
import { useRequest as useQuery } from "taro-hooks";
import { BaseOptions, BaseResult, LoadMoreOptions, PaginatedOptionsWithFormat } from "taro-hooks/dist/useRequest/types";
import { getItem } from "../utils";
import { LocalStorageKeys } from "../enums";
import { config } from "./config";
import { useToken } from "../state";

export interface requestOptions {
  url?: string;
  coverUrl?: string;
  method?: string;
  data?: any;
  token?: string;
}

const asyncFn = ({ url, data, method, token }: { url: string; data: any; method: any; token?: string }) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      data,
      method,
      header: {
        authorization: (config.bearerToken ? "Bearer " : "") + (token || getItem(LocalStorageKeys.token) || null)
      }
    })
      .then(res => {
        const resp = res.data.hasOwnProperty("data") ? res.data.data : res.data;
        resolve(resp);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const useRequest = (
  { url, data, method = "POST", coverUrl }: requestOptions,
  options?: PaginatedOptionsWithFormat<any, any, any> | BaseOptions<any, any> | LoadMoreOptions<any>
): BaseResult<any, any> => {
  // const reqToken = getItem("token");
  const { token: reqToken } = useToken();

  return useQuery(
    (payload: any, option?: { httpUrl: string; token?: string }) => {
      const { httpUrl, token } = option || {};
      return asyncFn({
        token,
        method,
        data: {
          ...data,
          ...payload
        },
        url: httpUrl || coverUrl || String(config.baseUrl) + url
      });
    },
    { ...(options as any), ready: reqToken && !!config.baseUrl }
  );
};
