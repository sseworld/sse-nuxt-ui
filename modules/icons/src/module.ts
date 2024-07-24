import { defineNuxtModule, createResolver, addComponent } from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "sse-nui-icons",
    configKey: "sseNUiIcons",
    compatibility: {
      nuxt: "^3.10.0",
    },
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    addComponent({
      name: "nuxt-icon",
      global: true,
      filePath: resolve("./runtime/components/nuxt-icon.vue"),
    });
  },
});
