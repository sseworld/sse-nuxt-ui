import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from "nuxt/schema";
import type { ModuleOptions } from "./module";
import { kebabCase } from "scule";
import { addTemplate, addTypeTemplate, hasNuxtModule } from "@nuxt/kit";
import * as theme from './theme'
import * as themeProse from './theme/prose'
import * as themeContent from './theme/content'

// export function buildTemplates(options: ModuleOptions) {
//   return Object.entries(theme).reduce((acc, [key, component]) => {
//     acc[key] = typeof component === 'function' ? component(options as Required<ModuleOptions>) : component
//     return acc
//   }, {} as Record<string, any>)
// }

export function getTemplates(options: ModuleOptions, uiOptions: Record<string, any>, nuxt?: Nuxt) {
    const templates: NuxtTemplate[] = []

  let hasProse = false
  let hasContent = false

  function writeThemeTemplate(theme: Record<string, any>, path?: string) {
    for (const component in theme) {
      templates.push({
        filename: `sse-ui/${path ? path + '/' : ''}${kebabCase(component)}.ts`,
        write: true,
        getContents: async () => {
          const template = (theme as any)[component]
          const result = typeof template === 'function' ? template(uiOptions) : template

          // Override default variants from nuxt.config.ts
          if (result?.defaultVariants?.color && uiOptions.theme?.defaultVariants?.color) {
            result.defaultVariants.color = uiOptions.theme.defaultVariants.color
          }
          if (result?.defaultVariants?.size && uiOptions.theme?.defaultVariants?.size) {
            result.defaultVariants.size = uiOptions.theme.defaultVariants.size
          }

          const variants = Object.entries(result.variants || {})
            .filter(([_, values]) => {
              const keys = Object.keys(values as Record<string, unknown>)
              return keys.some(key => key !== 'true' && key !== 'false')
            })
            .map(([key]) => key)

          let json = JSON.stringify(result, null, 2)

          for (const variant of variants) {
            json = json.replace(new RegExp(`("${variant}": "[^"]+")`, 'g'), `$1 as typeof ${variant}[number]`)
            json = json.replace(new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, 'g'), (_, before, match, after) => {
              const replaced = match.replace(/("[^"]+")/g, `$1 as typeof ${variant}[number]`)
              return `${before}${replaced}${after}`
            })
          }

          function generateVariantDeclarations(variants: string[]) {
            return variants.filter(variant => json.includes(`as typeof ${variant}`)).map((variant) => {
              const keys = Object.keys(result.variants[variant])
              return `const ${variant} = ${JSON.stringify(keys, null, 2)} as const`
            })
          }

          // For production build
          return [
            ...generateVariantDeclarations(variants),
            `export default ${json}`
          ].join('\n\n')
        }
      })
    }
  }

  if (!!nuxt && ((hasNuxtModule('@nuxtjs/mdc') || options.mdc) || (hasNuxtModule('@nuxt/content') || options.content))) {
    hasProse = true
    const path = 'prose'

    writeThemeTemplate(themeProse, path)

    templates.push({
      filename: `sse-ui/${path}/index.ts`,
      write: true,
      getContents: () => Object.keys(themeProse).map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')
    })
  }

  if (!!nuxt && (hasNuxtModule('@nuxt/content') || options.content)) {
    hasContent = true
    writeThemeTemplate(themeContent, 'content')
  }

  writeThemeTemplate(theme)

  templates.push({
    filename: 'sse-ui.css',
    write: true,
    getContents: () => `@source "./sse-ui";`
  })

  templates.push({
    filename: 'sse-ui/index.ts',
    write: true,
    getContents: () => {
      let contents = Object.keys(theme).map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')
      if (hasContent) {
        contents += '\n'
        contents += Object.keys(themeContent).map(component => `export { default as ${component} } from './content/${kebabCase(component)}'`).join('\n')
      }
      if (hasProse) contents += `\nexport * as prose from './prose'\n`
      return contents
    }
  })

  templates.push({
    filename: "types/sse-ui.d.ts",
    getContents: () => `import * as sseUiPro from '#build/sse-ui'
import type { TVConfig } from '@nuxt/ui'

type AppConfigUIPro = TVConfig<typeof sseUiPro>

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /**
     * SSE Nuxt UI theme configuration
     * @see https://ui3.nuxt.com/getting-started/theme#customize-theme
     */
    sseUiPro?: AppConfigUIPro
  }
}

export {}
`,
  });
  return templates;
}

export function addTemplates(options: ModuleOptions, nuxt: Nuxt) {
  const templates = getTemplates(options, nuxt.options.ui, nuxt);
  for (const template of templates) {
    if (template.filename!.endsWith(".d.ts")) {
      addTypeTemplate(template as NuxtTypeTemplate);
    } else {
      addTemplate(template);
    }
  }
}