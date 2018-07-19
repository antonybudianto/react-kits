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

## Release packages

```sh
npm run release

# This will run `build` script for each package before release
```

## License
MIT
