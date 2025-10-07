<script lang="ts">
import type { ButtonProps } from "@nuxt/ui";

export interface ColorModeButtonProps
  extends Pick<ButtonProps, "as" | "size" | "disabled" | "ui"> {
  /**
   * @defaultValue 'neutral'
   */
  color?: ButtonProps["color"];
  /**
   * @defaultValue 'ghost'
   */
  variant?: ButtonProps["variant"];
}
</script>

<script lang="ts" setup>
import { computed } from "vue";
import { useAppConfig, useColorMode } from "#imports";
import { useLocalePro } from "~/src/runtime/composables/useLocale";

defineProps<ColorModeButtonProps>();

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
  <UButton
    :icon="isDark ? appConfig.ui.icons.dark : appConfig.ui.icons.light"
    :color="color"
    :variant="variant"
    :aria-label="
      isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark')
    "
    @click="isDark = !isDark"
  />
</template>
