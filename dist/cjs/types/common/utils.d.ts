/**
 * 格式化日期
 * @param date
 * @param fmt
 * @returns
 */
export declare function formatDate(date?: Date, fmt?: string): string;
/**
 * @description 获取缩放图片
 * @param url 目标图片
 * @param w 宽
 * @param h 高
 */
export declare function getScaleImageURL(urls: string, w: number, h: number): string;
/**
 * @description: 判断是否是今天
 * @param {number} timer 时间戳
 * @return {*}
 */
export declare function isToday(timer: number | string): boolean;
/**
 * @description: 获取路由中的参数
 * @param {string} query
 * @param {string} variable
 * @param {boolean} isExclude
 * @return {*}
 */
export declare function getQueryVariable(query: string, variable: string, isExclude?: boolean): string | {
    query: string;
} | undefined;
/**
 * @description: 数字转中文数字
 * @param {number} num
 * @return {*}
 */
export declare const changeNumToHan: (num: number) => string;
