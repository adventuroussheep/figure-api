import React from 'react';
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    logout: {
      color: "white",
      position: "absolute",
      textShadow: "1px 1px 0 #000",
      right: "15px",
      top: "65px"
    }
}))

export default function Logout() {
    const classes = useStyles();
    return(
        <div>
            <Button className={classes.logout} onClick={()=>{
                sessionStorage.setItem("sessionToken", '')
            }}>Logout</Button>
        </div>
    )
}
