# Pure Redux

## 1. basic setting

- objective : +,- counter with redux

```js
const plusbtn = document.querySelector("#add");
const minusbtn = document.querySelector("#minus");
const countSpan = document.querySelector("#countNumber");

let count = 0;

countSpan.innerHTML = count;

const updateText = () => {
  countSpan.innerHTML = count;
};
const handlePlus = () => {
  count += 1;
  updateText();
};
const handleMinus = () => {
  count -= 1;
  updateText();
};
plusbtn.addEventListener("click", handlePlus);
minusbtn.addEventListener("click", handleMinus);
```

- dispath
- subscribe
- getState
- replaceReducer

## 2. Redux Counter

- action : 변수룰 수정하는 행위, action.type별로 다르게 수정가능
- dispath: 정의한 action을 execaution
- subscribe : 변수가 바뀌면 작동하는 side effect

- algorithm
- type: plus,minus
- dispath : two types
- subscribe : change HTML innerText

```js
import { createStore } from "redux";

const plusbtn = document.querySelector("#add");
const minusbtn = document.querySelector("#minus");
const countSpan = document.querySelector("#countNumber");

countSpan.innerHTML = 0;

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  // console.log(action);
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  // console.log(e);
  // console.log("state is changed");
  countSpan.innerHTML = countStore.getState();
};
countStore.subscribe(onChange);

plusbtn.addEventListener("click", () => {
  countStore.dispatch({ type: ADD });
});
minusbtn.addEventListener("click", () => {
  countStore.dispatch({ type: MINUS });
});
```

# 3. redux three principles

- Single source of truth : not multiple store. only one data , it can be serialized easily
- State is read-only : if you wanna change , use dispath
- Changes are made with pure functions : ❌ NEVER mutating the previoud state.

# 4. redux - vanila js Todo

```html
<h1>TODO LIST</h1>

<form id="js_todoform">
  <input type="text" name="todo" id="js_todoinput" />
</form>
<ul id="js_todolist"></ul>
```

```js
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
```

# 5. react-redux

- 1. provider : entry App have to be enclosed with <Provider/>
- 2. use redux store : connect => 1. getState() | 2. dispath()
- 3. middle func && layer : actionCreators : return {type:..., args...}
- 4. middle func && layer : mapStateToProps : give addtional key
- 5. middle func && layer : mapDispatchToProps : make functions dispatch with actions creators

* Tips

```
React가 화면을 업데이트 하는 과정
1. setState를 호출
2. shouldComponentUpdate 를 실행후, true라면 업데이트 준비
3. 가상 DOM과 실제 DOM을 비교해서 변경사항이 있으면 화면을 다시 랜더링

사실상 Obj의 모든 depth를 돌면서 바뀐 부분을 찾는것은 많은 시간이 걸리기 때문에
수정 불가능한 변수를 사용하여 래퍼런스만 비교를 하는것이다.
React에서는 immutable한 원칙이 중요하다.

- facebook이 만든 immutable-js를 많이 사용.
```
