#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json');
var Rpx2rem = require('../index');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs-extra');


// string to variables of proper type（thanks to zepto）
function deserializeValue(value) {
  var num;
  try {
    return value ?
      value == "true" || value == true ||
      (value == "false" || value == false ? false :
        value == "null" ? null :
        !/^0/.test(value) && !isNaN(num = Number(value)) ? num :
        /^[\[\{]/.test(value) ? JSON.parse(value) :
        value)
      : value;
  } catch (e) {
    return value;
  }
}

function saveFile(filePath, content) {
  fs.createFileSync(filePath);
  fs.writeFileSync(filePath, content, {encoding: 'utf8'});
  console.log(chalk.green.bold('[Success]: ') + filePath);
}


program.version(pkg.version)
  .option('-u, --remUnit [value]', 'set `rem` unit value (default: 100)', 100)
  .option('-r, --remVersion [value]', 'whether to generate rem version stylesheet (default: true)', true)
  .option('-p, --remPrecision [value]', 'set rem value precision (default: 6)', 6)
  .option('-o, --output [path]', 'the output file dirname')
  .parse(process.argv);

if (!program.args.length) {
  console.log(chalk.yellow.bold('[Info]: ') + 'No files to process!');
  return false;
}

var config = {
  remUnit: deserializeValue(program.remUnit),
  remVersion: deserializeValue(program.remVersion),
  remPrecision: deserializeValue(program.remPrecision)
};

var Rpx2remIns = new Rpx2rem(config);

program.args.forEach(function (filePath) {

  if (path.extname(filePath) !== '.css') {
    return;
  }

  var cssText = fs.readFileSync(filePath, {encoding: 'utf8'});
  var outputPath = program.output || path.dirname(filePath);
  var fileName = path.basename(filePath);

  // generate rem version stylesheet
  if (config.remVersion) {
    var newCssText = Rpx2remIns.generateRem(cssText);
    var newFileName = fileName.replace(/(.debug)?.css/, '.debug.css');
    var newFilepath = path.join(outputPath, newFileName);
    saveFile(newFilepath, newCssText);
  }
});
