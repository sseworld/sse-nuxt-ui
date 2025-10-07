import { defu } from "defu";
import type { UnpluginOptions } from "unplugin";
import type { SSENuxtUIOptions } from "../unplugin";
import { icons } from "../template";

export default function AppConfigPlugin(
  appConfig: SSENuxtUIOptions,
): UnpluginOptions {
  return {
    name: "nuxt:sse-ui:app-config",
    enforce: "pre",
    resolveId(id) {
      if (id === "#build/app.config") {
        return "virtual:nuxt-ui-app-config";
      }
    },
    transform(code, id) {
      if (id === "virtual:nuxt-ui-app-config") {
        const existingConfig = new Function(
          `return ${code.match(/export default (.*)/s)?.[1]}`,
        )();
        const mergedConfig = defu(existingConfig, {
          ui: {
            icons,
          },
          sseUiPro: appConfig.sseUiPro,
        });
        return `export default ${JSON.stringify(mergedConfig)}`;
      }
    },
  };
}
