const chalk = require('chalk');

function log(...args) {
  console.log(chalk.bgCyan(' react-kits > '), chalk.cyan(...args));
}

module.exports = {
  log
};
