# {{name}}

## How to use

### Start
```
npm start
```

### Build
```
npm run build
```

### Build DLL for caching
```sh
npm run dll
```

### Deployment

- First, run the build script with `npm run build`
- Next, you can copy **dist** folder and **package.json** into a new folder, let's call it **build**
- You can upload that folder into the server and run `npm i --production` inside the folder
- Run `npm run serve` to boot up the server (this uses Node binary directly, you can use proper Node process manager as you wish)

### Available environment variables
- APP_ENV (App environment, default to "development")
- APP_ASSET_PATH (App public asset path, default to "/")
