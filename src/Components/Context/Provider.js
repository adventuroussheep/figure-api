import React, { Component, useEffect } from "react";
import MyContext from "./Context";

class MyProvider extends Component {
  state = {
    isLoggedIn: false,
    providerStateText: "Provider text",
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          ...this.state,
          checkIfLoggedIn: () => {
            if (sessionStorage.getItem("sessionToken")) {
              this.setState({ isLoggedIn: true });
            }
          },

          providerFunction: () => {
            if (sessionStorage.getItem("sessionToken")) {
              this.setState({ isLoggedIn: true });
              alert("provider session ran");
            } else {
              alert("no provider session");
            }
          },
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
