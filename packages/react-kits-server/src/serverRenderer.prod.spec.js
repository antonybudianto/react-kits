import React from 'react';

process.env.NODE_ENV = 'production';

jest.mock('./assetUtil.js', () => {
  return {
    generateAssets: jest.fn(() => ({
      vendor: 'vendortmp.js',
      app: 'apptmp.js'
    }))
  };
});
const serverRenderer = require('./serverRenderer').default;

function MockExtractor() {
  return {
    getScriptTags: jest.fn(),
    getStyleTags: jest.fn(),
    collectChunks: d => d
  };
}

jest.mock('@loadable/server', () => {
  return {
    ChunkExtractor: MockExtractor
  };
});

test('works with minimum setup', done => {
  serverRenderer({
    expressCtx: {
      req: {
        query: {}
      },
      res: {}
    },
    context: {},
    store: {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      getState: jest.fn()
    },
    onRender: () => <div>test123</div>
  }).then(str => {
    expect(str).toMatch(/test123/);
    expect(str).toMatch(/apptmp\.js/);
    expect(str).toMatch(/vendortmp\.js/);
    done();
  });
});

test('works with minimum setup - with shell', done => {
  serverRenderer({
    expressCtx: {
      req: {
        query: {
          'rkit-shell': true
        }
      },
      res: {}
    },
    context: {},
    store: {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      getState: jest.fn()
    },
    onRender: () => <div>test123</div>
  }).then(str => {
    expect(str).toMatch(/window\.__shell__ = true/);
    expect(str).toMatch(/apptmp\.js/);
    expect(str).toMatch(/vendortmp\.js/);
    done();
  });
});
