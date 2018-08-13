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
const pcwd = path.resolve(cwd);
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
  const reqPath = req.path;
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

  const elementData = onRender({ expressCtx });
  const promiseOfEl =
    elementData instanceof Promise ? elementData : Promise.resolve(elementData);
  const appEl = await promiseOfEl;
  let helmetCtx = {};

  const rootEl = (
    <HelmetProvider context={helmetCtx}>
      <Provider store={store}>
        <StaticRouter location={reqPath} context={context}>
          {appEl}
        </StaticRouter>
      </Provider>
    </HelmetProvider>
  );

  const loadableState = await getLoadableState(rootEl);
  const content = renderToString(rootEl);
  const { helmet } = helmetCtx;

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
    ${helmet.script.toString()}
    ${template.renderBottom({ expressCtx })}
    <script>window.INITIAL_STATE=${serialize(store.getState())}</script>
    ${loadableState.getScriptTag()}
    ${dllScript}
    <script src='${vendor}'></script>
    <script src='${app}'></script>
  </body>
  </html>`;
};
