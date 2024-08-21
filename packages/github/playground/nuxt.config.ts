import githubModule from "../src/module";

export default defineNuxtConfig({
  modules: [githubModule, "@nuxt/content"],

  sseGithub: {
    owner: "sseworld",
    repo: "sse-nuxt-ui",
    branch: "master",
    token: process.env.GITHUB_TOKEN,
  },

  experimental: {
    payloadExtraction: false,
  },

  compatibilityDate: "2024-08-21",
});