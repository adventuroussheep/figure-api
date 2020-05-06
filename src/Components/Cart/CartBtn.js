import React, { useEffect } from "react";
import MyContext from "../Context/Context";
import { Typography, Popover, Button } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Divider } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import axios from 'axios';

const styles = {
  root: {
    position: "absolute",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    // height: 48,
    // padding: '0 30px',
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    width: "500px",
    height: "500px",
  },

  cart: {
    transition: "all .4s ease-in-out",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      color: "#DAA520",
    },
    popover: {
      "&::before": {
        width: "500px",
        height: "500px",
        backgroundColor: "black!important",
        alignItems: "center",
      },
    },
  },
};

function CartBtn(props) {
  var cartSessionStorage = JSON.parse(sessionStorage.getItem("cartSession"));
   
  const theme = useTheme();
  const emptyArr = [];

  // Popover information
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    

  };


  const handleClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {}, [anchorEl]);


  // Used for Alert Open/Close
  const [removedAlert, setRemovedAlert] = React.useState(false);

  // Used to flash removed alert
const FlashAlert = () => {
  setRemovedAlert(true);
  setTimeout(() => {
    setRemovedAlert(false);
  }, 2000);
}



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
    const result = await axios.delete(`${removeItemMock} ${sku} `, config).then((res) => {
        console.log("Removed Successfully" + JSON.stringify(res));
        FlashAlert();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
}

  if (cartSessionStorage) {
    return (
      <div>
        <ShoppingCartIcon
          onClick={handleClick}
          className={props.classes.cart}
        />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >

          <div className={props.classes.popover}>




          <Collapse in={removedAlert}>
          <Alert severity="success">Removed from cart</Alert>
          </Collapse>





            <Typography gutterBottom variant="h5" component="h2">
              Cart
            </Typography>
            {cartSessionStorage.map(function (item, index) {
              var n = sessionStorage.getItem("cartSession").length;
              var key = sessionStorage.key(n);
              return (
                <div key={index}>
                  <Typography>{item.name}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography>Price: {item.price}</Typography>

                  {/* Delete Button Functions */}
                  <Button
                    onClick={() => {
                                         
                      var currentCartState = JSON.parse(
                        sessionStorage.getItem("cartSession")
                        );                       
                        
                        var cartSplicer = currentCartState.splice(index, 1);
                        
                        // Gets sku for deleted item api call
                        sku = cartSplicer[0].sku;
                       
                        sessionStorage.setItem('cartSession', JSON.stringify(currentCartState));

                        RemoveItemCall();

                    }}
                    color={"secondary"}
                  >
                    Delete
                  </Button>
                  <Divider />
                </div>
              );
            })}

            <div></div>
          </div>
          <Link
          to="/checkout"
          color="inherit"
          underline="none"
          style={{ textDecoration: "none" }}
        >
          <Button color={"primary"}>Checkout</Button>
          </Link>
        </Popover>
      </div>
    );
  }
  if (cartSessionStorage == 0 || !cartSessionStorage) {
    return (
      <div>
        <ShoppingCartIcon
          onClick={handleClick}
          className={props.classes.cart}
        />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography>Cart is Empty</Typography>
        </Popover>
      </div>
    );
  }
}

export default withStyles(styles)(CartBtn);
