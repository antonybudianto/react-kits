#!/usr/bin/env node

// require('babel-register')({
//   presets: ['env', 'stage-3']
// });

const yargs = require('yargs');
yargs
  .command(
    'init',
    'Initialize new project',
    () => {},
    argv => {
      //   require('./cli/init');
    }
  )
  .command(
    'start',
    'Start React server',
    () => {},
    argv => {
      require('./cli/start');
    }
  )
  .command(
    'build',
    'Build React server',
    () => {},
    argv => {
      require('./cli/build');
    }
  )
  .command(
    'clean',
    'Clean build result',
    () => {},
    argv => {
      require('./cli/clean');
    }
  )
  .demandCommand(1, 'Please choose your command')
  .epilog('React Kits CLI')
  .help()
  .strict().argv;
