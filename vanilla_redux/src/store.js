import { createStore } from "redux";

const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";

/**
 * middle layer : type creator & validate variance
 */
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};
const delToDo = (id) => {
  return {
    type: DEL_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DEL_TODO:
      return state.filter((todo) => todo.id !== action.id);
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
