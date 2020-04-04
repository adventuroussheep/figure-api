import React, {useEffect, useState } from 'react';
import ApiCall from "./WineCall";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    minWidth: "90vw",
    maxWidth: '90vw',
    float: 'left',
    margin: '20px 20px'
  },
  descDiv:{

  },
  desc:{
    width: "70%",
    // marginRight: '10px',
    margin: '0 auto',
    float: 'right',
    marginTop: '10px',
    // border: '2px solid black',
  },
  media:{
    height: "200px",
    width: "200px",
    margin: '0px auto',
    borderRadius: '3px',
    float: 'left'
  },
};

function ApiContainer(props) {
    // Creates a state for the API results to be set to, if no results the values are set to an empty array.
    const [containerState, setContainerState] = useState([]);
    var resultArr = [];

    const { classes } = props;

    // On page load ApiCall.js is run and the api data is set to the setContainerState which can be accessed via containerState
    // You can add a value to [] that useEffect will listen for, if [var] changes useEffect will run again
    useEffect(() =>{
        ApiCall().then(data => setContainerState(data));
    }, []);

    
    
      // Pushes JSON objects into an empty array converting them into array items
      if(containerState){
        for(var i in containerState.data){
          resultArr.push([i, containerState.data [i]])
        }
        console.log(resultArr)
      }

      


      return  (
        
        <div>
          {resultArr.map(function(item, index){
            return(

              <Card key={index} className={props.classes.card}>
        {/* <CardMedia className={props.classes.media}
         
         image={item[1].image}
         title="Contemplative Reptile"
         /> */}
         <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item[1].name}
          </Typography>

          <div className={props.classes.descDiv}>
          <CardMedia className={props.classes.media}
         
         image={item[1].image}
         title="Contemplative Reptile"
         />
          <Typography className={props.classes.desc} variant="body2" color="textSecondary" component="p">
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
      </CardActions>
          </Card>
  
  // {resultArr.map(function(item, index){
    // return <h2 key={'item-' + index}>{item[1].name}</h2>
    )
  })}
  
  </div>
  
  
  
  
  
  ) 
  
}


export default withStyles(styles)(ApiContainer);