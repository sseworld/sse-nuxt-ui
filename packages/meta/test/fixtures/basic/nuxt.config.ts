export default defineNuxtConfig({
  components: {
    dirs: [
      {
        path: "~/components/global",
        prefix: "",
        global: true,
      },
      "~/components",
    ],
  },
  modules: ["@sse-ui/nu-meta"],
});
