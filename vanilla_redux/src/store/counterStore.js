import { createSlice } from "@reduxjs/toolkit";

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

export default counter;
