<script lang="ts">
import type { AccordionRootProps, AccordionRootEmits } from "reka-ui";
import type { AppConfig } from "@nuxt/schema";
import type { BadgeProps, LinkProps, ComponentConfig } from "@nuxt/ui";
import type { ContentNavigationItem } from "@nuxt/content";
import theme from "#build/sse-ui/content/content-navigation";

type ContentNavigation = ComponentConfig<
  typeof theme,
  AppConfig,
  "contentNavigation",
  "sseUiPro"
>;

export interface ContentNavigationLink extends ContentNavigationItem {
  /**
   * @IconifyIcon
   */
  icon?: string;
  /**
   * Display a badge on the link.
   * `{ color: 'neutral', variant: 'outline', size: 'sm' }`{lang="ts-type"}
   */
  badge?: string | number | BadgeProps;
  target?: LinkProps["target"];
  /**
   * @IconifyIcon
   */
  trailingIcon?: string;
  disabled?: boolean;
  children?: ContentNavigationLink[];
  defaultOpen?: boolean;
  active?: boolean;
  class?: any;
  ui?: Pick<
    ContentNavigation["slots"],
    | "link"
    | "linkLeadingIcon"
    | "linkTitle"
    | "linkTrailing"
    | "linkTrailingIcon"
    | "linkTrailingBadge"
    | "linkTrailingBadgeSize"
    | "linkTrailingIcon"
    | "linkTitleExternalIcon"
    | "trigger"
    | "content"
    | "item"
    | "itemWithChildren"
  >;
}

export interface ContentNavigationProps<
  T extends ContentNavigationLink = ContentNavigationLink,
> extends Pick<AccordionRootProps, "disabled" | "type" | "unmountOnHide"> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any;
  /**
   * When `true`, the tree will be opened based on the current route.
   * When `false`, the tree will be closed.
   * When `undefined` (default), the first item will be opened with `type="single"` and the first level will be opened with `type="multiple"`.
   */
  defaultOpen?: boolean;
  /**
   * The icon displayed to toggle the accordion.
   * @defaultValue appConfig.ui.icons.chevronDown
   * @IconifyIcon
   */
  trailingIcon?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: ContentNavigation["variants"]["color"];
  /**
   * @defaultValue 'pill'
   */
  variant?: ContentNavigation["variants"]["variant"];
  /**
   * Display a line next to the active link.
   * @defaultValue false
   */
  highlight?: boolean;
  /**
   * @defaultValue 'primary'
   */
  highlightColor?: ContentNavigation["variants"]["highlightColor"];
  /**
   * When type is "single", allows closing content when clicking trigger for an open item.
   * When type is "multiple", this prop has no effect.
   * @defaultValue true
   */
  collapsible?: boolean;
  level?: number;
  navigation?: T[];
  class?: any;
  ui?: ContentNavigation["slots"];
}

export interface ContentNavigationEmits extends AccordionRootEmits {}

type SlotProps<T> = (props: { link: T; active?: boolean }) => any;

export interface ContentNavigationSlots<
  T extends ContentNavigationLink = ContentNavigationLink,
> {
  link: SlotProps<T>;
  "link-leading": SlotProps<T>;
  "link-title": SlotProps<T>;
  "link-trailing": SlotProps<T>;
}
</script>

<script lang="ts" setup>
import { computed } from "vue";
import {
  Primitive,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useForwardPropsEmits,
} from "reka-ui";
import { pickLinkProps } from "@nuxt/ui/utils/link";
import { reactivePick, createReusableTemplate } from "@vueuse/core";
import { useRoute, useAppConfig } from "#imports";
import { tv } from "../../utils/tv";
import { mapContentNavigationItem } from "../../utils";

defineOptions({ inheritAttrs: false });
const props = defineProps<ContentNavigationProps>();
const emits = defineEmits<ContentNavigationEmits>();
const slots = defineSlots<ContentNavigationSlots>();

const rootProps = useForwardPropsEmits(
  reactivePick(props, "collapsible", "disabled", "type", "unmountOnHide"),
  emits,
);

const route = useRoute();
const appConfig = useAppConfig();
const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();

const ui = computed(() =>
  tv({ extend: tv(theme), ...(appConfig.sseUiPro?.contentNavigation || {}) })({
    color: props.color,
    variant: props.variant,
    highlight: props.highlight,
    highlightColor: props.highlightColor || props.color,
  }),
);
</script>
