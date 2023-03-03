/**
 * 格式化日期
 * @param date
 * @param fmt
 * @returns
 */
export function formatDate(date: Date = new Date(), fmt: string = "yyyy-MM-dd hh:mm:ss") {
  const o: any = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return fmt;
}

/**
 * @description 获取缩放图片
 * @param url 目标图片
 * @param w 宽
 * @param h 高
 */
export function getScaleImageURL(urls: string, w: number, h: number) {
  if (!urls) return "";
  const urlArr = urls?.split(",");
  const url = urlArr[0];
  if (!url) return "";
  return `${url}?imageMogr2/thumbnail/${w}x${h}`;
}

/**
 * @description: 判断是否是今天
 * @param {number} timer 时间戳
 * @return {*}
 */
export function isToday(timer: number | string): boolean {
  return new Date(timer).toDateString() === new Date().toDateString();
}

/**
 * @description: 获取路由中的参数
 * @param {string} query
 * @param {string} variable
 * @param {boolean} isExclude
 * @return {*}
 */
export function getQueryVariable(query: string, variable: string, isExclude?: boolean) {
  const vars = query.split("?");

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (isExclude) {
      pair[0] == variable && vars.splice(i, 1);
    } else {
      if (pair[0] == variable) return decodeURIComponent(pair[1]);
    }
  }

  if (variable && !isExclude) return undefined;
  return { query: decodeURIComponent(vars.join("&")) };
}

/**
 * @description: 数字转中文数字
 * @param {number} num
 * @return {*}
 */
export const changeNumToHan = (num: number) => {
  let arr1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  let arr2 = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿"];
  if (!num || isNaN(num)) return "零";
  let english = num.toString().split("");
  let result = "";
  for (let i = 0; i < english.length; i++) {
    let des_i = english.length - 1 - i; // 倒序排列设值
    result = arr2[i] + result;
    let arr1_index = english[des_i];
    result = arr1[arr1_index as unknown as number] + result;
  }
  result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十"); // 将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零+/g, "零"); // 合并中间多个零为一个零
  result = result.replace(/零亿/g, "亿").replace(/零万/g, "万"); // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/亿万/g, "亿"); // 将【亿万】换成【亿】
  result = result.replace(/零+$/, ""); // 移除末尾的零
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, "十");
  return result;
};
