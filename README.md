# react-kits [![Build Status](https://travis-ci.com/antonybudianto/react-kits.svg?branch=master)](https://travis-ci.com/antonybudianto/react-kits) [![npm version](https://badge.fury.io/js/react-kits.svg)](https://badge.fury.io/js/react-kits)

This is my opinionated Fullstack React toolkits featuring project generation, starting dev server, build production bundle, and common devtools.

## Requirement
- Node >= 8.10.0

## Main features
- SSR (Server-side rendering)
- Universal Code-splitting (lazy + eager)
- Full HMR (Hot module reload)
- Data prefetching

## Tech stacks
|                                                                          	|                                                        	|                                                     	|                                   	|
|--------------------------------------------------------------------------	|--------------------------------------------------------	|-----------------------------------------------------	|-----------------------------------	|
|  [React](https://reactjs.org/)                                       	| [Redux](https://redux.js.org/)                         	| [React Helmet](https://github.com/nfl/react-helmet) 	| [Express](https://expressjs.com/) 	|
| [loadable-component](https://github.com/smooth-code/loadable-components) 	| [SASS](https://github.com/webpack-contrib/sass-loader) 	| [Babel](https://babeljs.io/)                        	| [Jest](https://jestjs.io/)        	|

## Structure

The project consists of following packages:
- [react-kits-cli](https://github.com/antonybudianto/react-kits/tree/master/packages/react-kits-cli)

  The CLI, handles start dev-server, bundling, and common utils
- [react-kits-server](https://github.com/antonybudianto/react-kits/tree/master/packages/react-kits-server)

  The custom Express server, for SSR

They're managed by [Lerna](https://github.com/lerna/lerna) so you don't need to `npm link` manually :D

## Getting started
```sh
npx react-kits init myapp
```

## Contributing
```sh
# First, clone the repo
# then install
yarn

# Bootstrap packages
yarn bootstrap

# Ready to develop locally!
```

### Release packages

```sh
npm run release

# This will run `build` script for each package before release
```

## Forking

This toolkit is easy to fork if you want to add your opinionated stuff.

- First, you can reserve package names to replace `react-kits-cli` and `react-kits-server`
- Next, you can decide whether to **alias** existing `react-kits` import name or **update all imports** into new names
  - For **update all imports**: It's clear, just update all `react-kits` + `react-kits-server` imports into new ones. (I might build a tool to automate this soon)
  - For **alias**: You add the alias for them in [webpack.base.config.js](https://github.com/antonybudianto/react-kits/blob/master/packages/react-kits-cli/src/config/webpack.base.config.js)
    ```js
    {
      resolve: {
        alias: {
          'react-kits': 'mycustom-react-kits',
          'react-kits-server': 'mycustom-react-kits-server'
        }
      }
    }
    ```
- You may change the binary name (react-kits <command>) if you wish on [here](https://github.com/antonybudianto/react-kits/blob/master/packages/react-kits-cli/package.json#L7) (optional)
- Run `yarn bootstrap` and check if nothing breaks
- Finally run `npm run release` to release your new fork!



## License
MIT
