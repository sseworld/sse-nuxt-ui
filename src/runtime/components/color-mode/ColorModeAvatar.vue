<script lang="ts">
import type { AvatarProps } from "@nuxt/ui";
export interface ColorModeAvatarProps extends Omit<AvatarProps, "src"> {
  light: string;
  dark: string;
}
</script>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false });
defineProps<ColorModeAvatarProps>();
</script>

<template>
  <UAvatar :src="light" class="dark:hidden" v-bind="$attrs" />
  <UAvatar :src="dark" class="hidden dark:block" v-bind="$attrs" />
</template>
