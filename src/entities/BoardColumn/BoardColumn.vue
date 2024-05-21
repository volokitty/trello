<script setup lang="ts">
import { ref } from "vue";
import { Props } from "./model";
import { Ellipsis, Plus } from "lucide-vue-next";
import { useBoardsStore } from "@/shared/stores/boards";
import TaskCard from "@/entities/TaskCard";

const props = defineProps<Props>();
const emit = defineEmits(["updateColumnName", "openAddTaskModel"]);

const boardsStore = useBoardsStore();

const columnName = ref<string>(props.column.name);
const dragOverHeader = ref<boolean>(false);
const dragOverAddCard = ref<boolean>(false);
const dragOverTask = ref<number | null>(null);

function updateColumnName(value: string) {
  emit("updateColumnName", value);
}

function onDrop(index: number) {
  boardsStore.onDragStop(props.column.id, index);
  dragOverHeader.value = false;
  dragOverAddCard.value = false;
  dragOverTask.value = null;
}

function handleDrag(
  type: "header" | "addCard" | "task",
  value: boolean,
  id?: number
) {
  if (type === "header") {
    dragOverHeader.value = value;
  } else if (type === "addCard") {
    dragOverAddCard.value = value;
  } else if (type === "task") {
    if (id) {
      dragOverTask.value = value ? id : null;
    } else {
      dragOverTask.value = null;
    }
  }
}
</script>

<template>
  <div v-if="column" class="column v-flex direction-column gap-3">
    <div
      class="header v-flex justify-between align-center"
      :class="{ 'drag-over': dragOverHeader }"
      @dragover.prevent="handleDrag('header', true)"
      @dragleave.prevent="handleDrag('header', false)"
      @drop="onDrop(-1)"
    >
      <ElInput
        v-model="columnName"
        @update:model-value="updateColumnName"
        class="name"
      />
      <Ellipsis />
    </div>
    <TaskCard
      v-for="(task, index) in column.tasks"
      :key="task.id"
      class="task"
      :class="{ 'drag-over-task': dragOverTask === task.id }"
      @dragover.prevent="handleDrag('task', true, task.id)"
      @dragleave.prevent="handleDrag('task', false)"
      @drop="onDrop(index)"
      :task="task"
      :board-id="boardId"
    />
    <div
      class="add-card v-flex justify-center align-center gap-2"
      :class="{ 'drag-over-add-card': dragOverAddCard }"
      @dragover.prevent="handleDrag('addCard', true)"
      @dragleave.prevent="handleDrag('addCard', false)"
      @drop="onDrop(-1)"
      @click="boardsStore.openAddTaskModal(column.id)"
    >
      <Plus :size="16" /> Add new card
    </div>
  </div>
</template>

<style scoped lang="scss">
.column {
  max-width: 360px;
  width: 100%;

  & > div {
    padding: 16px 20px;
    background-color: var(--el-color-info-light-8);
    border-radius: 12px;
  }

  .header {
    &.drag-over {
      background-color: var(--el-color-primary-light-5);
      border: 2px dashed var(--el-color-primary);
    }

    .name {
      max-width: 80%;
      :global(.name .el-input__wrapper) {
        &:not(.is-focus) {
          box-shadow: none;
        }

        background: none;
        transition: 0.2s;
      }
    }
  }

  .task {
    position: relative;
    transition: 0.5s ease-in-out;
    overflow: visible;

    &.drag-over-task::before {
      position: absolute;
      display: block;
      content: "";
      height: 1px;
      width: 100%;
      background-color: var(--el-color-primary);
      top: -8px;
      left: 0;
    }
  }

  .add-card {
    position: relative;
    background: transparent;
    border: 2px dashed var(--el-color-info-light-8);
    cursor: pointer;
    transition: 0.5s ease-in-out;

    &.drag-over-add-card::before {
      position: absolute;
      content: "";
      height: 1px;
      width: 100%;
      background-color: var(--el-color-primary);
      top: -8px;
    }
  }
}
</style>
