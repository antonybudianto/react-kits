const path = require('path');
const { resolveCwd } = require('../util/path');

// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',
  app_env: process.env.APP_ENV || 'development',
  app_asset_path: process.env.APP_ASSET_PATH || '/',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: resolveCwd(''),
  dir_client: resolveCwd('src'),
  dir_dist: resolveCwd('dist'),
  dir_public: resolveCwd('public')
};

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  'process.env.NODE_ENV': JSON.stringify(config.env),
  'process.env.APP_ENV': JSON.stringify(config.app_env),
  'process.env.APP_ASSET_PATH': JSON.stringify(config.app_asset_path),
  __DEV__: config.app_env === 'development',
  __STAG__: config.app_env === 'staging',
  __PROD__: config.app_env === 'production'
};

// ------------------------------------
// Utilities
// ------------------------------------
function base() {
  const args = [config.path_base].concat([].slice.call(arguments));
  return path.resolve.apply(path, args);
}

config.paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist)
};

module.exports = config;
