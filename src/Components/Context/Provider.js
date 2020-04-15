import React, { Component } from "react";
import MyContext from './Context';

class MyProvider extends Component {
    state = {
        isLoggedIn: false,
        providerStateText: "Provider text"
    }

    render(){
        return(
            <MyContext.Provider
                value={{
                    ...this.state,
                    checkIfLoggedIn: () => {
                        if(sessionStorage.getItem("sessionToken")){
                            this.setState({isLoggedIn: true})
                        }
                    },

                    providerFunction: () => {
                        alert("Provider Function Triggered")
                    },

                }}
            >
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

export default MyProvider;