import React from 'react';
// import { ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
// import APICall from '../../Api/ApiCall';
import APIContainer from '../../Api/ApiContainer';
import './homepage.css';

function HomePage() {
  return (
    <div className="homePageWrapper">
        <h1>HomePage</h1>
        {/* <APICall/> */}
        <APIContainer/>
        <Button color="Primary">Material-UI Button</Button>
    </div>
  );
}

export default HomePage;
