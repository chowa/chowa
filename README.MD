<p align="center">
    <img width="200" src="http://upload.ouliu.net/i/20200108181725zq75v.png" width="240">
</p>

# react-chowa

UI component library based on React

[![Build Status](https://travis-ci.org/chowa/react-chowa.svg?branch=master)](https://travis-ci.org/chowa/react-chowa)
[![npm](https://img.shields.io/npm/v/react-chowa.svg)](https://www.npmjs.com/package/react-chowa)
[![npm](https://img.shields.io/npm/dm/react-chowa.svg)](https://www.npmjs.com/package/react-chowa)
[![NPM downloads](https://img.shields.io/npm/dt/react-chowa.svg)](https://npmjs.org/package/react-chowa)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://opensource.org/licenses/MIT)
[![Gitter](https://badges.gitter.im/react-chowa/community.svg)](https://gitter.im/react-chowa/community)

## Documents

[Click to read the document](https://chowa.github.io/react-chowa/)

## Features

* Ecologically complete peripheral tools
* Uniform visual interaction and rich types of components
* Typescript development, providing complete type definition files
* Theme customization, [Vector font icon extension] (https://github.com/chowa/cwfont), Multilingual

## Install

```
npm i react-chowa --save
```

```
yarn add react-chowa
```

## Usage

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


### Import style

```js
// css
import 'react-chowa/dist/react-chowa.css';
// sass
import 'react-chowa/es/styles'
```

## Local development

```
git clone https://github.com/chowa/react-chowa.git
cd react-chowa
npm install
npm run dev
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Chowa
