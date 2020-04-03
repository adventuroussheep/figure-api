import React from 'react';
import "./navbar.css";
import { AppBar, Toolbar, IconButton, Button, Typography, MenuIcon, spacing } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

// const customStyles = theme => ({
//   root: {
//     backgroundColor: "red",
//     "&:hover": {
//       backgroundColor: "green"
//     }
//   }
// });

const styles = {
  appbar:{
    backgroundColor: 'transparent',
    boxShadow: 'none',
    alignItems: 'center',
    width: '100vw'
  },
  title:{
    position: 'absolute',
    top: '38px',
    left: '5px',
    cursor: 'pointer'
  },
  hover: {
    color: "white",
    transition: 'all .4s ease-in-out',
    textDecoration: 'none',
    textShadow: "1px 1px 0 #000",
    margin: '20px',
       '&:hover': {
        color: '#DAA520',
        cursor: 'pointer'
     }
   },
   login: {
    position: 'absolute',
    top: '38px',
    right: '5px'
   }
  };


function Navbar(props){
  
  const { classes } = props;
  // render(props){
    return (
      
      
      <AppBar className={props.classes.appbar} position="fixed">
    {/* <MyButton>asdf</MyButton> */}
    <IconButton edge="start"  color="inherit" aria-label="menu">
      {/* <MenuIcon /> */}
    </IconButton>
    <Typography className={props.classes.title} variant="h6" >
      FigureApi
    </Typography>
  <Toolbar>
    <Typography  className={props.classes.hover}>
        ABOUT
    </Typography>
    <Typography className={props.classes.hover}>
        WINES
    </Typography>
    <Typography className={props.classes.hover} >
        CONTACT
    </Typography>
    <Typography className={props.classes.hover} >
        VISIT
    </Typography>
  </Toolbar>
    <Button className={props.classes.login} color="inherit">Login</Button>
</AppBar>
    )
    }
// }

export default withStyles(styles)(Navbar);