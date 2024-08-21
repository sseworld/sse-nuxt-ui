import { hash } from "ohash";
import { defineComponent, toRef, useSlots, watch } from "vue";
import type { PropType } from "vue";
import { useGithub } from "../composables/useGithub";
import { type GithubContributorsQuery } from "../types";
// @ts-ignore
import { useAsyncData } from "#imports";

export default defineComponent({
  props: {
    query: {
      type: Object as PropType<GithubContributorsQuery>,
      required: false,
      default: () => ({}),
    },
  },
  async setup(props) {
    const source = toRef(props.query, "source");

    const { fetchFileContributors } = useGithub();
    watch(source, () => {
      if (refresh) {
        refresh();
      }
    });

    const {
      data: contributors,
      refresh,
      pending,
    } = await useAsyncData(
      `github-file-contributors-${hash(props.query)}`,
      () => fetchFileContributors(props.query)
    );

    return {
      contributors,
      refresh,
      pending,
    };
  },
  render({ contributors, refresh, pending }) {
    const slots = useSlots();

    return slots?.default?.({ contributors, refresh, pending });
  },
});
