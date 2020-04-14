import React from "react";
import "./navbar.css";
import LoginModal from '../LoginReg/Login';
import Logout from '../Logout/Logout';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const styles = {
  appbar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    alignItems: "center",
    width: "100vw",
  },
  title: {
    color: 'white',
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
    backgroundColor: 'rgba(0, 0, 0, .3)',
    boxShadow: '.5px 0px 5px white',
    bottom: '15px',
    right: '15px',
    zIndex: "1100",
    // border: '1px solid rgba(255, 255, 255, .3)',
    color: 'white'
  },
};

function Navbar(props) {
  const theme = useTheme();
  const desktopWidth = useMediaQuery(theme.breakpoints.up("sm"));

  const isSessionToken = sessionStorage.getItem("sessionToken");

  // Needed for mobile menu
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

  // Desktop menu
  if (desktopWidth && isSessionToken) {
    return (
      <AppBar className={props.classes.appbar} position="absolute">         
        {/* <MyButton>asdf</MyButton> */}
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
    <Typography> asdfasdf{isSessionToken}</Typography>
          <Link to="/" color="inherit" underline="none" style={{ textDecoration: 'none' }}>
        <Typography className={props.classes.title} variant="h6">
            FigureApi
        </Typography>
          </Link>
        <Toolbar>
            <Link to="/about" color="inherit" underline="none" style={{ textDecoration: 'none' }}>
          <Typography className={props.classes.hover}>
              ABOUT
          </Typography>
            </Link>
            <Link to="/wines" color="inherit" underline="none" style={{ textDecoration: 'none' }}>
          <Typography className={props.classes.hover}>
              WINES
          </Typography>
            </Link>
            <Link to="/contact" color="inherit" underline="none" style={{ textDecoration: 'none' }}>
          <Typography className={props.classes.hover}>
              CONTACT
          </Typography>
            </Link>
            <Link to="/visit" color="inherit" underline="none" style={{ textDecoration: 'none' }}>
          <Typography className={props.classes.hover}>
              VISIT
          </Typography>
            </Link>
        </Toolbar>
        {/* <Link color="inherit" underline="none"> */}
        
        <Logout />
        <LoginModal/>
      </AppBar>
    );
  }


    // Desktop menu Not Logged in
    if (desktopWidth && !isSessionToken) {
      return (
        <AppBar className={props.classes.appbar} position="absolute">         
          {/* <MyButton>asdf</MyButton> */}
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
      <Typography> asdfasdf{isSessionToken}</Typography>
            <Link to="/" color="inherit" underline="none" style={{ textDecoration: 'none' }}>
          <Typography className={props.classes.title} variant="h6">
              FigureApi
          </Typography>
            </Link>
          <Toolbar>
          </Toolbar>
          {/* <Link color="inherit" underline="none"> */}
          
          <Logout />
          <LoginModal/>
        </AppBar>
      );
    }



}
// }

export default withStyles(styles)(Navbar);
