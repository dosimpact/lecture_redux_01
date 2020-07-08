/**
 * Practice - pure redux Todo
 */

import { createStore } from "redux";

const todoForm = document.querySelector("#js_todoform");
const todoInput = document.querySelector("#js_todoinput");
const todoList = document.querySelector("#js_todolist");

/**
 * action type
 * ADD_TODO
 * DEL_TODO
 */
const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, date: Date.now() }, ...state];
    case DEL_TODO:
      console.log(DEL_TODO);
      return state.filter((e) => e.date !== action.id);
    default:
      return [];
  }
};

const store = createStore(reducer);

const dispath_ADD_TODO = (text) => {
  return store.dispatch({ type: ADD_TODO, text });
};
const dispath_DEL_TODO = (id) => {
  return store.dispatch({ type: DEL_TODO, id });
};

const updateTodo = () => {
  console.log(store.getState());
  const todos = store.getState();
  todoList.innerHTML = "";
  todos.forEach((e) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    li.id = e.date;
    span.innerText = e.text;
    button.textContent = "DEL";
    button.addEventListener("click", handleDeleteBtn);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
  });
};
store.subscribe(updateTodo);

const handleDeleteBtn = (e) => {
  dispath_DEL_TODO(parseInt(e.target.parentNode.id));
};

const handleSubmit = (e) => {
  e.preventDefault();
  dispath_ADD_TODO(todoInput.value);
  todoInput.value = "";
};

todoForm.addEventListener("submit", handleSubmit);
