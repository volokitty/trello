<script setup lang="ts">
import { Trello, Search } from "lucide-vue-next";
</script>

<template>
  <header class="v-flex justify-between">
    <div>
      <RouterLink :to="{ name: 'Home' }" class="v-flex">
        <img class="logo" src="/trello_logo.svg" alt="App logo" />
      </RouterLink>
      <ElDivider direction="vertical" />
      <ElLink :icon="Trello" class="v-flex gap-1" href="/boards">
        Boards
      </ElLink>
      <ElDivider direction="vertical" />
      <ElInput placeholder="Search" class="search">
        <template #append>
          <ElButton :icon="Search" />
        </template>
      </ElInput>
    </div>
    <div class="me">
      <div class="v-flex gap-4 mr-4">Ekaterina Filatova</div>
      <ElAvatar src="/avatars/me.png" />
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  padding: 12px 0;
  border-bottom: 1px solid var(--el-border-color);

  div {
    display: flex;
    align-items: center;

    .controls {
      color: var(--el-text-color-regular);
    }
  }
}

@media (max-width: 692px) {
  .search {
    display: none;
  }
}

@media (max-width: 540px) {
  .logo {
    width: 70%;
  }
}

@media (max-width: 448px) {
  .me {
    font-size: 0.8em;
    :global(.el-avatar.el-avatar--circle) {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
