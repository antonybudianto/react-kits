process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const config = require('../config/webpack.dll.config');

const ins = webpack(config);
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
});
