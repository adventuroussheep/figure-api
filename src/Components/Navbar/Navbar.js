import React from 'react';
import "./navbar.css";
import { AppBar, Toolbar, IconButton, Button, Typography, Link } from '@material-ui/core';
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
    textShadow: "1px 1px 0 #000",
    top: '38px',
    left: '25px',
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
    textShadow: "1px 1px 0 #000",
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
    <Link href='/' color='inherit' underline='none'>
      FigureApi
      </Link>
    </Typography>
  <Toolbar>
    <Typography  className={props.classes.hover}>
    <Link href='/about' color='inherit' underline='none'>
        ABOUT
        </Link>
    </Typography>
    <Typography className={props.classes.hover}>
      <Link href='/wines' color='inherit' underline='none'>
        WINES
      </Link>
    </Typography>
    <Typography className={props.classes.hover} >
    <Link href='/contact' color='inherit' underline='none'>
        CONTACT
        </Link>
    </Typography>
    <Typography className={props.classes.hover} >
    <Link href='/visit' color='inherit' underline='none'>
        VISIT
        </Link>
    </Typography>
  </Toolbar>
  <Link href='/' color='inherit' underline='none'>
    <Button className={props.classes.login} color="inherit">Login</Button>
    </Link>
</AppBar>
    )
    }
// }

export default withStyles(styles)(Navbar);