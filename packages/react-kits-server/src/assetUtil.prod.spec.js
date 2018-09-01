import { generateAssets } from './assetUtil';
import path from 'path';

process.env.NODE_ENV = 'production';

let spy;
const pathResolveOri = path.resolve;

test('should generate from manifest correctly', () => {
  const expressCtx = {
    req: {},
    res: {}
  };
  spy = jest.spyOn(path, 'resolve').mockImplementation((...a) => {
    if (a[1] === 'dist/build-manifest.json') return './mocks/mockManifest.json';
    return pathResolveOri(...a);
  });
  const data = generateAssets({ expressCtx, assetUrl: '/' });
  expect(data['app']).toEqual('mock/app.js');
  expect(data['appStyle']).toBeUndefined();
  expect(data['vendor']).toEqual('mock/vendor.js');
  expect(data['vendorStyle']).toBeUndefined();
});

test('should generate from manifest correctly - with css', () => {
  const expressCtx = {
    req: {},
    res: {}
  };
  spy.mockImplementation((...a) => {
    if (a[1] === 'dist/build-manifest.json')
      return './mocks/mockManifestCss.json';
    return pathResolveOri(...a);
  });
  const data = generateAssets({ expressCtx, assetUrl: '/' });
  expect(data['app']).toEqual('mock/app.js');
  expect(data['appStyle']).toEqual('mock/app.css');
  expect(data['vendor']).toEqual('mock/vendor.js');
  expect(data['vendorStyle']).toEqual('mock/vendor.css');
});
