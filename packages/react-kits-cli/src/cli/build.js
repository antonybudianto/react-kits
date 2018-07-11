const webpack = require('webpack');
const del = require('del');

const serverConfig = require('../config/webpack.server.config');
const clientConfig = require('../config/webpack.client.config');
const { log } = require('../util/log');

const paths = ['dist'];

function cleanBuild(done) {
  del(paths).then(() => {
    log('Build clean done.');
    done();
  });
}

function build(label, config, cb = () => {}) {
  log(`Building production bundle for "${label}"...`);
  const ins = webpack(config);
  ins.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      throw err;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
      throw info.errors;
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
    console.log(
      stats.toString({
        modules: false,
        colors: true
      })
    );
    log(`Done building "${label}"!`);
    cb();
  });
}

try {
  cleanBuild(() => {
    log('NODE_ENV: ' + process.env.NODE_ENV);
    log('APP_ENV: ' + process.env.APP_ENV);
    build('client', clientConfig, () => {
      build('server', serverConfig);
    });
  });
} catch (e) {
  console.error(e);
  process.exit(1);
}
