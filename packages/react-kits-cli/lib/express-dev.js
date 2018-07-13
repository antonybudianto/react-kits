require('babel-register')({
  presets: ['env']
});

function devMiddleware(app) {
  var webpack = require('webpack');
  var webpackConfig = require('../src/config/webpack.client.config');
  var compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      serverSideRender: true,
      stats: {
        hash: false,
        modules: false,
        entrypoints: false,
        colors: true
      },
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));
}

module.exports = {
  devMiddleware
};
