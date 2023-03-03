/**
 * 页面触底无限滚动
 * @param model useRequest 返回的数据模型
 * @param pageKey 分页页码的 storeKey(在搜索，切换tab场景中需将页码置为1)
 * @param varFn 变量函数
 */
export declare function useLoadMore(model: any, page: number, varFn?: Function): {
    refetchData: () => Promise<void>;
};
/**
 * 路由返回
 */
export declare function navigateBack(opt?: any): void;
/**
 * 页面显示刷新数据（该 hook 不可用到条件渲染的子组件中，比如 if 切换或者 map 渲染）
 * @param model useRequest 返回的对象
 * @param variables 刷新数据的变量
 */
export declare function useShowFetch(model: any, opt?: {}, cb?: () => any): void;
