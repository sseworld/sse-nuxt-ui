import { h } from "vue";
import ContentTocLinks from "../content/ContentTocLinks.vue";

/**
 * @deprecated use `ContentTocLinks` instead
 */
export default (_: any, context: any) => {
  console.warn(
    "[@sseui/nuxt] `DocsTocLinks` is deprecated, use `ContentTocLinks` instead."
  );

  return h(ContentTocLinks, context.attrs, context.slots);
};
