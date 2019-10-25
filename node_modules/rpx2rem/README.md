# rpx2rem
fork from [px2rem](https://github.com/songsiqi/px2rem)
convert rpx unit to rem

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/px2rem.svg?style=flat-square
[npm-url]: https://npmjs.org/package/rpx2rem
[travis-image]: https://img.shields.io/travis/qingyangmoke/rpx2rem.svg?style=flat-square
[travis-url]: https://travis-ci.org/qingyangmoke/rpx2rem
[coveralls-image]: https://img.shields.io/coveralls/qingyangmoke/rpx2rem.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/qingyangmoke/rpx2rem
[downloads-image]: http://img.shields.io/npm/dm/rpx2rem.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/rpx2rem

This set of tools contains:

* a CLI tool
* [webpack loader](https://www.npmjs.com/package/rpx2rem-loader)
* [postcss plugin](https://www.npmjs.com/package/postcss-rpx2rem)

## Usage


### CLI tool

```
$ npm install -g rpx2rem
```
```
$ rpx2rem -o build src/*.css
```

```
  Usage: rpx2rem [options] <file...>

  Options:

    -h, --help                      output usage information
    -V, --version                   output the version number
    -u, --remUnit [value]           set `rem` unit value (default: 100)    
    -r, --remVersion [value]        whether to generate rem version stylesheet (default: true)
    -p, --remPrecision [value]      set rem value precision (default: 6)
    -o, --output [path]             the output file dirname
```

### API

```
var Rpx2rem = require('rpx2rem');
var rpx2remIns = new Rpx2rem([config]);
var originCssText = '...';
var newCssText = rpx2remIns.generateRem(originCssText); // generate rem version
```

### Example

#### Pre processing:

One raw stylesheet: `test.css`

```
.selector {
  width: 150rpx;
  height: 64rpx;
  font-size: 28rpx;
  border: 1px solid #ddd;
}
```

#### After processing:

rpx version: `test.1.css`

```
.selector {
  width: 150rpx;
  height: 64rpx;
  font-size: 28rpx;
  border: 1px solid #ddd;
}
```

rem version: `test.1.css`

```
.selector {
  width: 1.5rem;
  height: 0.64rem;
  font-size: 0.28rem;
  border: 1px solid #ddd;
}
```

## Technical proposal

comment hook + css parser

## Change Log

## License

MIT
