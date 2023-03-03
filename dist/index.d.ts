import { FC, ReactElement } from 'react';

/**
 * 页面触底无限滚动
 * @param model useRequest 返回的数据模型
 * @param pageKey 分页页码的 storeKey(在搜索，切换tab场景中需将页码置为1)
 * @param varFn 变量函数
 */
declare function useLoadMore(model: any, page: number, varFn?: Function): {
    refetchData: () => Promise<void>;
};
/**
 * 路由返回
 */
declare function navigateBack(opt?: any): void;
/**
 * 页面显示刷新数据（该 hook 不可用到条件渲染的子组件中，比如 if 切换或者 map 渲染）
 * @param model useRequest 返回的对象
 * @param variables 刷新数据的变量
 */
declare function useShowFetch(model: any, opt?: {}, cb?: () => any): void;

/**
 * 格式化日期
 * @param date
 * @param fmt
 * @returns
 */
declare function formatDate(date?: Date, fmt?: string): string;
/**
 * @description 获取缩放图片
 * @param url 目标图片
 * @param w 宽
 * @param h 高
 */
declare function getScaleImageURL(urls: string, w: number, h: number): string;
/**
 * @description: 判断是否是今天
 * @param {number} timer 时间戳
 * @return {*}
 */
declare function isToday(timer: number | string): boolean;
/**
 * @description: 获取路由中的参数
 * @param {string} query
 * @param {string} variable
 * @param {boolean} isExclude
 * @return {*}
 */
declare function getQueryVariable(query: string, variable: string, isExclude?: boolean): string | {
    query: string;
} | undefined;
/**
 * @description: 数字转中文数字
 * @param {number} num
 * @return {*}
 */
declare const changeNumToHan: (num: number) => string;

interface ModalProps {
    status: boolean;
    setStatus: Function;
    onClose?: () => any;
    onCancel?: () => any;
    closeOnClickModal?: boolean;
    cRef?: any;
    hideClose?: boolean;
    hideBG?: boolean;
    arg?: any;
    children: ReactElement;
}
declare const Modal: FC<ModalProps>;

interface BottomModalProps {
    status: boolean;
    setStatus?: (state: boolean) => any;
    onClose?: () => any;
    closeOnClickModal?: boolean;
    children: ReactElement;
    rounded?: boolean;
}
declare const BottomModal: FC<BottomModalProps>;

interface DialogProps {
    status: boolean;
    content: {
        title: string;
        desc: string | ReactElement;
        btnText: string;
    };
    onCancel?: () => any;
    setStatus: (state: boolean) => any;
    onClose?: () => any;
    onClick?: (close: any) => any;
}
declare const Dialog: FC<DialogProps>;

interface LoadingProps {
    circle?: boolean;
    children?: ReactElement | string;
}
declare const Loading: FC<LoadingProps>;

export { BottomModal, Dialog, Loading, Modal, changeNumToHan, formatDate, getQueryVariable, getScaleImageURL, isToday, navigateBack, useLoadMore, useShowFetch };
