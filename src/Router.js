import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import Wines from './Components/Wines/WineComponent';
// import Random from './Components/RandomComp/random';

class Router extends Component {
  render() {
    return (
      <>
        <HashRouter>
      <Navbar/>
          <Switch>
              {/* Route for homepage in Components */}
            <Route exact path="/" component={HomePage} />
              {/* Route for 404 page in Components */}
            {/* <Route component={Page404} /> */}

            <Route exact path="/wines" component={Wines}/>
            {/* <Route path="/wines" component={Random}/> */}
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default Router;