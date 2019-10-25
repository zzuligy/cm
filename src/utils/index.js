const {
  logWithSpinner,
  stopSpinner,
  pauseSpinner,
  resumeSpinner
} = require("./spinner");

const { exit } = require("./exit");
const { log, info, done, warn, error, clearConsole } = require("./logger");

module.exports = {
  logWithSpinner,
  stopSpinner,
  pauseSpinner,
  resumeSpinner,
  exit,
  log,
  info,
  done,
  warn,
  error,
  clearConsole
};
