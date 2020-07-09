import React, { Component } from "react";
import { connect } from "react-redux";

export const Detail = ({ todo, ...props }) => {
  console.log(todo);
  console.log(props);
  return (
    <div>
      <h1>Detail</h1>
      <div>{JSON.stringify(todo)}</div>
    </div>
  );
};

const mapStateToProps = (state = [], ownProps) => ({
  todo: state.filter((e) => e.date === parseInt(ownProps?.match?.params?.id)),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
