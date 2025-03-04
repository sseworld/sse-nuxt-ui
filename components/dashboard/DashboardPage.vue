<template>
  <div :class="ui.wrapper" v-bind="attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { DeepPartial } from "#ui/types";

const config = {
  wrapper: "flex flex-1 w-full min-w-0",
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
  "dashboard.page",
  toRef(props, "ui"),
  config,
  toRef(props, "class"),
  true
);
</script>
