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

test('works with minimum setup', done => {
  serverRenderer({
    expressCtx: {
      req: {},
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
