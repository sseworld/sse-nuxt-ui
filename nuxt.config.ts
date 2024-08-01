// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  alias: {
    "#sse-nui": resolve("./"),
    "#sse-nui/auth": resolve("./modules/auth/runtime/types/index"),
    "#sse-nui/dayjs": resolve("./modules/dayjs/runtime/composables/dayjs"),
  },
  components: [{ path: "#sse-nui/components", prefix: "U", pathPrefix: false }],
  css: ["#sse-nui/assets/css/main.css"],

  vite: {
    optimizeDeps: {
      include: ["vue3-smooth-dnd"],
    },
  },

  modules: ["@nuxt/ui", "@nuxt/content"],
});
