const webpack = require('webpack');
const del = require('del');
const { log } = require('../util/log');

function cleanBuild() {
  log('Cleaning build...');
  return del(['dist']).then(() => {
    log('Build clean done.');
  });
}

cleanBuild().then(() => {
  const config = require('../config/webpack.server.config');
  const ins = webpack(config);
  ins.watch(config.watchOptions, (err, stats) => {
    console.clear();
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
    console.log(stats.toString(config.stats));
  });
});
