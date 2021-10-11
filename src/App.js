import React from "react";
import HomePage from "./pages/HomePage";
import SimgleImage from "./pages/SingleImage";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <main className="app">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/single-image/:id" exact>
            <SimgleImage />
          </Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
