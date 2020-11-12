import React from "react";
import ReactDOM from "react-dom";
import "regenerator-runtime/runtime"; //to allow async/await

// top level app
import App from "./components/App";

// scss root
import "./scss/club.scss";
import 'semantic-ui-css/semantic.min.css';

/**
 * This is where we will need to wrap the app in a provider and allow global state later - i  will need state managemenet globally. I will use context API
 * to stay simple and stick within the React eco-system a little more precisely
 */

// render our spaa into the root entry point in the index.html file
ReactDOM.render(<App />, document.querySelector(".root"));
