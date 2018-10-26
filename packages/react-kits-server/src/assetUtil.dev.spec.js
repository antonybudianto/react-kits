import { generateAssets } from './assetUtil';

process.env.NODE_ENV = 'development';

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

test('should generate from manifest correctly', () => {
  const expressCtx = {
    req: {},
    res: {
      locals: {
        webpackStats: {
          toJson: () => ({
            assetsByChunkName: {
              app: ['app.js'],
              'vendor~app': ['vendor.js']
            }
          })
        }
      }
    }
  };
  const data = generateAssets({ expressCtx, assetUrl: '/mock/' });
  expect(data['app']).toEqual('/mock/app.js');
  expect(data['appStyle']).toBeNull();
  expect(data['vendor']).toEqual('/mock/vendor.js');
  expect(data['vendorStyle']).toBeNull();
});

test('should generate from manifest correctly - with css', () => {
  const expressCtx = {
    req: {},
    res: {
      locals: {
        webpackStats: {
          toJson: () => ({
            assetsByChunkName: {
              app: ['app.js', 'app.css'],
              'vendor~app': ['vendor.js', 'vendor.css']
            }
          })
        }
      }
    }
  };
  const data = generateAssets({ expressCtx, assetUrl: '/mock/' });
  expect(data['app']).toEqual('/mock/app.js');
  expect(data['appStyle']).toEqual('/mock/app.css');
  expect(data['vendor']).toEqual('/mock/vendor.js');
  expect(data['vendorStyle']).toEqual('/mock/vendor.css');
});

test('should generate from manifest correctly - with non array assets', () => {
  const expressCtx = {
    req: {},
    res: {
      locals: {
        webpackStats: {
          toJson: () => ({
            assetsByChunkName: {
              app: 'app.js',
              'vendor~app': 'vendor.js'
            }
          })
        }
      }
    }
  };
  const data = generateAssets({ expressCtx, assetUrl: '/mock/' });
  expect(data['app']).toEqual('/mock/app.js');
  expect(data['vendor']).toEqual('/mock/vendor.js');
});
