import { useEffect } from "react";
import { reLaunch, useDidShow, navigateBack as originNavigateBack, useReachBottom as useOriginReachBottom } from "@tarojs/taro";

/**
 * 页面触底无限滚动
 * @param model useRequest 返回的数据模型
 * @param pageKey 分页页码的 storeKey(在搜索，切换tab场景中需将页码置为1)
 * @param varFn 变量函数
 */
export function useLoadMore(model: any, page: number, varFn?: Function) {
  const { data, run, mutate, loading } = model;
  const { hasNextPage } = data || {};
  page = page === 1 ? 2 : page || 1;

  // 页面或组件销毁时将页码置为1
  useEffect(() => {
    return () => {
      page = 1;
    };
  }, []);

  async function refetchData() {
    if (loading || !hasNextPage) return;
    await run(varFn ? varFn(page) : { page });

    mutate((newData: any) => {
      return {
        ...newData,
        items: [...data.items, ...newData.items]
      };
    });
    page += 1;
  }
  useOriginReachBottom(refetchData);

  return { refetchData };
}

/**
 * @description: 路由返回
 * @param {any} opt
 * @return {*}
 */
export function navigateBack(opt?: any) {
  originNavigateBack({
    ...opt,
    fail() {
      reLaunch({ url: "/pages/index/index" });
    }
  });
}

/**
 * 页面显示刷新数据（该 hook 不可用到条件渲染的子组件中，比如 if 切换或者 map 渲染）
 * @param model useRequest 返回的对象
 * @param variables 刷新数据的变量
 */
export function useShowFetch(model: any, opt = {}, cb?: () => any) {
  const { refresh } = model;
  useDidShow(() => {
    if (!refresh) return;
    refresh(opt);
    cb && cb();
  });
}
