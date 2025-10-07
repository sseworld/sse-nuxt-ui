<script lang="ts">
import type { SwitchProps } from "@nuxt/ui";
export interface ColorModeSwitchProps
  extends Pick<SwitchProps, "as" | "color" | "size" | "disabled" | "ui"> {}
</script>

<script lang="ts" setup>
import { computed } from "vue";
import { useColorMode, useAppConfig } from "#imports";
import { useLocalePro } from "../../composables/useLocale";

defineOptions({ inheritAttrs: false });
defineProps<ColorModeSwitchProps>();

const { t } = useLocalePro();
const colorMode = useColorMode();
const appConfig = useAppConfig();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <USwitch
      v-model="isDark"
      :checked-icon="appConfig.ui.icons.dark"
      :unchecked-icon="appConfig.ui.icons.light"
      :aria-label="
        isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark')
      "
      v-bind="$attrs"
    />

    <template #fallback>
      <USwitch
        :checked-icon="appConfig.ui.icons.dark"
        :unchecked-icon="appConfig.ui.icons.light"
        :aria-label="
          isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark')
        "
        v-bind="$attrs"
        disabled
      />
    </template>
  </ClientOnly>
</template>
