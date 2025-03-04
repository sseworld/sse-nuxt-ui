<template>
  <main :class="ui.wrapper" v-bind="attrs">
    <slot />
  </main>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { DeepPartial } from "#ui/types";

const config = {
  wrapper: "min-h-[calc(100vh-var(--header-height))]",
};

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined,
  },
  ui: {
    type: Object as PropType<DeepPartial<typeof config>>,
    default: () => ({}),
  },
});

const { ui, attrs } = useUI(
  "main",
  toRef(props, "ui"),
  config,
  toRef(props, "class"),
  true
);
</script>
