import React from 'react';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import { HelmetProvider } from 'react-helmet-async';

import { generateAssets } from './assetUtil';

let vendor;
let app;
let appStyle;
let vendorStyle;

const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
function resolveCwd(name) {
  return path.resolve(cwd, name);
}

export default async ({
  expressCtx,
  store,
  context,
  onRender,
  assetUrl = '/',
  template = {
    renderBottom: () => ''
  }
}) => {
  const { req, res } = expressCtx;
  const reqUrl = req.url;
  const assetData = generateAssets({ expressCtx, assetUrl });
  vendor = assetData.vendor;
  app = assetData.app;
  appStyle = assetData.appStyle;
  vendorStyle = assetData.vendorStyle;

  const appStyleTag = appStyle
    ? `<link rel='stylesheet' href='${appStyle}'>`
    : '';
  const vendorStyleTag = vendorStyle
    ? `<link rel='stylesheet' href='${vendorStyle}'>`
    : '';
  let dllScript = '';
  if (process.env.NODE_ENV === 'development') {
    if (fs.existsSync(resolveCwd('dist/vendorDll.js'))) {
      dllScript = `<script src='${assetUrl}vendorDll.js'></script>`;
    }
  }

  const shell = typeof expressCtx.req.query['rkit-shell'] !== 'undefined';

  const elementData = onRender({ expressCtx });
  const promiseOfEl =
    elementData instanceof Promise ? elementData : Promise.resolve(elementData);
  const appEl = await promiseOfEl;
  let helmetCtx = {};

  const rootEl = (
    <HelmetProvider context={helmetCtx}>
      <Provider store={store}>
        <StaticRouter location={reqUrl} context={context}>
          {appEl}
        </StaticRouter>
      </Provider>
    </HelmetProvider>
  );

  const loadableState = await getLoadableState(rootEl);
  let content = renderToString(rootEl);
  const { helmet } = helmetCtx;

  let helmetTitle = helmet.title.toString();
  let helmetMeta = helmet.meta.toString();
  let helmetLink = helmet.link.toString();
  let helmetScript = helmet.script.toString();
  let initScript = `<script type="text/javascript">window.INITIAL_STATE = ${serialize(
    store.getState()
  )};</script>`;

  if (shell) {
    content = '';
    helmetTitle = '';
    helmetLink = '';
    helmetMeta = '';
    helmetScript = '';
    initScript = '';
  }

  return `<!doctype html>
  <html>
  <head>
    ${helmetTitle}
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    ${[helmetMeta, vendorStyleTag, appStyleTag, helmetLink]
      .filter(s => s !== '')
      .join('\n')}
  </head>
  <body>
    <div id='root'>${content}</div>
    <script type="text/javascript">window.__shell__ = ${shell};</script>
    ${[
      initScript,
      helmetScript,
      template.renderBottom({ expressCtx, store }),
      loadableState.getScriptTag(),
      dllScript
    ]
      .filter(s => s !== '')
      .join('\n')}
    <script type="text/javascript" src='${vendor}'></script>
    <script type="text/javascript" src='${app}'></script>
  </body>
  </html>`;
};
