import { createSlice, createAction } from "@reduxjs/toolkit";
import { createStore, combineReducers } from "redux";

const counter = createSlice({
  name: "counter",
  initialState: localStorage.getItem("counter") || 0,
  reducers: {
    addCount: (state, action) => {
      return state + 1;
    },
    subCount: (state, action) => {
      return state - 1;
    },
  },
});
const reducer = combineReducers({
  counter: counter.reducer,
});

export const actionCreator = {
  ...counter.actions,
};
const store = createStore(reducer);

export default store;
