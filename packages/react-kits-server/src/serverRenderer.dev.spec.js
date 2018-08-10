import React from 'react';
import serverRenderer from './serverRenderer';

process.env.NODE_ENV = 'development';

jest.mock('./assetUtil.js', () => {
  return {
    generateAssets: jest.fn(() => ({
      vendor: 'vendortmp.js',
      app: 'apptmp.js',
      appStyle: 'apptmp.css',
      vendorStyle: 'vendortmp.css'
    }))
  };
});

test('works with minimum setup', done => {
  serverRenderer({
    expressCtx: {
      req: {},
      res: {
        locals: {
          webpackStats: {
            toJson: () => ({
              assetsByChunkName: {
                app: ['app.js', 'app.css'],
                vendor: ['vendor.js', 'vendor.css']
              }
            })
          }
        }
      }
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
    done();
  });
});

test('works with no style', done => {
  serverRenderer({
    expressCtx: {
      req: {},
      res: {
        locals: {
          webpackStats: {
            toJson: () => ({
              assetsByChunkName: {
                app: ['app.js'],
                vendor: ['vendor.js']
              }
            })
          }
        }
      }
    },
    context: {},
    store: {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      getState: jest.fn()
    },
    onRender: () => <div>test123</div>
  }).then(str => {
    expect(str).not.toMatch(/(app|vendor)\.css/);
    done();
  });
});

test('async onRender', done => {
  serverRenderer({
    expressCtx: {
      req: {},
      res: {
        locals: {
          webpackStats: {
            toJson: () => ({
              assetsByChunkName: {
                app: ['app.js'],
                vendor: ['vendor.js']
              }
            })
          }
        }
      }
    },
    context: {},
    store: {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      getState: jest.fn()
    },
    onRender: async () => <div>test123</div>
  }).then(str => {
    expect(str).toMatch(/test123/);
    done();
  });
});
