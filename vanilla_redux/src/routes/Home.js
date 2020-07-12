import React, { useState } from "react";

import { actionCreator } from "../store";

import { connect } from "react-redux";

export const Home = ({ counter, countUp, countDown }) => {
  return (
    <div>
      <h1>counter</h1>
      <span>{counter}</span>
      <button onClick={countUp}>UP</button>
      <button onClick={countDown}>DOWN</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { counter: state.counter };
};

const mapDispatchToProps = (dispath) => {
  return {
    countUp: () => dispath(actionCreator.addCount()),
    countDown: () => dispath(actionCreator.subCount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
