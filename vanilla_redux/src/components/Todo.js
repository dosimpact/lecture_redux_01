import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { Link } from "react-router-dom";

export const Todo = ({ date, text, delTodo }) => {
  return (
    <li>
      <Link to={`/${date}`}>
        <span>{text}</span>
      </Link>
      <button onClick={() => delTodo(date)}>DEL</button>
    </li>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispath) => ({
  delTodo: (id) => dispath(actionCreators.action_delTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
