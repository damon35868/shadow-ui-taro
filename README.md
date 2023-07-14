# shadow-ui-taro

[shadow-ui-taro](https://www.npmjs.com/package/shadow-ui-taro) 是基于 taro 及 react 开发的组件库。

[![npm](https://img.shields.io/npm/v/shadow-ui-taro.svg)](https://www.npmjs.com/package/shadow-ui-taro)
[![npm downloads](https://img.shields.io/npm/dt/shadow-ui-taro.svg)](https://www.npmjs.com/package/shadow-ui-taro)
[![npm license](https://img.shields.io/npm/l/shadow-ui-taro.svg)](https://www.npmjs.com/package/shadow-ui-taro)
[![npm bundle size](https://img.shields.io/bundlephobia/min/shadow-ui-taro.svg)](https://bundlephobia.com/result?p=shadow-ui-taro)
[![npm type definitions](https://img.shields.io/npm/types/shadow-ui-taro.svg)](https://www.npmjs.com/package/shadow-ui-taro)

## Installation / 安装

`npm`

```sh
npm install shadow-ui-taro --save
```

`yarn`

```sh
yarn add shadow-ui-taro
```

## Use / 使用

```tsx
import { BottomModal, Modal, isToday, isEmpty, useLoadMore, ... } from "shadow-ui-taro";
import "shadow-ui-taro/dist/esm/style.css";
```

## Config / 配置

```tsx
import { globalConfig } from "shadow-ui-taro";
// 完成配置后将冻结配置，无法修改，请在入口文件初始化一次即可
globalConfig({
    request:{
        ...
    },
    middleware:{
        ...
    }
})
```

## globalConfig 全局配置

| Property     | Type      | Default | Description  |
| :----------- | :-------- | :------ | :----------- |
| `log`        | `boolean` | `false` | 配置日志显示 |
| `request`    | `object`  | `{}`    | 网络请求配置 |
| `middleware` | `object`  | `{}`    | 中间件配置   |

## 网络请求配置

| Property      | Type      | Default  | Description                |
| :------------ | :-------- | :------- | :------------------------- |
| `baseUrl`     | `string`  | `''`     | 基础请求地址               |
| `header`      | `object`  | `{}`     | 请求头                     |
| `timeout`     | `number`  | `300000` | 请求超时时间 (毫秒)        |
| `bearerToken` | `boolean` | `false`  | token 是否添加 bearer 前缀 |

## 中间件配置

| Property   | Type     | Default                                              | Description  |
| :--------- | :------- | :--------------------------------------------------- | :----------- |
| `userAuth` | `object` | `{filterKey : {phone: "mobilePhone",info: "name" }}` | 用户权限验证 |
