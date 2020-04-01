import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router />
  </ThemeProvider>,
  document.getElementById("root")
);
