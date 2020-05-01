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

// state

// zip


import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Divider, MenuItem } from "@material-ui/core";

const styles = {
  cardForm: {
    marginTop: "120px",
    position: "absolute",
    marginLeft: "10vw",
    width: "50vw",
  },
  cardCart: {
    marginTop: "120px",
      position: "absolute",
      marginLeft: "65vw",
      width: "25vw"
  }
};



const stateList = [
    { value: 'AL', label: 'AL' },
    { value: 'AK', label: 'AK' },
    { value: 'AZ', label: 'AZ' },
    { value: 'AR', label: 'AR' },
    { value: 'CA', label: 'CA' },
    { value: 'CO', label: 'CO' },
    { value: 'CT', label: 'CT' },
    { value: 'DE', label: 'DE' },
    { value: 'FL', label: 'FL' },
    { value: 'GA', label: 'GA' },
    { value: 'HI', label: 'HI' },
    { value: 'ID', label: 'ID' },
    { value: 'IL', label: 'IL' },
    { value: 'IN', label: 'IN' },
    { value: 'IA', label: 'IA' },
    { value: 'KS', label: 'KS' },
    { value: 'KY', label: 'KY' },
    { value: 'LA', label: 'LA' },
    { value: 'ME', label: 'ME' },
    { value: 'MD', label: 'MD' },
    { value: 'MA', label: 'MA' },
    { value: 'MI', label: 'MI' },
    { value: 'MN', label: 'MN' },
    { value: 'MS', label: 'MS' },
    { value: 'MO', label: 'MO' },
    { value: 'MT', label: 'MT' },
    { value: 'NE', label: 'NE' },
    { value: 'NV', label: 'NV' },
    { value: 'NH', label: 'NH' },
    { value: 'NJ', label: 'NJ' },
    { value: 'NM', label: 'NM' },
    { value: 'NY', label: 'NY' },
    { value: 'NC', label: 'NC' },
    { value: 'ND', label: 'ND' },
    { value: 'OH', label: 'OH' },
    { value: 'OK', label: 'OK' },
    { value: 'OR', label: 'OR' },
    { value: 'PA', label: 'PA' },
    { value: 'RI', label: 'RI' },
    { value: 'SC', label: 'SC' },
    { value: 'SD', label: 'SD' },
    { value: 'TN', label: 'TN' },
    { value: 'TX', label: 'TX' },
    { value: 'UT', label: 'UT' },
    { value: 'VT', label: 'VT' },
    { value: 'VA', label: 'VA' },
    { value: 'WA', label: 'WA' },
    { value: 'WV', label: 'WV' },
    { value: 'WI', label: 'WI' },
    { value: 'WY', label: 'WY' },
    
]

function Checkout(props) {
    const [stateSelect, setStateSelect] = React.useState('AK');

        const handleChange = (event) => {
            setStateSelect(event.target.value);
        };

        var cartSessionStorage = JSON.parse(sessionStorage.getItem("cartSession"));
  return (
    <div>
      <form>
        <Card className={props.classes.cardForm}>
          <CardContent>
            <Typography>Billing Address:</Typography>
            <TextField id="standard-basic" label="First Name" />
            <TextField id="standard-basic" label="Last Name" />
            <TextField id="standard-basic" label="Address" />
            <TextField id="standard-basic" label="Apt#, Suite" />
            <TextField id="standard-basic" label="City" />

            <TextField
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
          ))}</TextField>


            <TextField id="standard-basic" label="Zip Code" />
          </CardContent>
        </Card>
      </form>
      <Card className={props.classes.cardCart}>
          <CardContent>
            <Typography>Cart:</Typography>
            <Divider/>
            {cartSessionStorage.map(function (item, index) {
              //  var cartSessionIndexing = sessionStorage.getItem("cartSession")[index];
              // var cartSessionIndexing = sessionStorage.key(0);
              // sessionStorage.name = item.name;
              // var name = sessionStorage.name;
              var n = sessionStorage.getItem("cartSession").length;
              var key = sessionStorage.key(n);
              return (
                <div key={index}>
                  <Typography>{item.name}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography>Price: {item.price}</Typography>
                  <Divider/>
                  </div>
                  )})}
          </CardContent>
        </Card>
    </div>
  );
}
// }

export default withStyles(styles)(Checkout);
