// Needed:
// Get cart info

// Checkout API Checklist
// address

// address_2

// city

// company

// credit_id

// gift_message

// instructions

// order_type

// requested_ship_date

// shipping_address

// shipping_address_2

// shipping_city

// shipping_company

// shipping_first_name

// shipping_id

// shipping_last_name

// shipping_phone

// shipping_state

// shipping_zip

// state  X

// zip    X

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Divider, MenuItem, Button } from "@material-ui/core";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import axios from 'axios';

const styles = {
  checkoutWrapper: {
    backgroundColor: "#e3e0cc",
    minHeight: "calc(100vh + 150px)",
    // width: '100vw',
    marginTop: "0",
    marginBottom: "0",
  },
  billingForm: {
    textAlign: "center",
    marginTop: "120px",
    position: "absolute",
    marginLeft: "10vw",
    width: "50vw",
    maxWidth: "600px",
  },
  shippingForm: {
    textAlign: "center",
    marginTop: "580px",
    position: "absolute",
    marginLeft: "10vw",
    width: "50vw",
    maxWidth: "600px",
  },
  cardCart: {
    marginTop: "120px",
    position: "absolute",
    marginLeft: "65vw",
    width: "25vw",
  },
  stateClass: {
    marginLeft: '10px'
  },
  billingCheckbox: {
    // textAlign: 'center!important'
    marginLeft: "30%"
  }
};

const stateList = [
  { value: "AL", label: "AL" },
  { value: "AK", label: "AK" },
  { value: "AZ", label: "AZ" },
  { value: "AR", label: "AR" },
  { value: "CA", label: "CA" },
  { value: "CO", label: "CO" },
  { value: "CT", label: "CT" },
  { value: "DE", label: "DE" },
  { value: "FL", label: "FL" },
  { value: "GA", label: "GA" },
  { value: "HI", label: "HI" },
  { value: "ID", label: "ID" },
  { value: "IL", label: "IL" },
  { value: "IN", label: "IN" },
  { value: "IA", label: "IA" },
  { value: "KS", label: "KS" },
  { value: "KY", label: "KY" },
  { value: "LA", label: "LA" },
  { value: "ME", label: "ME" },
  { value: "MD", label: "MD" },
  { value: "MA", label: "MA" },
  { value: "MI", label: "MI" },
  { value: "MN", label: "MN" },
  { value: "MS", label: "MS" },
  { value: "MO", label: "MO" },
  { value: "MT", label: "MT" },
  { value: "NE", label: "NE" },
  { value: "NV", label: "NV" },
  { value: "NH", label: "NH" },
  { value: "NJ", label: "NJ" },
  { value: "NM", label: "NM" },
  { value: "NY", label: "NY" },
  { value: "NC", label: "NC" },
  { value: "ND", label: "ND" },
  { value: "OH", label: "OH" },
  { value: "OK", label: "OK" },
  { value: "OR", label: "OR" },
  { value: "PA", label: "PA" },
  { value: "RI", label: "RI" },
  { value: "SC", label: "SC" },
  { value: "SD", label: "SD" },
  { value: "TN", label: "TN" },
  { value: "TX", label: "TX" },
  { value: "UT", label: "UT" },
  { value: "VT", label: "VT" },
  { value: "VA", label: "VA" },
  { value: "WA", label: "WA" },
  { value: "WV", label: "WV" },
  { value: "WI", label: "WI" },
  { value: "WY", label: "WY" },
];

