# Github Module

> GitHub integration for [Nuxt](https://v3.nuxtjs.org) & [Content](https://content.nuxtjs.org)

## Setup

Install `@sse-ui/nu-github` in your project:

```bash
# Using Yarn
yarn add --dev @sse-ui/nu-github
# Using NPM
npm install --save-dev @sse-ui/nu-github
# Using PNPM
pnpm add --save-dev @sse-ui/nu-github
```

Then, add `@sse-ui/nu-github` to the `modules` section of your `nuxt.config.ts`:

```ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content', // Required
    '@sse-ui/nu-github'
  ],
  sseGithub: {
    repo: 'nuxt/framework' // Or use GITHUB_REPO in .env
  }
})
```

Lastly, create a [personal access token](https://github.com/settings/tokens) on GitHub and add it into your `.env`:

```env
GITHUB_TOKEN='<your-personal-token>'
```

## Usage

```vue
<script setup lang="ts">
const { data: releases } = await useAsyncData('releases', () => githubReleases())
</script>

<template>
  <div>
    <div v-for="release in releases" :key="release.name">
      <ProseH2 :id="release.name">{{ release.name }}</ProseH2>
      <Content :document="release" />
    </div>
  </div>
</template>
```

## Options

```ts
sseGithub: {
  repo: string,
  releases: false | {
    api: string
    repo: string
    token: string
    /**
     * Parse release notes markdown and return AST tree
     *
     * Note: This option is only available when you have `@nuxt/content` installed in your project.
     *
     * @default true
     */
    parse: boolean
  }
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Generate type stubs using `yarn prepare` or `npm run prepare`
4. In `playground/.env`, add your [personal access token](https://github.com/settings/tokens)
  ```env
  GITHUB_TOKEN='<your-personal-token>'
  ```
5. Launch playground using `yarn dev` or `npm run dev`