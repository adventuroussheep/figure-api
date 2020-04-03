import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import Navbar from './Components/Navbar/Navbar';

class Router extends Component {
  render() {
    return (
      <>
      <Navbar/>
        <BrowserRouter>
          <Switch>
              {/* Route for homepage in Components */}
            <Route path="/" component={HomePage} />
              {/* Route for 404 page in Components */}
            {/* <Route component={Page404} /> */}
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default Router;
