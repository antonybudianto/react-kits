const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const StartServerPlugin = require('start-server-webpack-plugin');

const baseConfig = require('./webpack.base.config');
const { resolveCwd, resolveDir } = require('../util/path');
const project = require('../config/project.config');
const kitConfig = require(resolveCwd('react-kits.config')).config(project);

let config = {
  target: 'node',
  node: {
    fs: 'empty',
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          extends: resolveDir('../config/.server.babelrc')
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: 'null-loader'
      }
    ]
  },
  entry: {
    bundle: project.paths.client('renderer/server')
  },
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    path: project.paths.dist()
  }
};

if (project.globals.__DEV__) {
  const addConfig = {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new StartServerPlugin({
        entryName: 'bundle'
      })
    ]
  };
  config = merge(config, addConfig);
}

/**
 * Allow webpack overrides
 */
let custom = {};
if (kitConfig.serverWebpack) {
  const webpackConfig = kitConfig.serverWebpack(config);
  if (!webpackConfig) {
    log('`serverWebpack` field should return config.');
  } else {
    log('`serverWebpack` modify is applied.');
    custom = webpackConfig;
  }
}

let finalConfig = merge(baseConfig, config, custom);

module.exports = finalConfig;
