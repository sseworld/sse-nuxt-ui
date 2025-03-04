// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config"
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  alias: {
    "#sse-ui": resolve("./"),
  },
  components: [{ path: "#sse-ui/components", prefix: "U", pathPrefix: false }],
  css: ["#sse-ui/assets/css/main.css"],

  vite: {
    optimizeDeps: {
      include: ["vue3-smooth-dnd"],
    },
  },

  modules: ["@nuxt/ui", "@nuxt/content"],
});
