import { createSlice } from "@reduxjs/toolkit";

const todo = createSlice({
  name: "todoList",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      console.log(action);
      //   saveCounter(state + 1);
      return [action.payload, ...state];
    },
    delTodo: (state, action) => {
      //   saveCounter(state - 1);
      return state;
    },
  },
});

export default todo;
