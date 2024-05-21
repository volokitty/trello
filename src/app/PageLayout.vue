<script setup lang="ts">
import Header from "@/widgets/Header";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { usePageStore } from "@/shared/stores/page";

const router = useRouter();
const { page } = storeToRefs(usePageStore());

// mock data
const avatars = ["me", "1", "2", "3", "4"];
</script>

<template>
  <Header />
  <main>
    <ElPageHeader class="mt-4 mb-4" @back="router.back()">
      <template #content>
        <span class="text-large font-600 mr-3">{{ page.name }}</span>
      </template>
      <template #extra>
        <div class="employees v-flex align-center gap-6">
          <div class="avatars v-flex">
            <ElAvatar
              v-for="avatar in avatars"
              :key="avatar"
              :src="`/avatars/${avatar}.png`"
            />
          </div>
          Team
        </div>
      </template>
    </ElPageHeader>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.avatars {
  .el-avatar {
    border: 2px solid white;
    &:not(:first-child) {
      margin-left: -20px;
    }
  }
}

@media (max-width: 540px) {
  .avatars {
    display: none;
  }
}
</style>
