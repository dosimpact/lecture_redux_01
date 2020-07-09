import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Todo from "../components/Todo";

export const Home = ({ todos, addTodo, ...props }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };
  return (
    <>
      <h1>TODO LIST</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></input>
      </form>
      <ul>
        {todos.map((e) => (
          <Todo key={e.date} {...e} />
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state = []) => ({
  todos: state,
});

const mapDispatchToProps = (dispath) => ({
  addTodo: (text) => dispath(actionCreators.action_addTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
