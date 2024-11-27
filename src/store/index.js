import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/toDoSlice";

const store = configureStore({
  reducer: {
    todoTask: todoReducer,
  },
});

export default store;
