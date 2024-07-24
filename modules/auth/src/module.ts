import { writeFile, readFile } from "node:fs/promises";
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImportsDir,
  addServerHandler,
  addServerImportsDir,
  addComponentsDir,
} from "@nuxt/kit";
import { join } from "pathe"
import { defu } from "defu"
import { randomUUID } from "uncrypto"

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'sse-nui-auth',
        configKey: 'sseAuth'
    },

    defaults: {},
    async setup(options, nuxt) {
      const resolver = createResolver(import.meta.url)

      nuxt.options.alias["#sse-nui/auth"] = resolver.resolve('./runtime/types/index')
    }
})