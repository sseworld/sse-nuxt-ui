[![nuxt-ui-pro.png](https://volta.s3.fr-par.scw.cloud/306965274_1682f2a7_dfc5_4c85_9807_6203cd568852_154cf5592c.png)](https://sseworld.github.io)

# SSE Nuxt UI

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt UI Pro is a collection of Vue components, composables and utils **built on top of Nuxt UI**, oriented on **structure and layout** and designed to be used as **building blocks for your app**.

<!-- - [Documentation](https://ui.nuxt.com/pro/getting-started) -->

## Templates

You can get started with our [minimal starter](https://github.com/nuxt-ui-pro/starter), one of our [official templates](https://ui.nuxt.com/pro/templates) or follow the [Installation](https://ui.nuxt.com/pro/getting-started/installation) guide to install Nuxt UI Pro in your existing project.

- [Landing](https://github.com/nuxt-ui-pro/landing)
- [Docs](https://github.com/nuxt-ui-pro/docs)
- [SaaS](https://github.com/nuxt-ui-pro/saas)
- [Dashboard](https://github.com/nuxt-ui-pro/dashboard)

## Installation

```bash
# npm
npm install @sse-ui/nuxt
# yarn
yarn add @sse-ui/nuxt
# pnpm
pnpm add @sse-ui/nuxt
# bun
bun add @sse-ui/nuxt
```

Note that `@sse-ui/nuxt` will also install [`@nuxt/ui`](https://ui.nuxt.com) as dependency to your project.

Next, add it to your `nuxt.config.ts` in the `extends` property:

```ts
export default defineNuxtConfig({
  extends: ['@sse-ui/nuxt'],
  modules: ['@nuxt/ui']
})
```

Start your development server, you should now be able to use all the components, composables and utils from Nuxt UI Pro 🚀

## Showcase

Here are some open-source projects using Nuxt UI Pro:

- [Nuxt.com](https://github.com/nuxt/nuxt.com)
- [Nuxt Image](https://github.com/nuxt/image/tree/main/docs)
- [Vue Email](https://github.com/vue-email/docs)
- [Unhead](https://github.com/unjs/unhead/tree/main/docs)
- [Oku](https://github.com/oku-ui/docs)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@sse-ui/nuxt/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@sse-ui/nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/@sse-ui/nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@sse-ui/nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com

## License
[MIT](./LICENSE)
