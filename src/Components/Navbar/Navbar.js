import React from "react";
import "./navbar.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Link,
  SwipeableDrawer,
} from "@material-ui/core";
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
  login: {
    position: "absolute",
    textShadow: "1px 1px 0 #000",
    top: "38px",
    right: "25px",
  },
  mobileMenuBtn: {
    position: "absolute",
    bottom: '15px',
    right: '15px',
    zIndex: "1100",
    // textShadow: "1px 1px 0 #000",
    // boxShadow: "1px 1px 1px  #f0f0f0",
    border: '1px solid rgba(255, 255, 255, .3)',
    color: 'white'
  },
};

function Navbar(props) {
  
  const theme = useTheme();
  const desktopWidth = useMediaQuery(theme.breakpoints.up("sm"));
  const { classes } = props;

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
              <p>Hello try this menu asdfasdfasdf</p>
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (desktopWidth) {
    return (
      <AppBar className={props.classes.appbar} position="fixed">
        {/* <MyButton>asdf</MyButton> */}
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Typography className={props.classes.title} variant="h6">
          <Link href="/" color="inherit" underline="none">
            FigureApi
          </Link>
        </Typography>
        <Toolbar>
          <Typography className={props.classes.hover}>
            <Link href="/about" color="inherit" underline="none">
              ABOUT
            </Link>
          </Typography>
          <Typography className={props.classes.hover}>
            <Link href="/wines" color="inherit" underline="none">
              WINES
            </Link>
          </Typography>
          <Typography className={props.classes.hover}>
            <Link href="/contact" color="inherit" underline="none">
              CONTACT
            </Link>
          </Typography>
          <Typography className={props.classes.hover}>
            <Link href="/visit" color="inherit" underline="none">
              VISIT
            </Link>
          </Typography>
        </Toolbar>
        <Link href="/" color="inherit" underline="none">
          <Button className={props.classes.login} color="inherit">
            Login
          </Button>
        </Link>
      </AppBar>
    );
  }
}
// }

export default withStyles(styles)(Navbar);
