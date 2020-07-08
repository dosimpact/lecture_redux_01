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
