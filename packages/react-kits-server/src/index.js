import express from 'express';
import morgan from 'morgan';

import serverRender from './serverRenderer';

export function createReactServer(config) {
  const {
    createStore,
    getInitialData,
    homePath,
    assetUrl,
    onRender,
    customMiddleware = () => {}
  } = config;
  const app = express();
  const loggerEnv = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
  const logger = morgan(loggerEnv, {
    skip: function(req, res) {
      if (process.env.NODE_ENV === 'development') {
        return false;
      }
      return res.statusCode < 400;
    }
  });

  app.use(logger);

  let devAssets = {
    appJs: '',
    vendorJs: '',
    appCss: ''
  };

  if (process.env.NODE_ENV === 'development') {
    const { devMiddleware } = require('react-kits/lib/express-dev');
    devMiddleware(app);
  }

  customMiddleware(app);

  app.use(homePath, express.static('dist'));

  app.get(homePath + '(*)', (req, res) => {
    if (process.env.NODE_ENV === 'development') {
      const assetsByChunkName = res.locals.webpackStats.toJson()
        .assetsByChunkName;
      devAssets.appJs = assetsByChunkName.app.find(f =>
        /^app(\.[a-z0-9]+)?\.js$/.test(f)
      );
      devAssets.appCss = assetsByChunkName.app.find(f =>
        /^app(\.[a-z0-9]+)?\.css$/.test(f)
      );
      devAssets.vendorJs = assetsByChunkName.vendor.find(f =>
        /^vendor(\.[a-z0-9]+)?\.js$/.test(f)
      );
      devAssets.vendorCss = assetsByChunkName.vendor.find(f =>
        /^vendor(\.[a-z0-9]+)?\.css$/.test(f)
      );
    }

    const store = createStore();
    // attach cookies to store object as a way to let cookies to be passed into server fetching
    req.headers.cookie && (store['cookies'] = req.headers.cookie);
    const path = req.path;
    const promises = getInitialData(req, store);
    Promise.all(promises)
      .catch(err => {
        console.error('Error fetching data', err);
      })
      .finally(() => {
        let context = {};
        const data = {
          path,
          store,
          context,
          devAssets,
          onRender,
          assetUrl
        };
        serverRender(data).then(html => {
          if (context.status === 404) {
            return res.status(404).send(html);
          }
          if (context.url) {
            return res.redirect(302, context.url);
          }
          res.send(html);
        });
      });
  });

  return app;
}
