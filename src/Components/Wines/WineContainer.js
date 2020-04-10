import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { Select, InputLabel } from "@material-ui/core/";

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
    marginBottom: "10px",
    borderRadius: "3px",
  },
  mobileButtons: {
    margin: "0 auto",
  },
};

// API information for customer Cart
const APIKey = process.env.REACT_APP_API_KEY;
const AddToCartUrl = `https://cors-anywhere.herokuapp.com/https://api.securecheckout.com/v1/cart/items`;

let config = {
  headers: {
    "Content-Type": "application/json",
    "X-Auth-Token": APIKey,
    "X-Sesion-Id": "12344321",
  },
};

const ApiAddToCart = async () => {
  // axios
  // .post(AddToCartUrl, config)
  // .then((res) => {
  //   console.log("RESPONSE RECEIVED: ", res);
  // })
  // .catch((err) => {
  //   console.log("AXIOS ERROR: ", err);
  // });
  // const result = await axios.get(currentProdUrl, config).then(( data ) => data);
  // return result;
};

function WineContainer(props) {
  // Creates a state for the API results to be set to, if no results the values are set to an empty array.
  const [containerState, setContainerState] = useState([]);
  var resultArr = [];

  // Creates state for user cart
  const [cartState, setCartState] = useState({
    quantity: "",
    sku: "",
  });

  // Gets quantity for add cart
  const changeHandlerQuantity = (event) => {
    setCartState({
      ...cartState,
      quantity: event.target.value,
    });
    setQuantityDisplay(event.target.value);
  };

  //
  const [quantityDisplay, setQuantityDisplay] = React.useState("");

  // Styles and Media Queries
  const { classes } = props;
  const theme = useTheme();
  const desktopWidth = useMediaQuery(theme.breakpoints.up("sm"));

  // On page load WineCall.js is run and the api data is set to the setContainerState which can be accessed via containerState
  // You can add a value to [] that useEffect will listen for, if [var] changes useEffect will run again
  useEffect(() => {
    ApiCall().then((data) => setContainerState(data));
  }, []);

  // Pushes JSON objects into an empty array converting them into array items
  if (containerState) {
    for (var i in containerState.data) {
      resultArr.push([i, containerState.data[i]]);
    }
    // console.log(resultArr);

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
                        alt="Wine Image"
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
                  <InputLabel htmlFor="age-native-simple">Quantity</InputLabel>
                  <Select
                    native
                    value={quantityDisplay}
                    onChange={changeHandlerQuantity}
                    // inputProps={{
                    //   name: 'Quantity',
                    //   id: 'age-native-simple',
                    // }}
                  >
                    <option aria-label="None" value="" />
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </Select>
                  <Button
                    onClick={() => {
                      setCartState({
                        ...cartState,
                        sku: item[1].sku,
                      });

                      console.log(cartState);
                    }}
                    size="small"
                    color="secondary"
                  >
                    Add to Cart
                  </Button>
                  {/* <AddToCart /> */}
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
                    <AddToCart />
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
