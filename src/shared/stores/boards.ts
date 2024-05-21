import { ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

// comments, attachments and likes are for illustratve purposes
export interface Task {
  name: string;
  description?: string;
  comments: number;
  likes: number;
  attachments: number;
  id: number;
}

export interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  columns: Column[];
  id: number;
}

export const useBoardsStore = defineStore("boards", () => {
  const boards = useStorage<Board[]>("boards", initialBoards);
  const draggedTaskId = ref<number | null>(null);
  const dropBoardId = ref<number | null>(null);
  const draggedTask = ref<Task | null>(null);

  const isAddCardModalVisible = ref<boolean>(false);
  const addCardModalColumnId = ref<number | null>(null);

  function onDragStart(boardId: number, taskId: number) {
    dropBoardId.value = boardId;
    draggedTaskId.value = taskId;
  }

  function onDragStop(columnId: number, index: number) {
    const board = boards.value.find(({ id }) => id === dropBoardId.value);
    if (!board) return;

    const column = board.columns.find(({ id }) => id === columnId);
    if (!column) return;

    board.columns.forEach((col) => {
      const taskIndex = col.tasks.findIndex(
        ({ id }) => id === draggedTaskId.value
      );
      if (taskIndex > -1) {
        [draggedTask.value] = col.tasks.splice(taskIndex, 1);
      }
    });

    if (draggedTask.value) {
      column.tasks.splice(index, 0, draggedTask.value);
    }
  }

  function resetDrag() {
    draggedTaskId.value = null;
    dropBoardId.value = null;
    draggedTask.value = null;
  }

  function removeTask(boardId: number, id: number) {
    const board = boards.value.find(({ id }) => id === boardId);

    if (!board) return;

    board.columns.forEach((column) => {
      column.tasks = column.tasks.filter((task) => task.id !== id);
    });
  }

  function updateColumnName(boardId: number, columnId: number, name: string) {
    const board = boards.value.find(({ id }) => id === boardId);
    const column = board?.columns.find(({ id }) => id === columnId);

    if (column) {
      column.name = name;
    }
  }

  // to make it simple, I use a generator
  function* generateTaskId(boardId: number) {
    const board = boards.value.find(({ id }) => id === boardId);
    const maxId = Math.max(
      ...(board?.columns
        .reduce((p, c) => [...p, ...c.tasks], [] as Task[])
        .map(({ id }) => id) as number[])
    );

    let id = maxId + 1;

    while (true) {
      yield id++;
    }
  }

  function addTask(boardId: number, task: Omit<Task, "id">) {
    const board = boards.value.find(({ id }) => id === boardId);
    const column = board?.columns.find(
      ({ id }) => id === addCardModalColumnId.value
    );
    const id = generateTaskId(boardId).next().value;

    if (column && id) {
      column.tasks.push({ ...task, id });
    }
  }

  function openAddTaskModal(columnId: number) {
    isAddCardModalVisible.value = true;
    addCardModalColumnId.value = columnId;
  }

  return {
    boards,
    updateColumnName,
    removeTask,
    draggedTask,
    draggedTaskId,
    onDragStart,
    onDragStop,
    resetDrag,
    isAddCardModalVisible,
    addCardModalColumnId,
    addTask,
    openAddTaskModal,
  };
});

const initialBoards = [
  {
    name: "Brackets",
    id: 1,
    columns: [
      {
        id: 1,
        name: "Design",
        tasks: [
          {
            id: 1,
            name: "Home business advertising ideas",
            likes: 10,
            attachments: 43,
            comments: 23,
            description:
              "Successful businesses know the importance of building and maintaining good working.",
          },
        ],
      },
      {
        id: 2,
        name: "Prototype",
        tasks: [],
      },
      {
        id: 3,
        name: "Final",
        tasks: [
          {
            id: 2,
            name: "Old fashioned recipe for preventing allergies and chemical sensitivities",
            likes: 34,
            attachments: 14,
            comments: 34,
          },
          {
            id: 3,
            name: "Types of paper in catalog printing",
            likes: 34,
            attachments: 23,
            comments: 98,
            description:
              "Branding is no longer simply about visual appeal (or the cherry in the apple pie example, as given in my earlier article).",
          },
        ],
      },
    ],
  },
];
