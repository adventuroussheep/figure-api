import axios from 'axios';

export const removeItemMock = 'https://private-anon-1283649964-securecheckout.apiary-mock.com/v1/cart/items/'

export const removeItemUrl = "https://cors-anywhere.herokuapp.com/https://api.securecheckout.com/v1/cart/items/";



const APIKey = process.env.REACT_APP_API_KEY;
const xAuthToken = sessionStorage.getItem("sessionToken");


let config = {
    headers: {
        "Content-Type" : "application/json",
        "X-Auth-Token" : APIKey,
        "X-Sesion-Id" : xAuthToken,
    }
};


export const RemoveItemCall = async () =>{
    const result = await axios.delete(`${removeItemMock} ${sku} `, config).then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
}


export default RemoveItemCall;