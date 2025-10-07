import * as unplugin from "unplugin";
import type { NuxtUIOptions } from "@nuxt/ui/unplugin";
import * as sseUiPro from "#build/sse-ui";
import type { TVConfig } from "@nuxt/ui";

import { fileURLToPath } from "node:url";
import { normalize, join } from "pathe";
import { globSync } from "tinyglobby";
import { defu } from "defu";
import ui from "@nuxt/ui/vite";
import "scule";
import "@nuxt/kit";
import TemplatePlugin from "./plugin/templates";
import AppConfigPlugin from "./plugin/app-config";

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/
type SSEAppConfigUI = TVConfig<typeof sseUiPro>;
interface SSENuxtUIOptions extends NuxtUIOptions {
  sseUiPro?: SSEAppConfigUI;
}

/* -------------------------------------------------------------------------------------------------
 * Functions
 * -----------------------------------------------------------------------------------------------*/
const runtimeDir = normalize(
  fileURLToPath(new URL("./runtime", import.meta.url)),
);

const resolveColors = (colors: any) => {
  return colors?.length
    ? [.../* @__PURE__ */ new Set(["primary", ...colors])]
    : ["primary", "secondary", "success", "info", "warning", "error"];
};

export const SSENuxtUIPlugin = unplugin.createUnplugin<
  SSENuxtUIOptions | undefined,
  boolean
>((_options = {}) => {
  let options = defu(_options, {
    prefix: "U",
    colorMode: true,
    theme: {
      colors: void 0,
      transitions: true,
    },
    autoImport: {
      dirs: [join(runtimeDir, "composables")],
    },
    extraRuntimeDir: runtimeDir,
  });

  options.theme = options.theme || {};
  options.theme.colors = resolveColors(options.theme.colors);

  const components = globSync("**/*.vue", {
    cwd: join(runtimeDir, "components"),
    ignore: [
      !options.colorMode && "color-mode/**/*.vue",
      "content/*.vue",
      "prose/**/*.vue",
    ].filter(Boolean) as readonly string[],
  });
  const componentNames = new Set(
    components.map(
      (c) =>
        `${options.prefix}${c
          .split("/")
          .pop()
          ?.replace(/\.vue$/, "")}`,
    ),
  );
  const componentPaths = new Map(
    components.map((c) => {
      const name = c.replace(/\.vue$/, "");
      const componentName = `${options.prefix}${name.split("/").pop()}`;
      return [componentName, c];
    }),
  );

  const overrides = globSync("**/*.vue", {
    cwd: join(runtimeDir, "vue/components"),
    ignore: [!options.colorMode && "color-mode/**/*.vue"].filter(
      Boolean,
    ) as readonly string[],
  });
  const overrideNames = new Set(
    overrides.map(
      (c) =>
        `${options.prefix}${c
          .split("/")
          .pop()
          ?.replace(/\.vue$/, "")}`,
    ),
  );
  const overridePaths = new Map(
    overrides.map((c) => {
      const name = c.replace(/\.vue$/, "");
      const componentName = `${options.prefix}${name.split("/").pop()}`;
      return [componentName, c];
    }),
  );

  options = defu(options, {
    components: {
      resolvers: [
        (componentName: string) => {
          if (overrideNames.has(componentName)) {
            const relativePath = overridePaths.get(componentName);
            return {
              name: "default",
              from: join(runtimeDir, "vue/components", relativePath!),
            };
          }
          if (componentNames.has(componentName)) {
            const relativePath = componentPaths.get(componentName);
            return {
              name: "default",
              from: join(runtimeDir, "components", relativePath!),
            };
          }
        },
      ],
    },
  });

  const appConfig = { sseUiPro: options.sseUiPro };
  return [
    ui(options),
    TemplatePlugin(options),
    AppConfigPlugin(appConfig),
  ].flat(1) as unplugin.UnpluginOptions[];
});

export { runtimeDir, type SSENuxtUIOptions };
