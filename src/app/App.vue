<script setup lang="ts">
import { onBeforeMount } from "vue";
import { initStores } from "./initStores";
import { usePageStore } from "@/shared/stores/page";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

onBeforeMount(initStores);

const { page } = storeToRefs(usePageStore());
const router = useRouter();

router.beforeEach((to) => {
  if (to.name) {
    page.value.name = to.name.toString();
  }
});
</script>

<template>
  <RouterView />
</template>
