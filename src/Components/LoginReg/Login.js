import React, { useState } from "react";
import axios from "axios";
import { Button, Link, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

// For styling
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    maxWidth: "80vw",
  },
  login: {
    color: "white",
    position: "absolute",
    textShadow: "1px 1px 0 #000",
    top: "38px",
    right: "25px",
  },
  registerBtn: {
    display: "flex",
    margin: "0 auto",
    marginTop: "5px",
  },
  signupBtn: {
    cursor: "pointer",
  },
}));

export default function LoginModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [newUser, setNewUser] = React.useState(false);

  // Open and close for modal
  const handleOpen = () => {
    setOpen(true);
    setNewUser(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Used to render Login or Register form
  const registerBtn = () => {
    setNewUser(true);
  };

  // Used to create Register Form state
  const [customerSignUp, setCustomerSignUp] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    state: "",
  });

  // Gets input field values and sets to register state
  const changeHandler = (event) => {
    setCustomerSignUp({
      ...customerSignUp,
      [event.target.name]: event.target.value,
    });
  };

  // Used to create Login Form state
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  // Gets login inputs and sets login state
  const changeHandlerLogin = (event) => {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  };

  // API Information
  const APIKey = process.env.REACT_APP_API_KEY;

  // const registerUrlDebug = `https://private-anon-25c3e5997f-securecheckout.apiary-proxy.com/v1/cart/auth/customer`;
  const registerUrl = `https://cors-anywhere.herokuapp.com/https://api.securecheckout.com/v1/cart/auth/customer`;

  // const usernameUrlDebug = `https://private-anon-67afedf6fb-securecheckout.apiary-proxy.com/v1/cart/auth/username/`;
  const usernameUrl = `https://cors-anywhere.herokuapp.com/https://api.securecheckout.com/v1/cart/auth/username/username`;

  const authUserMock = `https://cors-anywhere.herokuapp.com/https://private-anon-e8fbe0f1ad-securecheckout.apiary-mock.com/v1/cart/auth`;
  // const authUser = `https://api.securecheckout.com/v1/cart/auth`;

  // const createSessionProd = `https://cors-anywhere.herokuapp.com/https://api.securecheckout.com/v1/cart/auth/session`;
  const createSesionMock = `https://cors-anywhere.herokuapp.com/https://private-anon-b3a7a3c57a-securecheckout.apiary-mock.com/v1/cart/auth/session`;

  let config = {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": APIKey,
      "X-Sesion-Id": "12344321",
    },
  };

  // Checks if username exists, otherwise creates an account
  const ApiRegister = async (event) => {
    event.preventDefault();
    await axios.get(usernameUrl, config).then((data) => {
      if (data.data === false) {
        console.log(data.data);
        console.log(customerSignUp);
        alert("name is avaliable");
        axios
          .post(registerUrl, customerSignUp, config)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            alert("Registered Successfully");
            handleClose();
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          });
      } else {
        alert("Email or Username already exists.");
      }
    });
  };

  // API Call for user login
  const ApiLogin = async (event) => {
    event.preventDefault();

    // Authenticates user, if successful creates session token
    axios
      .post(authUserMock, userLogin, config)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);

        // Session Token Post
        axios
          .post(createSesionMock, config)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            alert("session created");
            // Sets token in session storage
            sessionStorage.setItem("sessionToken", res.data)
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          });
      })
      // Authentication error
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };


  // Renders register modal
  {
    if (newUser) {
      return (
        <div>
          <Button className={classes.login} type="button" onClick={handleOpen}>
            Login
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <Typography
                  style={{ fontSize: "40px" }}
                  id="transition-modal-title"
                >
                  Register
                </Typography>
                <form onSubmit={ApiRegister}>
                  <TextField
                    required
                    id="outlined-basic"
                    name="first_name"
                    onChange={changeHandler}
                    label="First Name"
                  />
                  <br />
                  <TextField
                    required
                    id="outlined-basic"
                    name="last_name"
                    onChange={changeHandler}
                    label="Last Name"
                  />
                  <br />
                  <TextField
                    required
                    id="outlined-basic"
                    name="username"
                    type="email"
                    onChange={changeHandler}
                    label="Email Address/Username"
                  />
                  <br />
                  <TextField
                    required
                    id="standard-password-input"
                    name="password"
                    type="password"
                    onChange={changeHandler}
                    label="Password"
                  />
                  <br />
                  <TextField
                    required
                    id="outlined-basic"
                    name="state"
                    onChange={changeHandler}
                    label="State"
                  />
                  <Button className={classes.registerBtn} type="submit">
                    REGISTER
                  </Button>
                </form>
              </div>
            </Fade>
          </Modal>
        </div>
      );
    }
  }

  // Renders Login Modal
  {
    if (!newUser) {
      return (
        <div>
          <Button className={classes.login} type="button" onClick={handleOpen}>
            Login
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <Typography
                  style={{ fontSize: "40px" }}
                  id="transition-modal-title"
                >
                  Sign In
                </Typography>
                <p>
                  Cupidatat sit ea esse officia duis dolore exercitation ullamco
                  ullamco enim veniam mollit sint non. Cupidatat eiusmod eiusmod
                  nulla ad. Anim deserunt laborum ex anim consectetur. Veniam
                  commodo consequat consectetur laboris ex dolore nisi ea sunt
                  quis nostrud nisi voluptate id.
                </p>
                <form onSubmit={ApiLogin}>
                  <TextField
                    required
                    id="outlined-basic"
                    name="username"
                    onChange={changeHandlerLogin}
                    label="Email Address/Username"
                  />
                  <br></br>
                  <TextField
                    required
                    id="outlined-basic"
                    name="password"
                    type="password"
                    onChange={changeHandlerLogin}
                    label="Password"
                  />
                  <Button className={classes.registerBtn} type="submit">
                    Sign In
                  </Button>
                </form>
                <span>
                  New Here?
                  <Link className={classes.signupBtn} onClick={registerBtn}>
                    {" "}
                    SIGN UP
                  </Link>
                </span>
              </div>
            </Fade>
          </Modal>
        </div>
      );
    }
  }
}
