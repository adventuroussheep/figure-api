import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import notFoundImage from "../../Assets/brokenglass.jpg";

const useStyles = makeStyles((theme) => ({
    notFound: {
        position: 'absolute',
        backgroundImage: `url(${notFoundImage})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        textAlign: 'center'
    },
    header: {
        fontSize: '60px',
        margin: '0 auto',
        marginTop: '30vh',
    },
    content: {
        fontSize: '45px',
        margin: '0 auto',
    }
}));

export default function PageNotFound(){
    const classes = useStyles();
    return(
        <div className={classes.notFound}>
            <Typography className={classes.header}>404</Typography>
            <Typography className={classes.content}>Page not found :(</Typography>
        </div>
    )
}