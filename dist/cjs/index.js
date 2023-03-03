"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("@tarojs/taro"),n=require("@tarojs/components");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var a=r(e),o=function(){return o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},o.apply(this,arguments)};function l(e,t,n,r){return new(n||(n=Promise))((function(a,o){function l(e){try{c(r.next(e))}catch(e){o(e)}}function i(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,i)}c((r=r.apply(e,t||[])).next())}))}function i(e,t){var n,r,a,o,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,i[0]&&(l=0)),l;)try{if(n=1,r&&(a=2&i[0]?r.return:i[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return l.label++,{value:i[1],done:!1};case 5:l.label++,r=i[1],i=[0];continue;case 7:i=l.ops.pop(),l.trys.pop();continue;default:if(!(a=l.trys,(a=a.length>0&&a[a.length-1])||6!==i[0]&&2!==i[0])){l=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){l.label=i[1];break}if(6===i[0]&&l.label<a[1]){l.label=a[1],a=i;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(i);break}a[2]&&l.ops.pop(),l.trys.pop();continue}i=t.call(e,l)}catch(e){i=[6,e],r=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}function c(e,t,n){if(n||2===arguments.length)for(var r,a=0,o=t.length;a<o;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))}var s,u={exports:{}};
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
s=u,function(){var e={}.hasOwnProperty;function t(){for(var n=[],r=0;r<arguments.length;r++){var a=arguments[r];if(a){var o=typeof a;if("string"===o||"number"===o)n.push(a);else if(Array.isArray(a)){if(a.length){var l=t.apply(null,a);l&&n.push(l)}}else if("object"===o){if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]")){n.push(a.toString());continue}for(var i in a)e.call(a,i)&&a[i]&&n.push(i)}}}return n.join(" ")}s.exports?(t.default=t,s.exports=t):window.classNames=t}();var f=u.exports,d=function(t){var r=t.status,o=t.setStatus,l=t.closeOnClickModal,i=void 0===l||l,c=t.onClose,s=t.onCancel,u=t.children,d=t.cRef,p=t.hideBG;t.hideClose;var g=t.arg,m=e.useState(!1),h=m[0],v=m[1];e.useEffect((function(){return v(r)}),[r]);var w=function(){v(!1),setTimeout((function(){return o(g||!1)}),150)};return e.useImperativeHandle(d,(function(){return{close:w}})),a.default.createElement(n.View,{catchMove:!0,className:f("sd_modal",{show:r}),onClick:function(){i&&w(),c&&c(),s&&s()}},a.default.createElement(n.View,{onClick:function(e){return e.stopPropagation()},className:f("sd_modal-scale-".concat(h?"in":"out"),{bg:!p})},u))},p=function(){return a.default.createElement(n.View,{className:"sd_line-loading"},a.default.createElement(n.View,{className:"sd_line-loading-light"}))},g=function(e){var t=e.children;return a.default.createElement(n.View,{className:"sd_circle-loading"},a.default.createElement(n.View,{className:"sd_circle-loading-content"},a.default.createElement(n.View,{className:"sd_circle-loading-content-line-1"}),a.default.createElement(n.View,{className:"sd_circle-loading-content-line-2"}),a.default.createElement(n.View,{className:"sd_circle-loading-content-line-3"}),a.default.createElement(n.View,{className:"sd_circle-loading-content-text"},t)))};exports.BottomModal=function(e){var t=e.status,r=e.setStatus,o=e.closeOnClickModal,l=void 0===o||o,i=e.onClose,c=e.children,s=e.rounded;return a.default.createElement(n.View,{className:f("sd_bottom-modal",{show:t}),onClick:function(){return l&&(i&&i(),void(r&&r(!1)))}},a.default.createElement(n.View,{className:f("bg sd_bottom-modal-content",{active:t,rounded:s}),onClick:function(e){return e.stopPropagation()}},a.default.createElement(n.View,{className:"sd_bottom-modal-content-main"},c)))},exports.Dialog=function(t){var r=t.status,o=t.setStatus,l=t.content,i=t.onClick,c=t.onCancel,s=l.title,u=l.desc,f=l.btnText,p=e.useRef();return a.default.createElement(d,{cRef:p,status:r,setStatus:o,onCancel:c},a.default.createElement(n.View,{className:"sd_dialog"},a.default.createElement(n.View,{className:"sd_dialog-title"},s),a.default.createElement(n.View,{className:"sd_dialog-desc"},u),a.default.createElement(n.Button,{className:"sd_dialog-btn",onClick:function(){var e;return i&&i(null===(e=p.current)||void 0===e?void 0:e.close)}},f)))},exports.Loading=function(e){var t=e.circle,n=e.children;return t?a.default.createElement(g,null,n):a.default.createElement(p,null)},exports.Modal=d,exports.changeNumToHan=function(e){var t=["零","一","二","三","四","五","六","七","八","九"],n=["","十","百","千","万","十","百","千","亿","十","百","千","万","十","百","千","亿"];if(!e||isNaN(e))return"零";for(var r=e.toString().split(""),a="",o=0;o<r.length;o++){var l=r.length-1-o;a=n[o]+a,a=t[r[l]]+a}return a=(a=(a=(a=(a=(a=a.replace(/零(千|百|十)/g,"零").replace(/十零/g,"十")).replace(/零+/g,"零")).replace(/零亿/g,"亿").replace(/零万/g,"万")).replace(/亿万/g,"亿")).replace(/零+$/,"")).replace(/^一十/g,"十")},exports.formatDate=function(e,t){void 0===e&&(e=new Date),void 0===t&&(t="yyyy-MM-dd hh:mm:ss");var n={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var r in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),n)new RegExp("("+r+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?n[r]:("00"+n[r]).substr((""+n[r]).length)));return t},exports.getQueryVariable=function(e,t,n){for(var r=e.split("?"),a=0;a<r.length;a++){var o=r[a].split("=");if(n)o[0]==t&&r.splice(a,1);else if(o[0]==t)return decodeURIComponent(o[1])}if(!t||n)return{query:decodeURIComponent(r.join("&"))}},exports.getScaleImageURL=function(e,t,n){if(!e)return"";var r=(null==e?void 0:e.split(","))[0];return r?"".concat(r,"?imageMogr2/thumbnail/").concat(t,"x").concat(n):""},exports.isToday=function(e){return new Date(e).toDateString()===(new Date).toDateString()},exports.navigateBack=function(e){t.navigateBack(o(o({},e),{fail:function(){t.reLaunch({url:"/pages/index/index"})}}))},exports.useLoadMore=function(n,r,a){var s=n.data,u=n.run,f=n.mutate,d=n.loading,p=(s||{}).hasNextPage;function g(){return l(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return d||!p?[2]:[4,u(a?a(r):{page:r})];case 1:return e.sent(),f((function(e){return o(o({},e),{items:c(c([],s.items,!0),e.items,!0)})})),r+=1,[2]}}))}))}return r=1===r?2:r||1,e.useEffect((function(){return function(){r=1}}),[]),t.useReachBottom(g),{refetchData:g}},exports.useShowFetch=function(e,n,r){void 0===n&&(n={});var a=e.refresh;t.useDidShow((function(){a&&(a(n),r&&r())}))};
//# sourceMappingURL=index.js.map
