import React, { useEffect } from "react";
import MyContext from "../Context/Context";
import {
  Typography,
  Popover,
  Button,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withStyles, useTheme } from "@material-ui/core/styles";

const styles = {
    root: {
        position: 'absolute',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        // height: 48,
        // padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
                    alignItems: "center"
                }
            }
        
    }
}




function CartBtn(props) {

    const theme = useTheme();
    
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


    useEffect(() => {
        alert("cart Effect")
      }, [anchorEl]);


    return(

        <div>
    <ShoppingCartIcon onClick={handleClick} className={props.classes.cart} />

    <Popover
    // classes={{
    //     root: props.classes.root
    // }}
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
      
        <Typography>Cart</Typography>
        <div>
          <Typography>Name of item</Typography>
          <Typography>Quantity: </Typography>
          <Typography>Price: </Typography>
          <Button color={'secondary'}>Delete</Button>
        </div>
        <Typography>Total: </Typography>
      </div>
      <Button color={"primary"}>Checkout</Button>
    </Popover>
  </div>
)
}

export default withStyles(styles)(CartBtn);
