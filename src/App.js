import React from "react";
import "./App.css";
import "./index.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // BrowserRouter as Router permet de renommer BrowserRouter en (Route)

import Home from "./containers/Home"; // Composant Home
import Offer from "./containers/Offer"; // Composant Offer

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
