<template>
  <div :class="ui.wrapper" v-bind="attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { DeepPartial } from "#ui/types";

const config = {
  wrapper: "flex flex-col lg:grid gap-8 lg:grid-cols-12 relative",
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
  "landing.grid",
  toRef(props, "ui"),
  config,
  toRef(props, "class"),
  true
);
</script>
