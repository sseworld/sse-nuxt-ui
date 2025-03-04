import {
  createResolver,
  defineNuxtModule,
  addImportsDir,
  hasNuxtModule,
  addComponentsDir,
  addPlugin,
} from "@nuxt/kit";
import { defu } from "defu";

export interface ModuleOptions {
  routerOptions?: boolean;
  content?: boolean;
  customScrollbars?: boolean;
}

export default defineNuxtModule({
  meta: {
    name: "sse-ui",
    configKey: "sseUI",
    compatibility: {
      nuxt: "^3.10.0",
    },
  },
  defaults: {
    routerOptions: undefined as boolean | undefined,
    content: false,
    customScrollbars: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    if (options.routerOptions || options.routerOptions === undefined) {
      nuxt.hook("pages:routerOptions", ({ files }: { files: Array<any> }) => {
        const customRouterOptions = files.find((file) =>
          /\/app\/router\.options\.(ts|js)$/.exec(file.path)
        );
        if (options.routerOptions === undefined && customRouterOptions) {
          console.warn(
            `You seem to have a custom router.options file \`${customRouterOptions.path}\`\nThe scrollBehavior will be overriden with ui-pro own router.options unless you set \`sseNUi: { routerOptions: false }\` in your nuxt.config\nSet \`uiPro: { routerOptions: true }\` to disable this warning`
          );
        }
        files.push({
          path: resolver.resolve("runtime/app/router.options.ts"),
          optional: true,
        });
      });
    }

    if (options.customScrollbars) {
      addPlugin({
        src: resolver.resolve("runtime/plugins/scrollbars.client.ts"),
      });

      nuxt.options.css.push(
        resolver.resolve("runtime/assets/css/scrollbars.css")
      );
    }

    /**
     * Add Content components & utils only if Nuxt Content is present
     */
    if (hasNuxtModule("@nuxt/content") || options.content) {
      // Add auto-imported utils
      addImportsDir(resolver.resolve("runtime/utils"));

      addComponentsDir({
        path: resolver.resolve("runtime/components/global"),
        global: true,
        prefix: "",
        pathPrefix: false,
      });

      addComponentsDir({
        path: resolver.resolve("runtime/components/content"),
        prefix: "U",
        pathPrefix: false,
      });

      addComponentsDir({
        path: resolver.resolve("runtime/components/docs"),
        prefix: "U",
        pathPrefix: false,
      });

      // @ts-ignore
      nuxt.options.content = defu(nuxt.options.content, {
        highlight: {
          theme: {
            light: "material-theme-lighter",
            default: "material-theme",
            dark: "material-theme-palenight",
          },
          preload: [
            "json",
            "js",
            "ts",
            "html",
            "css",
            "vue",
            "diff",
            "shell",
            "markdown",
            "yaml",
            "bash",
            "ini",
          ],
        },
        navigation: {
          fields: ["icon", "to", "target"],
        },
      });

      // @ts-ignore
      nuxt.hook("tailwindcss:config", function (tailwindConfig) {
        tailwindConfig.content = tailwindConfig.content ?? { files: [] };
        (Array.isArray(tailwindConfig.content)
          ? tailwindConfig.content
          : tailwindConfig.content.files
        ).push(resolver.resolve("./runtime/components/**/*.{vue,mjs,ts}"));
      });
    }
  },
});
