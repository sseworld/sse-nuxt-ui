import type { UnpluginOptions } from "unplugin";
import { getTemplates } from "../template";

/**
 * This plugin is responsible for getting the generated virtual templates and
 * making them available to the Vue build.
 */
export default function TemplatePlugin(options: any): UnpluginOptions {
  const templates = getTemplates(options, options);
  const templateKeys = new Set(templates.map((t) => `#build/${t.filename}`));

  return {
    name: "nuxt:sse-ui:templates",
    enforce: "pre" as const,
    resolveId(id) {
      if (templateKeys.has(id + ".ts")) {
        return id.replace("#build/", "virtual:sse-ui-templates/") + ".ts";
      }
    },
    loadInclude: (id) =>
      templateKeys.has(id.replace("virtual:sse-ui-templates/", "#build/")),
    load(id) {
      id = id.replace("virtual:sse-ui-templates/", "#build/");
      return templates.find((t) => `#build/${t.filename}` === id)!.getContents!(
        {} as any,
      );
    },
  };
}
