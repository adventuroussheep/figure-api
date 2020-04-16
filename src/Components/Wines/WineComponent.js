import React from "react";
import WineContainer from "./WineContainer";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core/";
import "./winecomponent.css";

const styles = {
  pageContent: {
    position: "absolute",
    backgroundColor: "#f8f7eb",
    top: "65%",
    width: "100%",
  },
  homeTitle:{
    position: 'relative',
    color: "#fff",
    fontSize: "65px",
    textShadow: "2px 2px 0 #000",
    margin: '0 auto',
    textAlign: 'center',
    top: '30vh',
  }, 
  wines:{
    // position: 'relative',
    color: "#fff",
    fontSize: "45px",
    textShadow: "2px 2px 2px #000",
    margin: '0 auto',
    textAlign: 'center',
    // position: "-webkit-sticky",
    position: "sticky",
    top: "0"
  },
  wineDiv:{
    backgroundColor: "#f8f7eb",
    position: "sticky",
    top: "0",
    zIndex: "1100",
    boxShadow: '2px 1px 2px gray',
  }
};

function WineComponent(props) {
  // const { classes } = props;
  const isSessionToken = sessionStorage.getItem("sessionToken");
  // const PrivateRoute = ({component: Component, ...rest}) =>{

    return (
      <div className="winePageWrapper">
      <div className="headerScroll">
      <Typography className={props.classes.homeTitle}>To Your Table</Typography>

      </div>
      <div className={props.classes.pageContent}>
        <div className={props.classes.wineDiv}>
        <Typography className={props.classes.wines}>Wines</Typography>
        </div>
        <WineContainer />
      </div>
    </div>
  );
}
// }

export default withStyles(styles)(WineComponent);
