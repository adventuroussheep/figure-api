import React from 'react';
import { Button, Link, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
    maxWidth: '80vw'
  },
  login: {
    color: 'white',
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


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("helllo")

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
            <p>Cupidatat sit ea esse officia duis dolore exercitation ullamco ullamco enim veniam mollit sint non. Cupidatat eiusmod eiusmod nulla ad. Anim deserunt laborum ex anim consectetur. Veniam commodo consequat consectetur laboris ex dolore nisi ea sunt quis nostrud nisi voluptate id.</p>
            <form>
                <TextField id="outlined-basic" label="Email Address"/>
                <br></br>
                <TextField id="outlined-basic" label="Password"/>
            </form>
          <Button>Sign In</Button>
          <span>
               New Here?
              <Link>SIGN UP</Link>
          </span>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