function Checkout(props) {




  // API Information
  const removeItemMock = 'https://private-anon-1283649964-securecheckout.apiary-mock.com/v1/cart/items/'
  const removeItemUrl = "https://cors-anywhere.herokuapp.com/https://api.securecheckout.com/v1/cart/items/";
    
    const APIKey = process.env.REACT_APP_API_KEY;
    const xAuthToken = sessionStorage.getItem("sessionToken");
    
    let config = {
        headers: {
            "Content-Type" : "application/json",
            "X-Auth-Token" : APIKey,
            "X-Sesion-Id" : xAuthToken,
        }
    };
  
  
    
    // Remove Item API Delete
    let sku = '';
    const RemoveItemCall = async () =>{
      const result = await axios.delete(`${removeItemUrl} ${sku} `, config).then((res) => {
          console.log("Removed Successfully");
          console.log(res);
          FlashAlert();
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
  }

    // Used for Alert Open/Close
    const [removedAlert, setRemovedAlert] = React.useState(false);

  // Used to flash removed alert
  const FlashAlert = () => {
    setRemovedAlert(true);
    setTimeout(() => {
      setRemovedAlert(false);
    }, 2000);
  }





  // State Selection State
  const [stateSelect, setStateSelect] = React.useState("AK");

  // State if shipping address is same as billing address
  const [
    shippingIsBillingAddress,
    setShippingIsBillingAddress,
  ] = React.useState(false);

  // Listens for State select
  const handleChange = (event) => {
    setStateSelect(event.target.value);
  };

  // Listens for Shipping is same checkbox
  const handleChecked = (event) => {
    setShippingIsBillingAddress(event.target.checked);
  };

  var cartSessionStorage = JSON.parse(sessionStorage.getItem("cartSession"));

  return (
    <div className={props.classes.checkoutWrapper}>
    {/* Billing Address Form */}
      <form>
        <Card className={props.classes.billingForm}>
          <CardContent>
            <Typography>Billing Address:</Typography>

            <TextField id="standard-basic" label="First Name" />
            <br />
            <TextField id="standard-basic" label="Last Name" />
            <br />
            <TextField id="standard-basic" label="Address" />
            <br />
            <TextField id="standard-basic" label="Apt#, Suite" />
            <br />
            <TextField id="standard-basic" label="City" />
            <br />
            <br />
            {/* State Selection */}
            <TextField className={props.classes.stateClass}
              id="standard-select-state"
              select
              label="State"
              value={stateSelect}
              onChange={handleChange}
              SelectProps={{
                native: false,
              }}
                // helperText="Please select your State"
            >
              {stateList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <br />
            <TextField id="standard-basic" label="Zip Code" />
          </CardContent>
        </Card>
      </form>



      {/* Shipping Address Form */}
      <form>
        <Card className={props.classes.shippingForm}>
          <CardContent>
            <Typography>Shipping Address:</Typography>

                {/* Same Address Checkbox */}
            <FormGroup className={props.classes.billingCheckbox}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={shippingIsBillingAddress}
                    onChange={handleChecked}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Same as Billing Address?"
              />
            </FormGroup>

            <TextField id="standard-basic" disabled={shippingIsBillingAddress} label="First Name" />
            <br/>
            <TextField id="standard-basic" disabled={shippingIsBillingAddress} label="Last Name" />
            <br/>
            <TextField id="standard-basic" disabled={shippingIsBillingAddress} label="Address" />
            <br/>
            <TextField id="standard-basic" disabled={shippingIsBillingAddress} label="Apt#, Suite" />
            <br/>
            <TextField id="standard-basic" disabled={shippingIsBillingAddress} label="City" />
            <br />
            <br />
            {/* Shipping State Select */}
            <TextField className={props.classes.stateClass}
            disabled={shippingIsBillingAddress}
              id="standard-select-state"
              select
              label="State"
              value={stateSelect}
              onChange={handleChange}
              SelectProps={{
                native: false,
              }}
              //   helperText="Please select your State"
            >
              {stateList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <br/>
            <TextField id="standard-basic" 
            disabled={shippingIsBillingAddress}
            label="Zip Code" />
          </CardContent>
        </Card>
      </form>



      {/* Cart Card */}
      <Card className={props.classes.cardCart}>
        <CardContent>
          <Typography>Cart:</Typography>
          <Divider />
          {/* Removed Item Success Alert */}
          <Collapse in={removedAlert}>
          <Alert severity="success">Removed from cart</Alert>
          </Collapse>
          {cartSessionStorage.map(function (item, index) {
            var n = sessionStorage.getItem("cartSession").length;
            var key = sessionStorage.key(n);
            return (
              <div key={index}>
                <Typography>{item.name}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography>Price: {item.price}</Typography>
                {/* <Button color="primary">Update Quantity</Button> */}
                <Button color="secondary"
                onClick={() => {
                                         
                  var currentCartState = JSON.parse(
                    sessionStorage.getItem("cartSession")
                    );                       
                    
                    var cartSplicer = currentCartState.splice(index, 1);
                    
                    // Gets sku for deleted item api call
                    sku = cartSplicer[0].sku;
                   
                    sessionStorage.setItem('cartSession', JSON.stringify(currentCartState));

                    RemoveItemCall();

                }}>Delete</Button>
                <Divider />
              </div>
            );
          })}
        </CardContent>
      </Card>


    </div>
  );
}
// }

export default withStyles(styles)(Checkout);
