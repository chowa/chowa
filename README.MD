<p align="center">
    <img width="200" src="http://upload.ouliu.net/i/20200108181725zq75v.png" width="240">
</p>

# Chowa

UI component library based on React

[![Build Status](https://travis-ci.org/chowa/chowa.svg?branch=master)](https://travis-ci.org/chowa/chowa)
[![npm](https://img.shields.io/npm/v/chowa.svg)](https://www.npmjs.com/package/chowa)
[![npm](https://img.shields.io/npm/dm/chowa.svg)](https://www.npmjs.com/package/chowa)
[![NPM downloads](https://img.shields.io/npm/dt/chowa.svg)](https://npmjs.org/package/chowa)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://opensource.org/licenses/MIT)
[![Gitter](https://badges.gitter.im/chowa/community.svg)](https://gitter.im/chowa/community) [![Join the chat at https://gitter.im/chowa-fe/community](https://badges.gitter.im/chowa-fe/community.svg)](https://gitter.im/chowa-fe/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Documents

[Click to read the document](https://chowa.github.io/chowa/)

## Features

* Ecologically complete peripheral tools
* Uniform visual interaction and rich types of components
* Typescript development, providing complete type definition files
* Theme customization, [Vector font icon extension](https://github.com/chowa/cwfont), Multilingual

## Install

```
npm i chowa --save
```

```
yarn add chowa
```

## Usage

```jsx
import { Container, Alert } from 'chowa';

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


### Import style

```js
// css
import 'chowa/dist/chowa.css';
// sass
import 'chowa/es/styles'
```

## Local development

```
git clone https://github.com/chowa/chowa.git
cd chowa
npm install
npm run dev
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Chowa
