import { useState } from "react";
import "./App.css";
import "./index.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // BrowserRouter as Router permet de renommer BrowserRouter en (Route) // package npm

import Cookies from "js-cookie"; // package npm
import Home from "./container/Home"; // Composant Home
import Offer from "./container/Offer"; // Composant Offer
import Header from "./components/Header"; // Composant Header commun à toutes les pages
import Footer from "./components/Footer"; // Composant Footer commun à toutes les pages

import Signup from "./container/Signup"; // Composant Signup
import Login from "./container/Login"; // Composant Login
import Publish from "./container/Publish"; // Composant Publish
import Payment from "./container/Payment"; // Composant Payment

const App = () => {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  // Fonction qui va permettre :
  // 1 - Créer ou supprimer le Cookie contenant le token
  // 2 - Modifier l'état userToken dans le but de rafraîchir Header

  const setUser = (token, id) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
      Cookies.set("userId", id);
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      Cookies.remove("userId");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header userToken={userToken} setUser={setUser} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/publish">
          <Publish userToken={userToken} />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
