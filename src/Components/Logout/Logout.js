import React from 'react';
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    // logout: {
    //   color: "white",
    //   position: "absolute",
    //   textShadow: "2px 1px 0 #000",
    //   top: "38px",
    //   right: "25px",
    // },
    // logout: {
        // color: "white",
        // position: "absolute",
        // textShadow: "2px 1px 0 #000",
        // top: "38px",
        // right: "25px",
        // cursor: "pointer",
    //   },
      logout: {
        color: "white",
        transition: "all .4s ease-in-out",
        textDecoration: "none",
        position: "absolute",
        textShadow: "2px 1px 0 #000",
        top: "41px",
        right: "25px",
        // margin: "20px",
        "&:hover": {
          color: "#b71a2c",
          cursor: "pointer",
        }
    }
}))

export default function Logout() {
    const classes = useStyles();
    return(
        <div>
            <Typography className={classes.logout} href="/" onClick={()=>{
                sessionStorage.setItem("sessionToken", ''); window.location.reload();
            }}>Logout</Typography>
        </div>
    )
}
