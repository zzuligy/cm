const execa = require("execa");
const path = require("path");
const { info, stopSpinner, logWithSpinner } = require("../utils");
async function commit(opt) {
  const curPath = process.cwd();
  const moduleName = curPath.split(path.sep).pop();
  try {
    //git push --set-upstream git@gitlab.example.com:namespace/nonexistent-project.git master
    try {
      await execa("git", ["add", "."], { stdio: "" });
      await execa("git", ["commit", "-m", `"${opt.message}"`], { stdio: "" });
    } catch (e) {
      info("没有文件变动");
    }
    await execa(
      //git push --set-upstream ssh://git@ssh.gitlab.mfwdev.com:333/alita/nonexistent-project.git master
      "git",
      [
        "push",
        "--set-upstream",
        `ssh://git@ssh.gitlab.mfwdev.com:333/alita/${moduleName}.git`,
        "master"
      ],
      { stdio: "" }
    );
    logWithSpinner(`🚀  组件修改记录成功`);
    stopSpinner();
  } catch (e) {
    stopSpinner();
    console.error(`项目初始化失败, ${e}`);
  }
}

module.exports = commit;
