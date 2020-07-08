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
  return { addTodo: (text) => dispatch(actionCreators.addToDo({ text })) };
};
export default connect(mapStateToProps, mapActionToProps)(Home);
