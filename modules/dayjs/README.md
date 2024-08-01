![Nuxt Day.js module](./.github/card.png)

# Day.js Nuxt Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[Day.js](https://day.js.org/) Nuxt Module supporting v3
## Features

<!-- Highlight some of the features your module provide here -->

- ⛰ &nbsp;Nuxt 3 ready
- 🚠 &nbsp;Activate any plugin or locale available
- 🌲 &nbsp;Specify default locales and timezones

## Quick Setup

1. Add `@sse-ui/nuxt` to the `extends` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  extends: ["@sse-ui/nuxt"],
});
```

## Basic Usage

You can use the provided `$dayjs` to access Day.js in template.

```vue
<template>
  <div>
    <time :datetime="$dayjs('2023-01-01').utc().toString()"> {{ date }} </time>
  </div>
</template>
```

## Composables

You can use the useDayjs composable to access Day.js anywhere.

```js
<script setup>
  import {useDayjs} from '#sse-nui/dayjs' // not need if you are using auto
  import const dayjs = useDayjs() dayjs.locale('fr') dayjs.extend(...)
</script>
```

## Configuration

You can specify any amount of locales, plugins, set a default locale, and set a default timezone

```ts
export default defineNuxtConfig({
  extends: ["@sse-ui/nuxt"],
  sseDayJs: {
    locales: ["en", "fr"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "en",
    defaultTimezone: "America/New_York",
  },
});
```

> By default we include the relativeTime and utc plugins, and always import updateLocale

## External Plugins

```ts
export default defineNuxtConfig({
  extends: ["@sse-ui/nuxt"],
  sseDayJs: {
    ...
    externalPlugins: [{
      name: 'dayjsBusinessDays',
      package: 'dayjs-business-days2',
      option: {
        holidays: [`2023-12-26`],
        holidayFormat: `YYYY-MM-DD`,
      }
    }]
    ...
  }
})
```

## Optional defaultLocale customization

Instead of a locale string in `defaultLocale:`, you can define an array with a custom locale. See [dayjs customization](https://day.js.org/docs/en/customization/customization) for more information.

Here is an example for a relativeTime configuration, lets create one that [Gollum](https://en.wiktionary.org/wiki/hobbitses) would understand:

```ts
export default defineNuxtConfig({
  extends: ["@sse-ui/nuxt"],
  sseDayJs: {
    ...
    defaultLocale: ['en', {
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: 'a few secondses',
        m: "a minute",
        mm: "%d minuteses",
        h: "an hour",
        hh: "%d hourses",
        d: "a day",
        dd: "%d dayses",
        M: "a month",
        MM: "%d monthseses",
        y: "a year",
        yy: "%d yearseses"
      }
    }]
    ...
  }
})
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@sse-ui/nuxt/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://www.npmjs.com/package/@sse-ui/nuxt
[npm-downloads-src]: https://img.shields.io/npm/dm/%40sse-ui%2Fnuxt.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://www.npmjs.com/package/@sse-ui/nuxt
[license-src]: https://img.shields.io/npm/l/%40sse-ui%2Fnuxt.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://www.npmjs.com/package/@sse-ui/nuxt
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
