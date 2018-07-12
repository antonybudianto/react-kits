# react-kits [![Build Status](https://travis-ci.com/antonybudianto/react-kits.svg?branch=master)](https://travis-ci.com/antonybudianto/react-kits)

This is my opinionated Fullstack React kits, featuring SSR, Lazy-loading, Prefetching, Full HMR.

## Requirement
- Node >= 8.6

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
