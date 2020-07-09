import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";

// const ADD_TODO = "ADD_TODO";
// const DEL_TODO = "DEL_TODO";

// const action_addTodo = (text) => {
//     return {
//       type: ADD_TODO,
//       text,
//     };
//   };
//   const action_delTodo = (id) => {
//     return {
//       type: DEL_TODO,
//       id,
//     };
//   };
/**
 * return dispatch function + action type
 */
const ADD_TODO = createAction("ADD_TODO");
const DEL_TODO = createAction("DEL_TODO");

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO.type:
      return [{ text: action.payload, date: Date.now() }, ...state];
    case DEL_TODO.type:
      return state.filter((e) => e.date !== action.payload);
    default:
      break;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  action_addTodo: ADD_TODO,
  action_delTodo: DEL_TODO,
};

export default store;
