#!/usr/bin/env node

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
    c => {
      return c.options({
        clean: {
          describe: 'Clean dist before start'
        }
      });
    },
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
    'build-dll',
    'Build DLL cache',
    () => {},
    argv => {
      require('./cli/build-dll');
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
    c => {
      return c.options({
        fix: {
          describe: 'Auto fix'
        }
      });
    },
    argv => {
      require('./cli/lint');
    }
  )
  .demandCommand(1, 'Please choose your command')
  .epilog('React Kits CLI')
  .help()
  .strict().argv;
