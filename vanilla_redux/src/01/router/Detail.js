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
