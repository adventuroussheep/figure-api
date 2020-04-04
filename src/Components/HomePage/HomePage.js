import React from 'react';
// import { ThemeProvider } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
// import APICall from '../../Api/ApiCall';
// import APIContainer from '../../Api/ApiContainer';
import { withStyles } from '@material-ui/core/styles';
import './homepage.css';


const styles = {
  homeTitle:{
    position: 'relative',
    color: "#fff",
    fontSize: "70px",
    textShadow: "2px 2px 0 #000",
    margin: '0 auto',
    textAlign: 'center',
    top: '35vh',
  },
};

function HomePage(props) {
  const { classes } = props;
  return (
    <div className="homePageWrapper">
        <Typography className={props.classes.homeTitle}>From the Vine</Typography>

    </div>
  );
}

export default withStyles(styles)(HomePage);
