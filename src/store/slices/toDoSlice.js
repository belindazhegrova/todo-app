import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, status: "New", backgroundColor: "#EE8A35", items: [] },
  { id: 2, status: "in Progress", backgroundColor: "#F6CB52", items: [] },
  { id: 3, status: "on Hold", backgroundColor: "#E9C466", items: [] },
  { id: 4, status: "Canceled", backgroundColor: "#E75651", items: [] },
  { id: 5, status: "Completed", backgroundColor: "#7AC14D", items: [] },
];

const toDoSlice = createSlice({
  name: "todoTask",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { status, task } = action.payload;
      const category = state.find((cat) => cat.status === status);
      if (category) category.items.push({ id: Date.now(), ...task });
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      let movedTask = null;

      state.forEach((category) => {
        const taskIndex = category.items.findIndex((item) => item.id === id);
        if (taskIndex > -1) {
          const existingTask = category.items[taskIndex];

          if (existingTask.status !== updatedTask.status) {
            movedTask = {
              ...existingTask,
              ...updatedTask,
            };
            category.items.splice(taskIndex, 1);
          } else {
            category.items[taskIndex] = {
              ...existingTask,
              ...updatedTask,
            };
          }
        }
      });

      if (movedTask) {
        const targetCategory = state.find(
          (category) => category.status === movedTask.status
        );
        if (targetCategory) {
          targetCategory.items.push(movedTask);
        }
      }
    },

    deleteTask: (state, action) => {
      const { id } = action.payload;
      state.forEach((category) => {
        category.items = category.items.filter((item) => item.id !== id);
      });
    },
  },
});

export const { addTask, editTask, deleteTask } = toDoSlice.actions;
export default toDoSlice.reducer;
