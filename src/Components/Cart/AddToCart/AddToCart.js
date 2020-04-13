import React from "react";
// import axios from 'axios';
import { Button } from "@material-ui/core";


export const debugUrl = 'https://private-anon-25c3e5997f-securecheckout.apiary-proxy.com/v1/cart/items'

export const prodUrl = "https://api.securecheckout.com/v1/cart/items";

const APIKey = process.env.REACT_APP_API_KEY;

// let config = {
//     headers: {
//         "Content-Type" : "application/json",
//         "X-Auth-Token" : APIKey,
//         "X-Sesion-Id" : "234523452345"
//     }
// };


const ApiAddToCart = async () =>{
    console.log("hello")
        // console.log(this.props.currentState);
    //   const result = await axios.post(debugUrl, config).then(( data ) => data);
}




function AddToCart() {
  return (
    <>
      <Button onClick={ApiAddToCart} size="small" color="secondary">
        Add to Cart
      </Button>
    </>
  );
}

export default AddToCart;
