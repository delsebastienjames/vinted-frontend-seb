import React from "react";
import "./App.css";
import "./index.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // BrowserRouter as Router permet de renommer BrowserRouter en (Route)

import Home from "./containers/Home"; // Composant Home
import Offer from "./containers/Offer"; // Composant Offer
import Header from "./components/Header"; // Composant Header commun à toutes les pages
import Footer from "./components/Footer"; // Composant Footer commun à toutes les pages

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
