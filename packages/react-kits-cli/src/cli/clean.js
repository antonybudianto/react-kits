const inquirer = require('inquirer');
const del = require('del');
const { log } = require('../util/log');
const { dir_dist } = require('../config/project.config');

const paths = [dir_dist];

inquirer
  .prompt([
    {
      type: 'confirm',
      message: 'Are you sure to clean the build result?',
      name: 'ok'
    }
  ])
  .then(answers => {
    if (answers.ok) {
      del(paths).then(() => {
        log('Build clean done.');
      });
    }
  });
