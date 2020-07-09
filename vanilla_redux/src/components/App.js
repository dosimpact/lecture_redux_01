import React from "react";

import store from "../store";
import { Provider } from "react-redux";
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:id" component={Detail} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
