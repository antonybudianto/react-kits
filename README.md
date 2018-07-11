# react-kits

## Intro

This is my opinionated Fullstack React kits, featuring SSR, Lazy-loading, Prefetching, Full HMR.

## Structure

The project consists of following packages:
- [react-kits-cli](https://github.com/antonybudianto/react-kits/tree/master/packages/react-kits-cli)

  The CLI, handles start dev-server, bundling, and common utils
- [react-kits-server](https://github.com/antonybudianto/react-kits/tree/master/packages/react-kits-server)

  The custom Express server, for SSR
- [react-ssr-starter](https://github.com/antonybudianto/react-kits/tree/master/packages/react-ssr-starter)

  The starter that used both packages above

They're managed by [Lerna](https://github.com/lerna/lerna) so you don't need to `npm link` manually :D

## Getting started

```sh
# First, clone the repo
# then install
yarn

# bootstrap packages
yarn bootstrap

# ready to develop locally!
```

## Release packages

```sh
npm run release

# this will run `build` script for each package before release
```

## License
MIT
