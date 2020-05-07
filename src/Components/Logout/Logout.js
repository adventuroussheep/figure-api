import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
    },
  },
}));

export default function Logout() {
  const classes = useStyles();
  return (
    <div>
      <Link
        // to="/"
        color="inherit"
        underline="none"
        style={{ textDecoration: "none" }}
        onClick={() => {
          sessionStorage.setItem("sessionToken", "");
          window.location.assign("/");
        }}
      >
        <Typography className={classes.logout}>Logout</Typography>
      </Link>
    </div>
  );
}
