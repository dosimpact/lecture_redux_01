import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./router/Home";
import Detail from "./router/Detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
