import React, { useEffect } from "react";
import "./navbar.css";
import LoginModal from "../LoginReg/Login";
import Logout from "../Logout/Logout";
import MyContext from "../Context/Context";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  Popover,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const styles = {
  appbar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    alignItems: "center",
    width: "100vw",
  },
  title: {
    color: "white",
    position: "absolute",
    textShadow: "1px 1px 0 #000",
    top: "38px",
    left: "25px",
    cursor: "pointer",
  },
  hover: {
    color: "white",
    transition: "all .4s ease-in-out",
    textDecoration: "none",
    textShadow: "1px 1px 0 #000",
    margin: "20px",
    "&:hover": {
      color: "#DAA520",
      cursor: "pointer",
    },
  },
  mobileMenuBtn: {
    position: "fixed",
    backgroundColor: "rgba(0, 0, 0, .3)",
    boxShadow: ".5px 0px 5px white",
    bottom: "15px",
    right: "15px",
    zIndex: "1100",
    // border: '1px solid rgba(255, 255, 255, .3)',
    color: "white",
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
  },
};

function Navbar(props) {
  const theme = useTheme();
  const desktopWidth = useMediaQuery(theme.breakpoints.up("sm"));

  const isSessionToken = sessionStorage.getItem("sessionToken");

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



  // Mobile Menu State
  const [state, setState] = React.useState({
    left: false,
  });
  // Mobile drawer function
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // Mobile Menu
  if (!desktopWidth) {
    return (
      <div>
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton
              className={props.classes.mobileMenuBtn}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={toggleDrawer(anchor, true)}
            >
              <MoreVertIcon />
            </IconButton>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              <p>try this menu</p>
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    );
  }

  // Desktop menu Logged In
  if (desktopWidth && isSessionToken) {
    return (
      <MyContext.Consumer>
        {(context) => (
          <AppBar className={props.classes.appbar} position="absolute">
            {/* <MyButton>asdf</MyButton> */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Link
              to="/"
              color="inherit"
              underline="none"
              style={{ textDecoration: "none" }}
            >
              <Typography className={props.classes.title} variant="h6">
                FigureApi
              </Typography>
            </Link>
            <Toolbar>
              <Link
                to="/about"
                color="inherit"
                underline="none"
                style={{ textDecoration: "none" }}
              >
                <Typography className={props.classes.hover}>ABOUT</Typography>
              </Link>
              <Link
                to="/wines"
                color="inherit"
                underline="none"
                style={{ textDecoration: "none" }}
              >
                <Typography className={props.classes.hover}>WINES</Typography>
              </Link>
              <Link
                to="/contact"
                color="inherit"
                underline="none"
                style={{ textDecoration: "none" }}
              >
                <Typography className={props.classes.hover}>CONTACT</Typography>
              </Link>
              <Link
                to="/visit"
                color="inherit"
                underline="none"
                style={{ textDecoration: "none" }}
              >
                <Typography className={props.classes.hover}>VISIT</Typography>
              </Link>
              <ShoppingCartIcon
                onClick={handleClick}
                className={props.classes.cart}
              />
            </Toolbar>
            <Logout />

            {/* Cart Popover */}
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

              <Typography>Cart</Typography>
              <div>
              <Typography>Name of item</Typography>
              <Typography>Quantity: </Typography>
              <Typography>Price: </Typography>
              </div>
              <Typography>Total: </Typography>
              </div>
            </Popover>
          </AppBar>
        )}
      </MyContext.Consumer>
    );
  }

  // Desktop menu Not Logged in
  if (desktopWidth && !isSessionToken) {
    return (
      <AppBar className={props.classes.appbar} position="absolute">
        {/* <MyButton>asdf</MyButton> */}
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Link
          to="/"
          color="inherit"
          underline="none"
          style={{ textDecoration: "none" }}
        >
          <Typography className={props.classes.title} variant="h6">
            FigureApi
          </Typography>
        </Link>
        <Toolbar></Toolbar>
        {/* <Link color="inherit" underline="none"> */}

        <LoginModal />
      </AppBar>
    );
  }
}
// }

export default withStyles(styles)(Navbar);
