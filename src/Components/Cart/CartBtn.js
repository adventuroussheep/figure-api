import React, { useEffect } from "react";
import MyContext from "../Context/Context";
import { Typography, Popover, Button } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Divider } from "@material-ui/core";
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
    

    // REMOVE ~~~~~
    console.log("currentCartState on cartClick");
    console.log(JSON.parse(
      sessionStorage.getItem("cartSession")
    ));


  };


  const handleClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {}, [anchorEl]);






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

  let sku = '';

  // Remove Item API Delete
  const RemoveItemCall = async () =>{
    const result = await axios.delete(`${removeItemMock} ${sku} `, config).then((res) => {
        console.log("Removed Successfully" + JSON.stringify(res));
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
            <Typography gutterBottom variant="h5" component="h2">
              Cart
            </Typography>
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

                  {/* Delete Button Functions */}
                  <Button
                    onClick={() => {
                      
                     
                      var currentCartState = JSON.parse(
                        sessionStorage.getItem("cartSession")
                        );




                        console.log("currentCartState thats being pushed to the emptryArr");
                        console.log(currentCartState);
                        
                      
                        // emptyArr.push(currentCartState);
                        emptyArr.push(JSON.parse(
                          sessionStorage.getItem("cartSession")
                          ))


                        console.log("emptyArr after currentCartState push and after item deleted");
                        console.log(emptyArr);


                        // Used to get deleted item sku
                        var deletedItem = emptyArr[0].splice(index, 1);
                        sku = deletedItem[0].sku;
                        
                      
                      // var splicedArr = emptyArr[0].splice(index, 1) && emptyArr;

                      // console.log(emptyArr);
                      // var arrayInsideIndex = emptyArr[0];
                     
                     
                      // var splicedArr = emptyArr[0].splice(index, 1);
                      
                      var splicedArr = emptyArr[0].splice(index, 1) && emptyArr;
                      
                        console.log("The array thats being pushed")
                      console.log(splicedArr);

    


                      sessionStorage.removeItem("cartSession");

                      sessionStorage.setItem(
                        "cartSession",
                        JSON.stringify(splicedArr[0])
                        // JSON.stringify(splicedArr)
                      );
                      // RemoveItemCall();
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
