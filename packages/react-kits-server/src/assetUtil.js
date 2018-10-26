function normalizeAssets(assets) {
  return Array.isArray(assets) ? assets : [assets];
}

export function generateAssets({ expressCtx, assetUrl }) {
  let vendor;
  let app;
  let appStyle;
  let vendorStyle;

  if (process.env.NODE_ENV === 'development') {
    let devAssets = {
      appJs: '',
      vendorJs: '',
      appCss: ''
    };
    const assetsByChunkName = expressCtx.res.locals.webpackStats.toJson()
      .assetsByChunkName;
    devAssets.appJs = normalizeAssets(assetsByChunkName.app).find(f =>
      /^app(\.[a-z0-9]+)?\.js$/.test(f)
    );
    devAssets.appCss = normalizeAssets(assetsByChunkName.app).find(f =>
      /^app(\.[a-z0-9]+)?\.css$/.test(f)
    );
    devAssets.vendorJs = normalizeAssets(assetsByChunkName['vendor~app']).find(
      f => /^vendor(\.[a-z0-9]+)?\.js$/.test(f)
    );
    devAssets.vendorCss = normalizeAssets(assetsByChunkName['vendor~app']).find(
      f => /^vendor(\.[a-z0-9]+)?\.css$/.test(f)
    );

    vendor = assetUrl + devAssets.vendorJs;
    app = assetUrl + devAssets.appJs;
    appStyle = devAssets.appCss ? assetUrl + devAssets.appCss : null;
    vendorStyle = devAssets.vendorCss ? assetUrl + devAssets.vendorCss : null;
  } else {
    const path = require('path');
    const cwd = process.cwd();
    const manifest = require(path.resolve(cwd, 'dist/build-manifest.json'));
    vendor = manifest['vendor~app.js'];
    app = manifest['app.js'];
    appStyle = manifest['app.css'];
    vendorStyle = manifest['vendor~app.css'];
  }

  return {
    vendor,
    app,
    appStyle,
    vendorStyle
  };
}
