const execa = require("execa");
const fse = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const { logWithSpinner, stopSpinner } = require("../utils");
async function init(opt) {
  let { target } = opt;
  const templatebase = path.resolve(path.join(__dirname, "../template"));
  let destFilename = path.resolve(path.join(__dirname, `../../${target}`));
  const isExist = await fse.existsSync(destFilename);
  if (isExist) {
    const isOverWrite = await inquirer.prompt([
      {
        type: "confirm",
        name: "isExist",
        message: `🙎 Destination path ${destFilename} already exists and is not an empty directory. Overwrite?`
      }
    ]);
    if (!isOverWrite) {
      return;
    }
  }
  await fse.emptyDirSync(destFilename);
  await fse.ensureDirSync(destFilename);
  logWithSpinner(`✨`, `开始在 ${chalk.yellow(target)} 初始化项目 .`);
  await fse.copy(templatebase, destFilename, {
    overwrite: true,
    preserveTimestamps: true
  });
  try {
    stopSpinner();
    await execa("git", ["init"], { stdio: "", cwd: destFilename });
    logWithSpinner(`🚀  组件模板创建成功`);
    stopSpinner();
  } catch (e) {
    stopSpinner();
    console.error(`项目初始化失败, ${e}`);
  }
}
module.exports = init;
