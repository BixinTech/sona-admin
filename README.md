<h1 align="center">
  <a href="https://github.com/BixinTech/sona-admin" target="_blank">sona-admin</a>
</h1>

<div align="center">

sona 语音房间通用解决方案后台管理系统。

[![license](https://img.shields.io/github/license/bixintech/sona-admin)](https://opensource.org/licenses/Apache-2.0) ![version](https://img.shields.io/github/package-json/v/bixintech/sona-admin) ![vue](https://img.shields.io/github/package-json/dependency-version/bixintech/sona-admin/vue?color=brightgreen) [![docs](https://img.shields.io/badge/docs-wiki-orange)](https://github.com/BixinTech/sona-admin/wiki)

</div>

![sona-admin-home](https://raw.githubusercontent.com/BixinTech/sona-admin/main/docs/sona-admin-home.png)

## 介绍

sona 平台是一个搭建语音房产品的全端解决方案，包含了房间管理、实时音视频、房间IM、长连接网关等能力。经历了比心语音房业务多年的检验，支持各种基于房间的业务场景快速方便接入，比如聊天室、直播间、游戏开黑等。

sona-admin 平台为 sona 语音房间通用解决方案后台管理系统。

## 特性

- 房间配置查询
- 房间热切
- 单、混流回溯
- 长连、客户端错误、房间消息日志查询

## 支持环境

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Edge                                                         | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              |

## 安装与启动

### 使用 npm 或 yarn 安装

```shell
npm install
```

```shell
yarn install
```

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

### 配置 api 地址

```typescript
// src/api/index.ts 文件内配置 api 地址

axios.defaults.baseURL = 'yourApiUrl'
```

### 使用 npm 或 yarn 启动项目

```shell
npm rum serve
```

```shell
yarn serve
```

## 链接

- [文档](https://github.com/BixinTech/sona-admin/wiki)
- [问答](https://github.com/BixinTech/sona-admin/issues)

## 生态

| 项目 | 描述 |
| --- | --- |
| [sona-server](https://github.com/BixinTech/sona-server) | sona 语音房间通用解决方案的 服务端 端项目。 |
| [sona-android](https://github.com/BixinTech/sona-android) | sona 语音房间通用解决方案的 Android 端项目。 |
| [sona-ios](https://github.com/BixinTech/sona-ios) | sona 语音房间通用解决方案的 iOS 端项目。 |
