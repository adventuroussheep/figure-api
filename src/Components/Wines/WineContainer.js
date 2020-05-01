import React, { useEffect, useState } from "react";
import axios from "axios";
import ApiCall from "./WineCall";
import './winecomponent.css';
// import AddToCart from "../Cart/AddToCart/AddToCart";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { Select, InputLabel } from "@material-ui/core/";

const styles = {
  card: {
    minWidth: "90vw",
    maxWidth: "90vw",
    // float: "left",
    margin: "25px auto",
  },
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
  loading: {
    position: "relative",
    margin: "0 auto",
    marginTop: "-10vh",
    textAlign: "center",
    zIndex: "1200",
  },
  backNextBtns: {
    position: "relative",
    margin: "5px auto",
    textAlign: "center"
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

function WineContainer(props) {
  
  // Creates a state for the API results to be set to, if no results the values are set to an empty array.
  const [containerState, setContainerState] = useState([]);
  var resultArr = [];
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState({
    bottomCount: 0,
    topCount: 10,
  });

  // Creates Cart state for AddToCart API Post
  const [cartState, setCartState] = useState({
    quantity: "",
    sku: "",
  });

  // Create Cart state for local session, cartBtn rendering, and future checkout page
  const [localCartState, setLocalCartState] = useState({
    name: "",
    quantity: "",
    sku: "",
    price: "",
  });

  // Gets quantity for add cart
  const changeHandlerQuantity = (event) => {
    setCartState({
      ...cartState,
      quantity: event.target.value,
    });
    setLocalCartState({
      ...localCartState,
      quantity: event.target.value,
    });
  };

  var sessionCart = [];

  // When the Add To Cart Button is pressed useEffect waits for the count state to change before running the API Call. This prevents the API Call from running before the state has been updated which causes 400 errors
  useEffect(() => {
    ApiAddToCart();

  }, [count]);

  // API Post for cart items
  const ApiAddToCart = async () => {
    if (cartState.sku !== "" && cartState.quantity !== "") {
      console.log(cartState);
      console.log(sessionCart)
      await axios
        .post(AddToCartUrl, cartState, config)
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          setCartState({
            ...cartState,
            quantity: "",
            sku: "",
          });
          alert("Added to Cart");

    // Used to append cart data to local session
    var currentCartState = JSON.parse(sessionStorage.getItem('cartSession')) || [];
    currentCartState.push(localCartState);
    sessionStorage.setItem('cartSession', JSON.stringify(currentCartState));
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);



          // DUPLICATE, Use for mock routes
          // Used to append cart data to local session
          // var currentCartState = JSON.parse(sessionStorage.getItem('cartSession')) || [];
          // currentCartState.push(localCartState);
          // sessionStorage.setItem('cartSession', JSON.stringify(currentCartState));
        });
    }
    if (cartState.sku !== "" && cartState.quantity === "") {
      alert("please select a quantity");
    }
  };

  // Styles and Media Queries
  // const { classes } = props;
  const theme = useTheme();
  const desktopWidth = useMediaQuery(theme.breakpoints.up("sm"));

  // On page load WineCall.js is run and the api data is set to the setContainerState which can be accessed via containerState
  useEffect(() => {
    ApiCall().then((data) => setContainerState(data));
  }, []);

  // Pushes JSON objects into an empty array converting them into array items
  if (containerState) {
    for (var i in containerState.data) {
      resultArr.push([i, containerState.data[i]]);
    }

    if (containerState.length < 1) {
      return (
        <div className={props.classes.loading}>
          <CircularProgress size={100}></CircularProgress>
        </div>
      );
    }

    // Desktop Render
    if (desktopWidth) {
      return (
        <div>
               <div className={props.classes.wineDiv}>
        <Typography className={props.classes.wines}>Wines</Typography>
        </div>
          {resultArr
            .slice(renderCount.bottomCount, renderCount.topCount)
            .map(function (item, index) {
              // {resultArr.map(function (item, index) {
              return (
                <Card
                  key={index}
                  className={props.classes.card}
                  alt="Card Container"
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item[1].name}
                      </Typography>

                      <div>
                        {/* Source of console error: Failed prop type, image needs a require or onError */}
                        <CardMedia
                          className={props.classes.media}
                          image={item[1].image || null}
                          alt="Wine Image"
                          title="Contemplative Reptile"
                          style={styles.media}
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
                    <InputLabel htmlFor="age-native-simple">
                      Quantity
                    </InputLabel>
                    <Select
                      native
                      // value={quantityDisplay}
                      onChange={changeHandlerQuantity}
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
                        setLocalCartState({
                          ...localCartState,
                          name: item[1].name,
                          price: item[1].price,
                          sku: item[1].sku,
                        });
                        setCount(count + 1);
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

            <div className={props.classes.backNextBtns}>
          <Button size="large" color="secondary"
          onClick={() => {
            if(renderCount.bottomCount !== 0){
              setRenderCount({
                ...renderCount,
                bottomCount: (renderCount.bottomCount-10),
                topCount: (renderCount.topCount-10),
              });
            }
          }}
          >Back</Button>
          <Button size="large" color="secondary"
            onClick={() => {
              setRenderCount({
                ...renderCount,
                bottomCount: (renderCount.bottomCount+10),
                topCount: (renderCount.topCount+10),
              });
            }}
            >
            Next
          </Button>
            </div>
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
                    {/* <AddToCart /> */}
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
