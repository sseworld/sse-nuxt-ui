<script lang="ts">
import type { SelectMenuProps } from "@nuxt/ui";
export interface ColorModeSelectProps
  extends Pick<
    SelectMenuProps<any>,
    | "color"
    | "variant"
    | "size"
    | "trailingIcon"
    | "selectedIcon"
    | "content"
    | "arrow"
    | "portal"
    | "disabled"
    | "ui"
  > {}
</script>

<script lang="ts" setup>
import { computed } from "vue";
import { useColorMode, useAppConfig } from "#imports";
import { useLocalePro } from "../../composables/useLocale";

defineOptions({ inheritAttrs: false });
defineProps<ColorModeSelectProps>();

const { t } = useLocalePro();
const colorMode = useColorMode();
const appConfig = useAppConfig();

const items = computed(() => [
  {
    label: t("colorMode.system"),
    value: "system",
    icon: appConfig.ui.icons.system,
  },
  {
    label: t("colorMode.light"),
    value: "light",
    icon: appConfig.ui.icons.light,
  },
  { label: t("colorMode.dark"), value: "dark", icon: appConfig.ui.icons.dark },
]);

const preference = computed({
  get() {
    return (
      items.value.find((option) => option.value === colorMode.preference) ||
      items.value[0]
    );
  },
  set(option) {
    colorMode.preference = option!.value;
  },
});
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <USelectMenu
      v-model="preference"
      :search-input="false"
      :icon="preference?.icon"
      v-bind="$attrs"
      :items="items"
    />

    <template #fallback>
      <USelectMenu
        :search-input="false"
        :icon="items[0]?.icon"
        v-bind="$attrs"
        :model-value="items[0]"
        :items="items"
        disabled
      />
    </template>
  </ClientOnly>
</template>
