# WPNuxt Blocks

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A set of default components to render Gutenberg Blocks with the WPNuxt module

Allows to override each block component to be overriden by a custom component to have full control over how every Gutenberg Block is rendered in Nuxt.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/wpnuxt/wpnuxt-blocks?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://wpnuxt.com) -->


## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @wpnuxt/blocks
```

That's it! You can now use WPNuxt Blocks in your Nuxt app ✨


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm run dev:prepare
  
  # Develop with the playground
  pnpm run dev
  
  # Build the playground
  pnpm run dev:build
  
  # Run ESLint
  pnpm run lint
  
  # Run Vitest
  pnpm run test
  pnpm run test:watch
  
  # Release new version
  pnpm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@wpnuxt/core/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://www.npmjs.com/package/@wpnuxt/core

[npm-downloads-src]: https://img.shields.io/npm/dm/@wpnuxt/core.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@wpnuxt/core

[license-src]: https://img.shields.io/npm/l/@wpnuxt/core.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@wpnuxt/core
