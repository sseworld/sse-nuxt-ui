import defu from "defu";
import {
    addComponentsDir,
  addImportsDir,
  createResolver,
  hasNuxtModule,
  installModule,
  defineNuxtModule,
} from "@nuxt/kit";
import type { HookResult } from "@nuxt/schema";
import { version, name, icons, addTemplates } from "./shared/ui";
import "node:url";
import "scule";

interface ModuleOptions {
  /**
   * Force the import of prose components even if @nuxtjs/mdc or @nuxt/content is not installed
   * @defaultValue false
   */
  mdc?: boolean;
  /**
   * Force the import of content & prose components even if @nuxt/content is not installed
   * @defaultValue false
   */
  content?: boolean;
}

declare module "#app" {
  interface RuntimeNuxtHooks {
    "dashboard:search:toggle": () => HookResult;
    "dashboard:sidebar:toggle": () => HookResult;
    "dashboard:sidebar:collapse": (value: boolean) => HookResult;
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "sseUiPro",
    compatibility: {
      nuxt: ">=3.16.0",
    },
  },
  defaults: {
    mdc: false,
    content: false,
  },
  async setup(options, nuxt) {
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui, { icons });

    if (!hasNuxtModule("@nuxt/ui")) {
      await installModule("@nuxt/ui");
    }

    const { resolve } = createResolver(import.meta.url);
    nuxt.options.alias["#sse-ui-pro"] = resolve("./runtime");
    nuxt.options.appConfig.sseUiPro = defu(
      nuxt.options.appConfig.sseUiPro || {},
      {},
    );

    nuxt.options.router.options.scrollBehaviorType = "smooth";

    //  if (hasNuxtModule("@nuxtjs/mdc") || options.mdc || (hasNuxtModule("@nuxt/content") || options.content)) {
    //   // @ts-expect-error
    //   nuxt.options.mdc = defu(nuxt.options.mdc, {
    //     highlight: {
    //       theme: {
    //         light: "material-theme-lighter",
    //         default: "material-theme",
    //         dark: "material-theme-palenight"
    //       }
    //     },
    //     components: {
    //       map: {
    //         "accordion": "ProseAccordion",
    //         "accordion-item": "ProseAccordionItem",
    //         "badge": "ProseBadge",
    //         "callout": "ProseCallout",
    //         "card": "ProseCard",
    //         "card-group": "ProseCardGroup",
    //         "caution": "ProseCaution",
    //         "code-collapse": "ProseCodeCollapse",
    //         "code-group": "ProseCodeGroup",
    //         "code-icon": "ProseCodeIcon",
    //         "code-preview": "ProseCodePreview",
    //         "code-tree": "ProseCodeTree",
    //         "collapsible": "ProseCollapsible",
    //         "field": "ProseField",
    //         "field-group": "ProseFieldGroup",
    //         "icon": "ProseIcon",
    //         "kbd": "ProseKbd",
    //         "note": "ProseNote",
    //         "steps": "ProseSteps",
    //         "tabs": "ProseTabs",
    //         "tabs-item": "ProseTabsItem",
    //         "tip": "ProseTip",
    //         "warning": "ProseWarning"
    //       }
    //     }
    //   });
    //   addComponentsDir({
    //     path: resolve("./runtime/components/prose"),
    //     prefix: "Prose",
    //     pathPrefix: false,
    //     global: true
    //   });
    // }

    // if (hasNuxtModule("@nuxt/content") || options.content) {
    //   addComponentsDir({
    //     path: resolve("./runtime/components/content"),
    //     pathPrefix: false,
    //     prefix: nuxt.options.ui?.prefix || "U"
    //   });
    // }

    // if (hasNuxtModule("@nuxtjs/color-mode")) {
    //   addComponentsDir({
    //     path: resolve("./runtime/components/color-mode"),
    //     pathPrefix: false,
    //     prefix: nuxt.options.ui?.prefix || "U"
    //   });
    // } else {
    //   addImportsDir(resolve("./runtime/composables/color-mode"));
    // }

    // addComponentsDir({
    //   path: resolve("./runtime/components"),
    //   pathPrefix: false,
    //   prefix: nuxt.options.ui?.prefix || "U",
    //   ignore: ["color-mode/**", "content/**", "prose/**"]
    // });
    addImportsDir(resolve("./runtime/composables"));
    addTemplates(options, nuxt);
  },
});
