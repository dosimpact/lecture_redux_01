import { createSlice, createAction } from "@reduxjs/toolkit";
import { createStore, combineReducers } from "redux";

const saveCounter = (count) => {
  localStorage.setItem("counter", String(count));
};

const counter = createSlice({
  name: "counter",
  initialState: Number(localStorage.getItem("counter") || 0),
  reducers: {
    addCount: (state, action) => {
      saveCounter(state + 1);
      return state + 1;
    },
    subCount: (state, action) => {
      saveCounter(state - 1);
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
