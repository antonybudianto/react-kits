const template = require('fs-template');
const install = require('yarn-install');

const { log } = require('../util/log');
const { resolveDir, resolveCwd } = require('../util/path');

function init(name) {
  log(`Creating "${name}" app...`);

  const vars = {
    name
  };
  const inDir = resolveDir('../../template');
  const outDir = resolveCwd('./' + name);
  const options = {
    source: inDir,
    target: outDir,
    vars
  };

  template(options, (err, createdFiles) => {
    if (err) throw err;
    log('Project generated!');

    log('Installing dependencies...');
    install({
      cwd: resolveCwd(name)
    });
    log('Dependencies installed!');
    log(`Run "cd ${name} && npm start" to get started!`);
  });
}

module.exports = init;
