'use strict';

var css = require('css');
var extend = require('extend');

var defaultConfig = {
  remUnit: 100, // rem unit value (default: 75)
  remPrecision: 6, // rem value precision (default: 6)
};

var rpxRegExp = /\b(\d+(\.\d+)?)rpx\b/;

function Rpx2rem(options) {
  this.config = {};
  extend(this.config, defaultConfig, options);
}

// generate rem version stylesheet
Rpx2rem.prototype.generateRem = function (cssText) {
  var self = this;
  var config = self.config;
  var astObj = css.parse(cssText);

  function processRules(rules, noDealPx) {
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      if (rule.type === 'media') {
        processRules(rule.rules); // recursive invocation while dealing with media queries
        continue;
      } else if (rule.type === 'keyframes') {
        processRules(rule.keyframes, true); // recursive invocation while dealing with keyframes
        continue;
      } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
        continue;
      }

      var declarations = rule.declarations;
      for (var j = 0; j < declarations.length; j++) {
        var declaration = declarations[j];
        if (declaration.type === 'declaration' && rpxRegExp.test(declaration.value)) {
          declaration.value = self._getCalcValue('rem', declaration.value); // common transform
        }
      }

      // if the origin rule has no declarations, delete it
      if (!rules[i].declarations.length) {
        rules.splice(i, 1);
        i--;
      }

    }
  }

  processRules(astObj.stylesheet.rules);

  return css.stringify(astObj);
};

// get calculated value of px or rem
Rpx2rem.prototype._getCalcValue = function (type, value, dpr) {
  var config = this.config;
  var pxGlobalRegExp = new RegExp(rpxRegExp.source, 'g');

  function getValue(val) {
    val = parseFloat(val.toFixed(config.remPrecision)); // control decimal precision of the calculated value
    return val == 0 ? val : val + type;
  }

  return value.replace(pxGlobalRegExp, function ($0, $1) {
    return getValue($1 / config.remUnit);
  });
};

module.exports = Rpx2rem;