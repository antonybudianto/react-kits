const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const StartServerPlugin = require('start-server-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const { log } = require('../util/log');
const { generateKitConfig } = require('../util/config');
const baseConfig = require('./webpack.base.config');
const { resolveDir } = require('../util/path');
const project = require('../config/project.config');

const kitConfig = generateKitConfig(project);
if (kitConfig.__found) {
  log('react-kits.config.js found');
}

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
  },
  plugins: [new LoadablePlugin()]
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
if (kitConfig.webpack.server) {
  const webpackConfig = kitConfig.webpack.server(config);
  if (!webpackConfig) {
    log('`webpack.server` field should return config.');
  } else {
    log('`webpack.server` modify is applied.');
    custom = webpackConfig;
  }
}

let finalConfig = merge(baseConfig, config, custom);

module.exports = finalConfig;
