import { h } from "vue";
import ContentToc from "../content/ContentToc.vue";

/**
 * @deprecated use `ContentToc` instead
 */
export default (_: any, context: any) => {
  console.warn(
    "[@sseui/nuxt] `DocsToc` is deprecated, use `ContentToc` instead."
  );

  return h(ContentToc, context.attrs, context.slots);
};
