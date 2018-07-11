import React from 'react';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import { Helmet } from 'react-helmet';

let vendor;
let app;
let appStyle;
let vendorStyle;

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  const cwd = process.cwd();
  const manifest = require(path.resolve(cwd, 'dist/manifest.json'));
  vendor = manifest['vendor.js'];
  app = manifest['app.js'];
  appStyle = manifest['app.css'];
  vendorStyle = manifest['vendor.css'];
}

export default ({
  onRender,
  assetUrl = '/',
  path,
  store,
  context,
  devAssets
}) => {
  if (process.env.NODE_ENV === 'development') {
    vendor = assetUrl + devAssets.vendorJs;
    app = assetUrl + devAssets.appJs;
    appStyle = devAssets.appCss ? assetUrl + devAssets.appCss : null;
    vendorStyle = devAssets.vendorCss ? assetUrl + devAssets.vendorCss : null;
  }

  const appStyleTag = appStyle
    ? `<link rel='stylesheet' href='${appStyle}'>`
    : '';
  const vendorStyleTag = vendorStyle
    ? `<link rel='stylesheet' href='${vendorStyle}'>`
    : '';

  const appEl = (
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        {onRender()}
      </StaticRouter>
    </Provider>
  );

  return getLoadableState(appEl).then(loadableState => {
    const content = renderToString(appEl);

    const helmet = Helmet.renderStatic();

    return `<!doctype html>
      <html>
      <head>
        ${helmet.title.toString()}
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        ${helmet.meta.toString()}
        ${vendorStyleTag}
        ${appStyleTag}
        ${helmet.link.toString()}
      </head>
      <body>
        <div id='root'>${content}</div>
        <script>window.INITIAL_STATE=${serialize(store.getState())}</script>
        ${loadableState.getScriptTag()}
        <script src='${vendor}'></script>
        <script src='${app}'></script>
      </body>
      </html>`;
  });
};
