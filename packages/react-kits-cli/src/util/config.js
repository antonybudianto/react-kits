const fs = require('fs');

const { resolveCwd } = require('../util/path');
const rkitConfigPath = resolveCwd('./react-kits.config.js');

function generateKitConfig(project) {
  let defaultkitConfig = {
    webpack: {}
  };
  if (fs.existsSync(rkitConfigPath)) {
    const userKitConfig = require(rkitConfigPath).config(project) || {};
    const kitConfig = {
      ...defaultkitConfig,
      ...userKitConfig,
      __found: true
    };
    return kitConfig;
  }
  return defaultkitConfig;
}

module.exports = {
  generateKitConfig
};
