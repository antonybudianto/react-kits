#!/usr/bin/env node

require('babel-register')({
  presets: ['env', 'stage-3']
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
  .command(
    'lint',
    'Run eslint',
    () => {},
    argv => {
      require('./cli/lint');
    }
  )
  .demandCommand(1, 'Please choose your command')
  .epilog('React Kits CLI')
  .help()
  .strict().argv;
