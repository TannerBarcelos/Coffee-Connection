import React, { useState } from 'react';
import { useHistory } from 'react-router';

import MessagePopup from './MessagePopup';

const Register = ({ setUser }) => {
  let history = useHistory();

  // best practice: use N use states instead of one use state with an object
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState(null); // error state for bad registration popups

  const onUsernameChange = (e) => {
    setUserName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // submits the request to the backend for registration
  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      //prod: 'https://coffee-connection.herokuapp.com/auth/register'
      //dev: 'http://localhost:5000/auth/register'
      const response = await fetch(
        'https://coffee-connection.herokuapp.com/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
          }),
        },
      );
      const info = await response.json();
      if (info.isAuthenticated) {
        setUser(info.data.role, info.isAuthenticated, info.data); // set the user state at top level (this will all be changed to context or redux after i get everything working)
        history.push('/profile');
      } else {
        // set state for error
        setPopup({ msg: info.msg, color: 'red' });
        // after 3 seconds, 'remove' it (setting the state to null will mean it does not exist whiich means it wont conditionally render the component in the UI)
        setTimeout(() => setPopup(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main id="login__main-container">
      <form className="login__form" onSubmit={onFormSubmit}>
        {popup ? <MessagePopup msg={popup} style={{ width: '100%' }} /> : null}
        <h1 className="hero-text">Register</h1>
        <label htmlFor="user_name">Full Name</label>
        <input
          type="text"
          name="username"
          value={userName}
          id="user_name"
          onChange={onUsernameChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email_input"
          value={email}
          id="email"
          onChange={onEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password_input"
          value={password}
          id="password"
          onChange={onPasswordChange}
        />
        <input type="submit" value="Submit" id="submit_btn" />
      </form>
    </main>
  );
};

export default Register;
