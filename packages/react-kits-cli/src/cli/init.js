const copy = require('recursive-copy');
const through = require('through2');
const path = require('path');
const install = require('yarn-install');

const { log } = require('../util/log');
const { resolveDir, resolveCwd } = require('../util/path');

function init(name) {
  log(`Creating "${name}" app...`);

  const inDir = resolveDir('../../template');
  const outDir = resolveCwd('./' + name);

  copy(inDir, outDir, {
    overwrite: true,
    dot: true,
    transform: function(src, dest, stats) {
      if (['.md', '.json'].indexOf(path.extname(src)) === -1) {
        return null;
      }
      return through(function(chunk, enc, done) {
        var str = chunk.toString();
        var output = str.replace('~~name~~', name).replace('{{name}}', name);
        done(null, output);
      });
    }
  })
    .then(() => {
      log('Project generated successfully.');
      log('Installing dependencies...');
      install({
        cwd: resolveCwd(name)
      });
      log('Dependencies installed!');
      log(`Run "cd ${name} && npm start" to get started!`);
    })
    .catch(err => {
      log('Error while generating project', err);
    });
}

module.exports = init;
