import React, { useEffect, useState } from "react";
import ApiCall from "./WineCall";
import AddToCart from "../Cart/AddToCart/AddToCart";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles, useTheme } from "@material-ui/core/styles";

const styles = {
  card: {
    minWidth: "90vw",
    maxWidth: "90vw",
    float: "left",
    margin: "20px 20px",
  },
  descDiv: {},
  desc: {
    width: "70%",
    // marginRight: '10px',
    margin: "0 auto",
    float: "right",
    marginTop: "10px",
    // border: '2px solid black',
  },
  media: {
    height: "20vw",
    width: "20vw",
    margin: "0px auto",
    borderRadius: "3px",
    float: "left",
  },
  mobileMedia: {
    height: "200px",
    width: "200px",
    margin: "0px auto",
    marginBottom: '10px',
    borderRadius: "3px",
  },
  mobileButtons: {
    margin: "0 auto"
  }
};

function WineContainer(props) {
  // Creates a state for the API results to be set to, if no results the values are set to an empty array.
  const [containerState, setContainerState] = useState([]);
  var resultArr = [];

  // Styles and Media Queries
  const { classes } = props;
  const theme = useTheme();
  const desktopWidth = useMediaQuery(theme.breakpoints.up("sm"));
  
  
  // On page load WineCall.js is run and the api data is set to the setContainerState which can be accessed via containerState
  // You can add a value to [] that useEffect will listen for, if [var] changes useEffect will run again
  useEffect(() => {
    ApiCall().then((data) => setContainerState(data));
  }, []);
  
  
  const AddBtn = () =>{
    console.log("hello")
  }

  // Pushes JSON objects into an empty array converting them into array items

  if (containerState) {
    for (var i in containerState.data) {
      resultArr.push([i, containerState.data[i]]);
    }
    console.log(resultArr);


    // Desktop Render
    if (desktopWidth) {
      return (
        <div>
          {resultArr.map(function (item, index) {
            return (
              <Card key={index} className={props.classes.card}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item[1].name}
                    </Typography>

                    <div className={props.classes.descDiv}>
                      <CardMedia
                        className={props.classes.media}
                        image={item[1].image}
                        title="Contemplative Reptile"
                      />
                      <Typography
                        className={props.classes.desc}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item[1].description}
                      </Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                  <AddToCart/>
                </CardActions>
              </Card>
            );
          })}
        </div>
      );
    }


// Mobile Render
    if (!desktopWidth) {
      return (
        <div>
          {resultArr.map(function (item, index) {
            return (
              <Card key={index} className={props.classes.card}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item[1].name}
                    </Typography>

                    <div className={props.classes.mobileDescDiv}>
                      <CardMedia
                        className={props.classes.mobileMedia}
                        image={item[1].image}
                        title="Contemplative Reptile"
                      />
                      <Typography
                        className={props.classes.mobileDesc}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item[1].description}
                      </Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <div className={props.classes.mobileButtons}>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                  <AddToCart/>
                  </div>
                </CardActions>
              </Card>
            );
          })}
        </div>
      );
    }
  }
}

export default withStyles(styles)(WineContainer);
