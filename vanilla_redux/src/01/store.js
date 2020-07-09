import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";

// const ADD_TODO = "ADD_TODO";
// const DEL_TODO = "DEL_TODO";

/**
 * middle layer : type creator & validate variance
 */
// const addToDo = (text) => {
//   return {
//     type: ADD_TODO,
//     text,
//   };
// };
// const delToDo = (id) => {
//   return {
//     type: DEL_TODO,
//     id,
//   };
// };

const addToDo = createAction("ADD_TODO");
const delToDo = createAction("DEL_TODO");

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload.text, id: Date.now() }, ...state];
    case delToDo.type:
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      break;
  }
};
const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  delToDo,
};
export default store;
