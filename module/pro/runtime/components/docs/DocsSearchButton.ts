import { h } from "vue";
import ContentSearchButton from "../content/ContentSearchButton.vue";

/**
 * @deprecated use `ContentSearchButton` instead
 */
export default (_: any, context: any) => {
  console.warn(
    "[@sseui/nuxt] `DocsSearchButton` is deprecated, use `ContentSearchButton` instead."
  );

  return h(ContentSearchButton, context.attrs, context.slots);
};
