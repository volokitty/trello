<script setup lang="ts">
import { useBoardsStore } from "@/shared/stores/boards";
import { usePageStore } from "@/shared/stores/page";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import BoardColumn from "@/entities/BoardColumn";
import AddCardModal from "@/entities/AddCardModal/AddCardModal.vue";

const boardsStore = useBoardsStore();
const { page } = storeToRefs(usePageStore());
const { boards } = storeToRefs(boardsStore);

const route = useRoute();
const board = boards.value.find(({ id }) => id === Number(route.params.id));

if (board) {
  page.value.name = board.name;
}
</script>

<template>
  <div class="page">
    <div v-if="board" class="columns v-flex gap-8">
      <BoardColumn
        v-for="column in board.columns"
        :key="column.id"
        :column="column"
        :board-id="board.id"
        @update-column-name="(name: string) => board && boardsStore.updateColumnName(board.id, column.id, name)"
      />
    </div>
  </div>
  <AddCardModal v-if="board" :board-id="board.id" />
</template>

<style scoped lang="scss">
.columns {
  flex-wrap: wrap;
}

@media (max-width: 816px) {
  .columns {
    justify-content: center;
  }
}
</style>
