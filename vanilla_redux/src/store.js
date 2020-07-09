import { configureStore, createSlice } from "@reduxjs/toolkit";

const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    addToDo: (state, action) => {
      state.push({ text: action.payload, date: Date.now() });
    },
    delToDo: (state, action) =>
      state.filter((e) => e.date !== parseInt(action.payload)),
  },
});

export const actionCreators = {
  ...toDos.actions,
};

const store = configureStore({ reducer: toDos.reducer });

export default store;
