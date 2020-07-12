import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreator } from "../store";

const TodoElement = ({ text }) => {
  return <li>{text}</li>;
};

export const Todo = ({ todos, addTodo, ...props }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };
  return (
    <div>
      <h1>TODO</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
      </form>
      <div>
        <ul>
          {todos.map((e) => (
            <TodoElement key={e} text={e} />
          ))}
        </ul>
      </div>
      {JSON.stringify(todos)}
    </div>
  );
};

const mapStateToProps = (state) => ({ todos: state.todo });

const mapDispatchToProps = (dispath) => ({
  addTodo: (text) => dispath(actionCreator.addTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
