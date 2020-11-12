import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  history,
} from "react-router-dom";

// Components
import Nav from "./Nav";
import Home from "./Home";
import Locations from "./Locations";
import Login from "./Login";
import Register from "./Register";
import Profile from './Profile'
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [state, setState] = useState({
    role: "guest", // initial is guest so they always see home, find, login and register
    isAuthenticated: false,
    userInformation: {},
  });

  /**
   * This is going to act as my 'app level state' for now. I am going to refactor this app to use either context API or 
   * is being made. I am using a callback to render the login with props. I would rather use top level wrapper (context or a store in redux)
   * and pass state to every elligible component
   * 
   * This will suffice for now - we can see now the profile page needs this paradigm too... i will be converting this app to use Redux 
   */
  const setUser = (userRole, auth, user) => {
    setState({role:userRole, isAuthenticated: auth, userInformation: {...user}});
  }
  return (
    <>
      <Router history={history}>
        <Nav userAgent={state.role} setUser={setUser} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/locations" component={ () => <Locations isAuthenticated={state.isAuthenticated} userInformation={state.userInformation}/>} />
          <Route path="/login" component={ () => <Login setUser={setUser} />}/>
          <Route path="/register" component={() => <Register setUser={setUser}/>} />
          <ProtectedRoute exact path="/profile" component={ () => <Profile userInfo={state.userInformation}/>} isAuthenticated={state.isAuthenticated}/>
          <ProtectedRoute exact path="/dashboard" component={Dashboard} isAuthenticated={state.isAuthenticated}/>
        </Switch>
      </Router>
    </>
  )
}

export default App;
