import React, {useEffect, useState } from 'react';
import ApiCall from "./ApiCall";
import ApiComponent from './ApiComponent';

export const ApiContainer = ({index}) => {
    // Creates a state for the API results to be set to, if no results the values are set to an empty array.
    const [containerState, setContainerState] = useState([]);

    // On page load ApiCall.js is run and the api data is set to the setContainerState which can be accessed via containerState
    // You can add a value to [] that useEffect will listen for, if [var] changes useEffect will run again
    useEffect(() =>{
        ApiCall().then(data => setContainerState(data));
        
    }, []);

    
    
    // console.log(containerState[3].id[0]);
    
    // const something = Object.values(containerState[3]);

    // console.log(Object.entries(containerState[0]));

    // console.log(containerState.name)


// return containerState.map(index=> (
        // <ApiComponent index={index}/>


          
          return  (
            
            <div>
      {/* {Object.entries(containerState).map(list=> */}
        {Object.keys(containerState).map((keys, index)=>

        <div>
          {/* <li>{(containerState[keys])}</li> */}
        <li key={keys+index}>{containerState.data[keys]}</li>
        <li key={keys}>{containerState[keys].name}</li>
      </div>

)}
      {/* <p>{containerState[3].}</p> */}
    
    </div>





) 

}

// <p>{JSON.stringify(containerState)}</p>
// ))


export default ApiContainer;