import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";

function _useContentSearch() {
  const open = ref<boolean>(false);
  return { open };
}

export const useContentSearch = createSharedComposable(_useContentSearch);
