import type { AppConfig as NuxtAppConfig } from "@nuxt/schema";

interface AppConfig extends NuxtAppConfig {
    ui: {
      presets: any;
    };
  }

export default defineNuxtPlugin(() => {
    const appConfig = useAppConfig() as AppConfig;

    return {
        provide: {
            ui: appConfig.ui.presets
        }
    }
})