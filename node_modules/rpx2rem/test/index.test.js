'use strict';

var assert = require('assert');
var Rpx2rem = require('../lib/rpx2rem');
var path = require('path');
var fs = require('fs');

describe('should work with css file', function () {
  var Rpx2remIns = new Rpx2rem(/*{remUnit: 100}*/{
    remPrecision: 6
  });
  var srcPath = path.resolve('./static/assets/test.1.css');
  var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});

  it('[default] should output right rem file', function () {
    var expectedPath = path.resolve('./static/output/test.1.css');
    var outputText = Rpx2remIns.generateRem(srcText);
    assert.equal(outputText, fs.readFileSync(expectedPath, {encoding: 'utf8'}));
  });
});
 