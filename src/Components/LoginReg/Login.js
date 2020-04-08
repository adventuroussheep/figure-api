import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Link, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { render } from "@testing-library/react";

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
}));

export default function LoginModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [newUser, setNewUser] = React.useState(false);

  const registerUrlMock = `https://private-anon-25c3e5997f-securecheckout.apiary-proxy.com/v1/cart/auth/customer`;

  const registerUrl = `https://api.securecheckout.com/v1/cart/auth/customer`;

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

  // Used to get Register Form state
  const [customerSignUp, setCustomerSignUp] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    state: "",
  });

  // Gets input field values and sets to state
  const changeHandler = (event) => {
    setCustomerSignUp({ ...customerSignUp, [event.target.name]: event.target.value });
  };

  const APIKey = process.env.REACT_APP_API_KEY;

  let config = {
    headers: {
        "Content-Type" : "application/json",
        "X-Auth-Token" : APIKey,
        "X-Sesion-Id" : "234523452345"
    }
};




  const ApiRegister = async () =>{

    // const ApiCall = async () =>{
      const result = await axios.get(registerUrlMock, config).then(( data ) => data);
      // return result;
  // }


    axios.post(registerUrlMock, customerSignUp).then(( data ) => data);
    console.log(result)
    // return result;
}


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
                <h2 id="transition-modal-title">Register</h2>
                <form>
                <TextField id="outlined-basic" name="first_name"
                onChange={changeHandler} label="First Name" />
                <br/>
                <TextField id="outlined-basic" name="last_name" 
               onChange={changeHandler} label="Last Name" />
                <br/>
                  <TextField id="outlined-basic" name="username" onChange={changeHandler}  label="Email Address/Username" />
                  <br/>
                  <TextField id="outlined-basic" name="password"
                  onChange={changeHandler} label="Password" />
                  <br/>
                  <TextField id="outlined-basic" name="state"
                  onChange={changeHandler} label="State" />
                </form>
                <Button>REGISTER</Button>
                <Button onClick={ApiRegister}>Login</Button>
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
                <h2 id="transition-modal-title">Sign In</h2>
                <p>
                  Cupidatat sit ea esse officia duis dolore exercitation ullamco
                  ullamco enim veniam mollit sint non. Cupidatat eiusmod eiusmod
                  nulla ad. Anim deserunt laborum ex anim consectetur. Veniam
                  commodo consequat consectetur laboris ex dolore nisi ea sunt
                  quis nostrud nisi voluptate id.
                </p>
                <form>
                  <TextField id="outlined-basic" label="Email Address" />
                  <br></br>
                  <TextField id="outlined-basic" label="Password" />
                </form>
                <Button>Sign In</Button>
                <span>
                  New Here?
                  <Link onClick={registerBtn}>SIGN UP</Link>
                </span>
              </div>
            </Fade>
          </Modal>
        </div>
      );
    }
  }
}
