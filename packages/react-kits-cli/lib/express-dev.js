function devMiddleware(app) {
  var webpack = require('webpack');
  var webpackConfig = require('../src/config/webpack.client.config');
  var compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      serverSideRender: true,
      stats: webpackConfig.stats,
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));
}

module.exports = {
  devMiddleware
};
