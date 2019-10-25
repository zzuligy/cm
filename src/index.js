const program = require("commander");
var debug = require("debug")("index");
const init = require("./api/init");
const commit = require("./api/commit");
program.version("0.1.0");

program
  .command("init <filename>")
  .description("初始化一个组件模板")
  .action(function(filename) {
    debug("开始初始化当前模板", filename);
    init({ target: filename });
  });
program
  .command("commit <message>")
  .description("提交版本记录")
  .action(function(message) {
    debug("开始提交版本记录", message);
    commit({ message });
  });
program
  .command("publish")
  .description("发布组件包")
  .action(function() {
    debug("开始发布组件包");
  });
program
  .command("add")
  .description("使用组件")
  .action(function() {
    debug("开始使用组件");
  });

program.command("*").action(function(env) {
  console.log('deploying "%s"', env);
});

program.parse(process.argv);
