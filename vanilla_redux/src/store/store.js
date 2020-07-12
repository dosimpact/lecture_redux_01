import { createStore, combineReducers } from "redux";

import counterStore from "./counterStore";

const reducer = combineReducers({
  counter: counterStore.reducer,
});

export const actionCreator = {
  ...counterStore.actions,
};
const store = createStore(reducer);

export default store;
