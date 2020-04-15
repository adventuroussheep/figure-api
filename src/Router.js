import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Components/HomePage/HomePage";
import Wines from "./Components/Wines/WineComponent";
import PageNotFound from "./Components/404/404";
import MyProvider from "./Components/Context/Provider";


class Router extends Component {
  render() {
    return (
      <MyProvider>
        <HashRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/wines" component={Wines} />
            <Route exact path="" component={PageNotFound} />
          </Switch>
        </HashRouter>
      </MyProvider>
    );
  }
}

export default Router;
