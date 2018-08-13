process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const config = require('../config/webpack.dll.config');
const { log } = require('../util/log');

const ins = webpack(config);
log('Building DLL cache...');
ins.run((err, stats) => {
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
  log('DLL cache saved successfully');
  log('Make sure to rerun this command when you update your package.json');
});
