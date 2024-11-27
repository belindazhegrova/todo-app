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
      state.forEach((category) => {
        const taskIndex = category.items.findIndex((item) => item.id === id);
        if (taskIndex > -1) {
          category.items[taskIndex] = {
            ...category.items[taskIndex],
            ...updatedTask,
          };
        }
      });
    },
  },
});

export const { addTask, editTask } = toDoSlice.actions;
export default toDoSlice.reducer;
