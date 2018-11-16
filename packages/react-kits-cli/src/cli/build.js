const webpack = require('webpack');
const del = require('del');

const serverConfig = require('../config/webpack.server.config');
const clientConfig = require('../config/webpack.client.config');
const { log } = require('../util/log');
const { dir_dist } = require('../config/project.config');

const paths = [dir_dist];

function cleanBuild() {
  return del(paths).then(() => {
    log('Build clean done.');
  });
}

function build(label, config) {
  log(`Building production bundle for "${label}"...`);
  const ins = webpack(config);

  const promise = new Promise((resolve, reject) => {
    ins.run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        reject(err);
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
        reject(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }
      console.log(stats.toString(config.stats));
      log(`Done building "${label}"!`);
      resolve();
    });
  });

  return promise;
}

log('NODE_ENV=' + process.env.NODE_ENV);
log('APP_ENV=' + process.env.APP_ENV);

cleanBuild()
  .then(() => {
    return build('client', clientConfig);
  })
  .then(() => {
    return build('server', serverConfig);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
