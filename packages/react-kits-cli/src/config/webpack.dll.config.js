const webpack = require('webpack');

const { resolveCwd, pcwd } = require('../util/path');
const project = require('../config/project.config');

module.exports = {
  context: pcwd,
  performance: {
    hints: false
  },
  stats: {
    hash: false,
    modules: false,
    entrypoints: false,
    colors: true,
    children: false
  },
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    vendorDll: ['./src/vendor-dll.js']
  },
  output: {
    filename: '[name].js',
    path: project.paths.dist(),

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: project.paths.dist('./[name]-manifest.json'),
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]'
    })
  ]
};
