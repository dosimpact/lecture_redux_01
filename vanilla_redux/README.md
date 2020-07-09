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

- yarn add

```
yarn add redux react-redux
```

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

- Tips

```
useReducer = redux + react-redux
```

- 1. def store ( same as vanlia JS)

```js
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
```

- 2. provider : entry App have to be enclosed with <Provider/>

```js
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

- 3. CASE1 : use redux store : connect => 1. getState() | 2. dispath()
- Todo Home

```js
import React, { useState } from "react";
import { actionCreators } from "../store";
import { connect } from "react-redux";

import Todo from "../components/Todo";

function Home({ toDos, addTodo, ...props }) {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };
  return (
    <div>
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </form>
      <ul>
        {toDos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state = [], ownProps) => {
  //   console.log("mapStateToProps", state);
  //   console.log("mapStateToProps", ownProps);
  return { toDos: state };
};
const mapActionToProps = (dispatch) => {
  return { addTodo: (text) => dispatch(actionCreators.addToDo(text)) };
};
export default connect(mapStateToProps, mapActionToProps)(Home);
```

- 4. CASE2 : use redux store : connect => 1. getState() | 2. dispath()
- Todo Element

```js
import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function Todo({ text, id, delToDo }) {
  return (
    <li>
      <Link to={`/${id}`}>
        <span id={id}>{text}</span>
      </Link>
      <button
        onClick={() => {
          delToDo(id);
        }}
      >
        Del
      </button>
    </li>
  );
}
const mapActionToProps = (dispatch) => {
  return {
    delToDo: (id) => {
      dispatch(actionCreators.delToDo(id));
    },
  };
};
export default connect(null, mapActionToProps)(Todo);
```

- 5. CASE3 : use redux store : connect => 1. getState() | 2. dispath()
- Todo Detail

```js
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function Detail({ todo }) {
  const { id } = useParams();
  return (
    <div>
      <h1>Detail</h1>
      <span>{id}</span>
      <span>{JSON.stringify(todo)}</span>
    </div>
  );
}
const mapStateToProps = (state = [], ownProps) => {
  return {
    todo: state.filter(
      (todo) => todo.id === parseInt(ownProps?.match?.params?.id)
    ),
  };
};

export default connect(mapStateToProps)(Detail);
```

# 6.redux toolkit

- yarn add

```
yarn add @reduxjs/toolkit
```

### algorihtm

1. createAction <= def type(enum) + def action creator
2. createReducer <= inital state + def action type resolver (with options immer.js)
3. createSlice <= def type(enum) + def action creator + reducer

```js
import { createStore } from "redux";
import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";

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
 * createAction <= def type(enum) + def action creator
 */
const addToDo = createAction("ADD_TODO");
const delToDo = createAction("DEL_TODO");

// const reducer = (state = [], action) => {
//   console.log(action);
//   switch (action.type) {
//     case ADD_TODO.type:
//       return [{ text: action.payload, date: Date.now() }, ...state];
//     case DEL_TODO.type:
//       return state.filter((e) => e.date !== action.payload);
//     default:
//       break;
//   }
// };
/**
 * it is okay to mutate when use redux toolkit
 * two options
 * 1. state mutate (redux toolkit work in immer)
 * 2. return now state
 */
const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, date: Date.now() });
  },
  [delToDo]: (state, action) => {
    return state.filter((e) => e.date !== parseInt(action.payload));
  },
});

const store = configureStore({ reducer });

export const actionCreators = {
  addToDo,
  delToDo,
};

export default store;
```

```js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    addToDo: (state, action) => {
      state.push({ text: action.payload, date: Date.now() });
    },
    delToDo: (state, action) =>
      state.filter((e) => e.date !== parseInt(action.payload)),
  },
});

export const actionCreators = {
  ...toDos.actions,
};

export default configureStore({ reducer: toDos.reducer });
```

# More. Study - slice status

[https://redux-toolkit.js.org/api/createSlice](https://redux-toolkit.js.org/api/createSlice)

```js
import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { createStore, combineReducers } from 'redux'

const incrementBy = createAction<number>('incrementBy')
const decrementBy = createAction<number>('decrementBy')

const counter = createSlice({
  name: 'counter',
  initialState: 0 as number,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    multiply: {
      reducer: (state, action: PayloadAction<number>) => state * action.payload,
      prepare: (value: number) => ({ payload: value || 2 }) // fallback if the payload is a falsy value
    }
  },
  // "builder callback API", recommended for TypeScript users
  extraReducers: builder => {
    builder.addCase(incrementBy, (state, action) => {
      return state + action.payload
    })
    builder.addCase(decrementBy, (state, action) => {
      return state - action.payload
    })
  }
})

const user = createSlice({
  name: 'user',
  initialState: { name: '', age: 20 },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    }
  },
  // "map object API"
  extraReducers: {
    [counter.actions.increment]: (state, action) => {
      state.age += 1
    }
  }
})

const reducer = combineReducers({
  counter: counter.reducer,
  user: user.reducer
})

const store = createStore(reducer)

store.dispatch(counter.actions.increment())
// -> { counter: 1, user: {name : '', age: 21} }
store.dispatch(counter.actions.increment())
// -> { counter: 2, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply(3))
// -> { counter: 6, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply())
// -> { counter: 12, user: {name: '', age: 22} }
console.log(`${counter.actions.decrement}`)
// -> "counter/decrement"
store.dispatch(user.actions.setUserName('eric'))
// -> { counter: 6, user: { name: 'eric', age: 22} }
```
