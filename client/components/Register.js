import React, {useState} from "react";
import { useHistory } from "react-router";

import MessagePopup from "./MessagePopup";

function Register({setUser}) {
  let history = useHistory();
  const [state, setState] = useState({
    username:'',
    email_input:'',
    password_input:'',
  });
  const [popup, setPopup] = useState(null); // error state for bad registration popups

  // handle input changes
  function onChange(e) {
    setState({...state, [e.target.name]: e.target.value})
  }

  // submits the request to the backend for registration
  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      //prod: 'https://coffee-connection.herokuapp.com/auth/register'
      //dev: 'http://localhost:5000/auth/register'
      const response = await fetch('https://coffee-connection.herokuapp.com/auth/register', {
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          username: state.username,
          password: state.password_input,
          email: state.email_input
        })
      });
      const info = await response.json();
      if(info.isAuthenticated){
        setUser(info.data.role, info.isAuthenticated, info.data); // set the user state at top level (this will all be changed to context or redux after i get everything working)
        history.push('/profile')
      }else {
        // set state for error
        setPopup({msg: info.msg, color: 'red'});
        // after 5 seconds, 'remove' it 
        setTimeout(() => setPopup(null), 3000)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <main id="login__main-container">
        <form className="login__form" onSubmit={onFormSubmit}>
          {popup ? (<MessagePopup msg={popup} style={{width: '100%'}}/> ): null}
          <h1 className="hero-text">Register</h1>
          <label htmlFor="user_name">Full Name</label>
          <input
            type="text"
            name="username"
            value={state.username}
            id="user_name"
            onChange={onChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email_input"
            value={state.email_input}
            id="email"
            onChange={onChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password_input"
            value={state.password_input}
            id="password"
            onChange={onChange}
          />
          <input type="submit" value="Submit" id="submit_btn" />
        </form>
      </main>
  );
}

export default Register;
