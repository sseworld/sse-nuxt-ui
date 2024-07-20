import { h } from "vue";
import ContentSurroundLink from "../content/ContentSurroundLink.vue";

/**
 * @deprecated use `ContentSurroundLink` instead
 */
export default (_: any, context: any) => {
  console.warn(
    "[@sseui/nuxt] `DocsSurroundLink` is deprecated, use `ContentSurroundLink` instead."
  );

  return h(ContentSurroundLink, context.attrs, context.slots);
};
