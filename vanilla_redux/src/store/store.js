import { createStore, combineReducers } from "redux";

import counterStore from "./counterStore";
import todoStore from "./todoStore";

const reducer = combineReducers({
  counter: counterStore.reducer,
  todo: todoStore.reducer,
});

export const actionCreator = {
  ...counterStore.actions,
  ...todoStore.actions,
};
const store = createStore(reducer);

export default store;
