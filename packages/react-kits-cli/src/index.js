#!/usr/bin/env node

require('babel-register')({
  presets: ['env']
});

const yargs = require('yargs');
yargs
  .command(
    'init <name>',
    'Initialize new project',
    () => {},
    argv => {
      require('./cli/init')(argv.name);
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
