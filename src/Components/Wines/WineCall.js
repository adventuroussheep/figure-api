import axios from 'axios';

export const freaturedProdMock = 'https://private-anon-d2fe717142-securecheckout.apiary-mock.com/v1/cart/products/featured'

// export const freaturedProdUrl = "https://cors-anywhere.herokuapp.com/https://api.securecheckout.com/v1/cart/products/featured";

const currentProdUrl = 'https://cors-anywhere.herokuapp.com/https://api.securecheckout.com/v1/cart/products/'

const APIKey = process.env.REACT_APP_API_KEY;
const xAuthToken = sessionStorage.getItem("sessionToken");

let config = {
    headers: {
        "Content-Type" : "application/json",
        "X-Auth-Token" : APIKey,
        "X-Sesion-Id" : xAuthToken
    }
};


export const ApiCall = async () =>{
    const result = await axios.get(currentProdUrl, config).then(( data ) => data);
    return result;
}


export default ApiCall;