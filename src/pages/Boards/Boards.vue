<script setup lang="ts">
import { useBoardsStore, Board } from "@/shared/stores/boards";
import { usePageStore } from "@/shared/stores/page";
import { storeToRefs } from "pinia";

const { boards } = storeToRefs(useBoardsStore());
const { page } = storeToRefs(usePageStore());

page.value.name = "Boards";

function countTasks(board: Board) {
  return board.columns.reduce((prev, curr) => prev + curr.tasks.length, 0);
}
</script>

<template>
  <div class="page">
    <RouterLink
      v-for="board in boards"
      :key="board.id"
      :to="{ name: 'Board', params: { id: board.id } }"
      class="board-card"
    >
      <ElCard shadow="hover" body-class="v-flex justify-between align-center">
        {{ board.name }}
        <span>
          Tasks:
          {{ countTasks(board) }}
        </span>
      </ElCard>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.board-card {
  display: block;
  text-decoration: none;
  max-width: 200px;
  span {
    text-decoration: none;
    font-size: 0.8em;
    color: var(--el-text-color-secondary);
  }
  cursor: pointer;
}
</style>
