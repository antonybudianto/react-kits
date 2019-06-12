import React from 'react';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ChunkExtractor } from '@loadable/server';

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

  const statsFile = resolveCwd('dist/loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['app'] });
  const jsx = extractor.collectChunks(rootEl);
  let content = renderToString(jsx);
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
    ${[
      helmetMeta,
      extractor.getLinkTags(),
      extractor.getStyleTags(),
      helmetLink
    ]
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
      dllScript,
      extractor.getScriptTags()
    ]
      .filter(s => s !== '')
      .join('\n')}
  </body>
  </html>`;
};
