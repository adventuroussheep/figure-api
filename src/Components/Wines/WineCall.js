import axios from 'axios';

export const url = 'https://hacker-news.firebaseio.com/v0/newstories.json';

export const newurl = 'https://private-anon-d2fe717142-securecheckout.apiary-mock.com/v1/cart/products/featured'

export const prodUrl = "https://cors-anywhere.herokuapp.com/https://api.securecheckout.com/v1/cart/products/featured";

const APIKey = process.env.REACT_APP_API_KEY;

let config = {
    headers: {
        "Content-Type" : "application/json",
        "X-Auth-Token" : APIKey,
        "X-Sesion-Id" : "234523452345"
    }
};


export const ApiCall = async () =>{
    const result = await axios.get(newurl, config).then(( data ) => data);
    return result;
}


export default ApiCall;