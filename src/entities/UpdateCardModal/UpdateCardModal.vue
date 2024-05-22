<script setup lang="ts">
import { computed, reactive } from "vue";
import { Task } from "@/shared/stores/boards";
import { storeToRefs } from "pinia";
import { useBoardsStore } from "@/shared/stores/boards";
import { Props } from "./model";

const props = defineProps<Props>();

const boardsStore = useBoardsStore();
const {
  isUpdateCardModalVisible,
  updateCardModalColumnId,
  updateCardModalTask,
} = storeToRefs(boardsStore);

const form = reactive<Task>({ ...(updateCardModalTask.value as Task) });

const canSave = computed(() => form.name);

function onClose() {
  isUpdateCardModalVisible.value = false;
  updateCardModalColumnId.value = null;
  updateCardModalTask.value = null;

  resetForm();
}

function resetForm() {
  Object.assign(form, updateCardModalTask.value);
}

function onSave() {
  updateCardModalTask.value = form;
  boardsStore.updateTask(props.boardId, form);
  onClose();
}

function onOpen() {
  resetForm();
}
</script>

<template>
  <ElDialog
    v-model="isUpdateCardModalVisible"
    @close="onClose"
    @open="onOpen"
    :title="`Update task id: ${form.id}`"
    class="form"
  >
    <ElForm :model="form">
      <ElFormItem label="Title">
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="Description">
        <ElInput v-model="form.description" />
      </ElFormItem>
      <ElFormItem label="Comments">
        <ElInputNumber v-model="form.comments" />
      </ElFormItem>
      <ElFormItem label="Likes">
        <ElInputNumber v-model="form.likes" />
      </ElFormItem>
      <ElFormItem label="Attachments">
        <ElInputNumber v-model="form.attachments" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="onClose">Cancel</ElButton>
        <ElButton @click="onSave" type="primary" :disabled="!canSave">
          Save
        </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">
.form {
  :global(.el-form-item) {
    display: grid !important;
    grid-template-columns: 1fr 3fr;
  }

  :global(.el-form-item__label) {
    justify-content: flex-start !important;
  }
}

:global(.el-dialog.form) {
  max-width: 500px;
}
</style>
