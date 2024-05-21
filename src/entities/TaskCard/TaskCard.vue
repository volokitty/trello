<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { Props } from "./model";
import { MessageSquareMore, Heart, Paperclip, Trash2 } from "lucide-vue-next";
import { useBoardsStore } from "@/shared/stores/boards";

const props = defineProps<Props>();
const boardsStore = useBoardsStore();

function remove() {
  boardsStore.removeTask(props.boardId, props.task.id);
}

function openRemoveConfirm() {
  ElMessageBox.confirm("You sure you want to delete?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      remove();
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
}

function onDragStart() {
  boardsStore.onDragStart(props.boardId, props.task.id);
}
</script>

<template>
  <ElCard
    shadow="hover"
    body-class="pa-0"
    class="task"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="boardsStore.resetDrag"
  >
    <span>
      {{ props.task.name }}
    </span>
    <p class="description">{{ props.task.description }}</p>
    <div class="footer v-flex justify-between mt-6">
      <ElButton link type="danger" :icon="Trash2" @click="openRemoveConfirm">
        Delete
      </ElButton>
      <div class="info v-flex gap-3">
        <span>
          {{ props.task.comments }}
          <MessageSquareMore :size="16" />
        </span>
        <span>
          {{ props.task.likes }}
          <Heart :size="16" />
        </span>
        <span>
          {{ props.task.attachments }}
          <Paperclip :size="16" />
        </span>
      </div>
    </div>
  </ElCard>
</template>

<style scoped lang="scss">
.task {
  cursor: grab;

  .description {
    margin: 8px 0;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }

  .footer {
    .info {
      span {
        display: flex;
        align-items: center;
        gap: 4px;
        font-weight: 300;
      }
    }
  }
}
</style>
