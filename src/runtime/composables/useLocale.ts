import type { Locale } from "@nuxt/ui";
import { computed, inject, toRef } from "vue";
import { createSharedComposable } from "@vueuse/core";
import { localeContextInjectionKey } from "@nuxt/ui/composables/useLocale.js";
import { buildLocaleContext } from "@nuxt/ui/runtime/utils/locale.js";
import en from "../locale/en";
import type { Messages } from "../types/locale";
import { ref, type Ref } from "vue";

const _useLocale = (localeOverrides?: Ref<Locale<Messages> | undefined>) => {
  const locale =
    localeOverrides || toRef(inject(localeContextInjectionKey, ref(en)));
  return buildLocaleContext(computed(() => locale.value || en));
};

export const useLocalePro = createSharedComposable(_useLocale);
