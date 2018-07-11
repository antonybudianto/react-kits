# react-kits-server

Express server for server-side rendering with data prefetching.

## Install
```sh
yarn add react-kits-server
```

## API
```js
import { createReactServer } from 'react-kits-server'

import createStore from '../store/createStore'
import { getInitialData } from '../routes'
import { HOME_PATH, ASSET_URL } from '../url'
import CoreLayout from '../layouts/CoreLayout'

const app = createReactServer({
  createStore,
  getInitialData,
  homePath: HOME_PATH,
  assetUrl: ASSET_URL,
  customMiddleware: expressIns => {},
  onRender: () => <CoreLayout />
})

/**
 * `createStore` is a function that must return Redux store.
 * `getInitialData` is a function that must return Promise.
 * `onRender` is a function that must return React element.
 **/
```

### License
MIT
