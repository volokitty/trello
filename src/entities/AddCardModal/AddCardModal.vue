<script setup lang="ts">
import { computed, reactive } from "vue";
import { Task } from "@/shared/stores/boards";
import { storeToRefs } from "pinia";
import { useBoardsStore } from "@/shared/stores/boards";
import { Props } from "./model";

const props = defineProps<Props>();

const boardsStore = useBoardsStore();
const { isAddCardModalVisible, addCardModalColumnId } =
  storeToRefs(boardsStore);

const initialFormState = {
  name: "",
  description: "",
  comments: 0,
  likes: 0,
  attachments: 0,
};

const form = reactive<Omit<Task, "id">>({ ...initialFormState });

const canSave = computed(() => form.name);

function onClose() {
  isAddCardModalVisible.value = false;
  addCardModalColumnId.value = null;

  resetForm();
}

function resetForm() {
  Object.assign(form, initialFormState);
}

function onSave() {
  boardsStore.addTask(props.boardId, form);
  onClose();
}
</script>

<template>
  <ElDialog
    v-model="isAddCardModalVisible"
    @close="onClose"
    title="Add a new task"
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
