# react-kits [![Build Status](https://travis-ci.com/antonybudianto/react-kits.svg?branch=master)](https://travis-ci.com/antonybudianto/react-kits) [![npm version](https://badge.fury.io/js/react-kits.svg)](https://badge.fury.io/js/react-kits)

Opinionated Fullstack React toolkits featuring project generation, dev server, build production bundle, and common devtools.

Inspired by `react-scripts` from [create-react-app](https://github.com/facebook/create-react-app)

> If you just start learning React, please try [create-react-app](https://github.com/facebook/create-react-app)

Why not [create-react-app](https://github.com/facebook/create-react-app)?
- You want to house your own toolkit for your startup/company, with lots of opinionated customization
- You want full control of your build configuration, but in a manner of reusable toolkits (e.g. [react-scripts](https://github.com/facebook/create-react-app), [kcd-scripts](https://github.com/kentcdodds/kcd-scripts))

## Requirement
- Node >= 8.10.0

## Main features
- SSR (Server-side rendering)
- Universal Code-splitting (lazy + eager)
- Full HMR (Hot module reload)
- Data prefetching
- [DLL](https://webpack.js.org/plugins/dll-plugin/) ready for faster rebuild

## Tech stacks
|                                                                          	|                                                        	|                                                     	|                                   	|
|--------------------------------------------------------------------------	|--------------------------------------------------------	|-----------------------------------------------------	|-----------------------------------	|
|  [React](https://reactjs.org/)                                       	| [Redux](https://redux.js.org/)                         	| [React Helmet Async](https://github.com/staylor/react-helmet-async) 	| [Express](https://expressjs.com/) 	|
| [loadable-component](https://github.com/smooth-code/loadable-components) 	| [SASS](https://github.com/webpack-contrib/sass-loader) 	| [Babel](https://babeljs.io/)                        	| [Jest](https://jestjs.io/)        	|

## Structure

The project consists of following packages:
- [react-kits-cli](https://github.com/antonybudianto/react-kits/tree/master/packages/react-kits-cli)
- [react-kits-server](https://github.com/antonybudianto/react-kits/tree/master/packages/react-kits-server)

They're managed by [Lerna](https://github.com/lerna/lerna) so you don't need to do stuff manually (linking, releasing, etc) :D

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

## License
MIT
