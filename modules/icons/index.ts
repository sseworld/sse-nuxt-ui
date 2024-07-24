import { defineNuxtModule, createResolver, addComponent } from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "sse-nui-icons",
    configKey: "sseIcons",
    compatibility: {
      nuxt: "^3.10.0",
    },
  },
  
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    addComponent({
      name: "sse-icon",
      global: true,
      filePath: resolve("runtime/components/sse-icon.vue"),
    });
  },
});
