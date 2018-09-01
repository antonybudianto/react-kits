# {{name}}

## Getting started

### Start

```
npm start
```

#### Build DLL for caching

You can build DLL cache for faster rebuild in development. Run this only **once** before start or if you've changed **package.json** dependencies. This step is optional, so you can start without DLL cache.

```sh
npm run dll
```

> You might need to hard-refresh to refresh service worker, caches, or HMR hot-updates errors.


### Code style

#### Linting
```
npm run lint
```

#### Prettier
```
npm run prettier
```

## Testing

```
npm test
```

## Build and deployment

### Build

```
npm run build
```

#### Serve build locally

```
npm run serve
```

### Deployment

- First, run the build script with `npm run build`
- Next, you can copy the following to new folder:
  - **dist** folder
  - **package.json**
- You can upload that folder into the server and run `npm i --production` inside the folder
- Run `npm run serve` to boot up the server (this uses Node binary directly, you can use proper Node process manager as you wish)

### Available environment variables

- APP_ENV (App environment, default to "development")
- APP_ASSET_PATH (App public asset path, default to "/")
