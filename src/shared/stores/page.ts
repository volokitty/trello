import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const usePageStore = defineStore("page", () => {
  const page = useStorage("page", { name: "" });

  return { page };
});
