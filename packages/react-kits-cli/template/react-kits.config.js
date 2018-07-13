import { ASSET_URL_DEV, ASSET_URL_PROD, ASSET_URL_STAG } from './src/constant'

let assetUrl = ASSET_URL_DEV

export function config(projectConfig) {
  if (projectConfig.globals.__STAG__) {
    assetUrl = ASSET_URL_STAG
  } else if (projectConfig.globals.__PROD__) {
    assetUrl = ASSET_URL_PROD
  }
  return {
    baseWebpack: () => {
      return {
        output: {
          publicPath: assetUrl
        }
      }
    }
  }
}
