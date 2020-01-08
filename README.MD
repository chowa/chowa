<p align="center">
    <img width="200" src="http://upload.ouliu.net/i/20200108181725zq75v.png" width="240">
</p>

# react-chowa

React中台组件库

[![Build Status](https://travis-ci.org/chowa/react-chowa.svg?branch=master)](https://travis-ci.org/chowa/react-chowa)
[![npm](https://img.shields.io/npm/v/react-chowa.svg)](https://www.npmjs.com/package/react-chowa)
[![npm](https://img.shields.io/npm/dm/react-chowa.svg)](https://www.npmjs.com/package/react-chowa)
[![NPM downloads](https://img.shields.io/npm/dt/react-chowa.svg)](https://npmjs.org/package/react-chowa)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://opensource.org/licenses/MIT)
[![Gitter](https://badges.gitter.im/react-chowa/community.svg)](https://gitter.im/react-chowa/community)

## 文档

> 正在抓紧赶工，请稍后

## 特性

* 生态完善的周边工具
* 视觉交互统一、类型丰富的组件
* Typescript开发，提供完整的类型定义文件
* 支持主题定制、iconfont拓展

## 浏览器支持

* IOS >= 8
* Firefox >= 20
* Android > 4.4
* IE > 9

## React支持

要求React版本 >= 16.0.0

## 安装

```
npm i react-chowa --save
```

```
yarn add react-chowa
```

## 使用

```jsx
import { Container, Alert } from 'react-chowa';

export default App = () => {
    return (
        <Container>
            <Alert
                showIcon
                title='This is an info message'
                content="This is content message"/>
        </Container>
    );
}
```


### 引入样式

```js
// css
import 'react-chowa/dist/react-chowa.css';
// sass
import 'react-chowa/es/styles'
```

## 本地开发

克隆到本地后

```
git clone https://github.com/chowa/react-chowa.git
cd react-chowa
npm install
npm run dev
```

## License

[MIT](http://opensource.org/licenses/MIT)
