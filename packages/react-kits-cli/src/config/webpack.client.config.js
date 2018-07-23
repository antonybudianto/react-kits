const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const { log } = require('../util/log');
const { generateKitConfig } = require('../util/config');
const { resolveDir } = require('../util/path');
const baseConfig = require('./webpack.base.config');
const project = require('../config/project.config');

const kitConfig = generateKitConfig(project);

const devMode = project.globals.__DEV__;

const config = {
  devtool: project.globals.__PROD__ ? false : 'source-map',
  entry: {
    app: [
      ...(project.globals.__DEV__
        ? ['webpack-hot-middleware/client?timeout=1000&reload=true']
        : []),
      project.paths.client('renderer/client')
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          extends: resolveDir('../config/.client.babelrc')
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              url: true
            }
          },
          {
            loader: 'sass-loader',
            options: kitConfig.webpack.sassOptions || {}
          }
        ]
      }
    ]
  },
  output: {
    filename: project.globals.__DEV__ ? '[name].js' : `[name].[chunkhash].js`,
    path: project.paths.dist()
  },
  plugins: [
    ...(project.globals.__DEV__
      ? [new webpack.HotModuleReplacementPlugin()]
      : [
          new ManifestPlugin(),
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false
          })
        ]),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/].+\.js$/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
};

/**
 * Allow webpack overrides
 */
let custom = {};
if (kitConfig.webpack.client) {
  const webpackConfig = kitConfig.webpack.client(config);
  if (!webpackConfig) {
    log('`webpack.client` field should return config.');
  } else {
    log('`webpack.client` modify is applied.');
    custom = webpackConfig;
  }
}

let finalConfig = merge(baseConfig, config, custom);

module.exports = finalConfig;
