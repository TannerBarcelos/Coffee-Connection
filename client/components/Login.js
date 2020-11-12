import React, {useState} from "react";
import { useHistory } from "react-router"
import MessagePopup from "./MessagePopup";

function Login({setUser}) {
  let history = useHistory();
  // need to add useEffect hook for login error stuff (see errors in console on failed login)
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [popup, setPopup] = useState(null);  // holds error state
  function onChange(e) {
    setState({
      ...state, //carry over the old state as the following line only updates whatever target is so we NEED to override the state with the old state that was NOT changed
      [e.target.name]: e.target.value
    });
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      //prod: 'https://coffee-connection.herokuapp.com/auth/login'
      // dev: 'http://localhost:5000/auth/login'
      const result = await fetch('https://coffee-connection.herokuapp.com/auth/login', {
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password
        })
      });
      const info = await result.json();
      if(info.isAuthenticated) {
        setPopup({msg: info.msg+"!", color: 'green'});
        // simulates a load (will keep the logged in message above present for 1.5 seconds)
        setTimeout(() => {
          setUser(info.data.role, info.isAuthenticated, info.data); // set the user state at top level (this will all be changed to context or redux after i get everything working)
          history.push('/profile')
        }, 1500);
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
        <form className="login__form" onSubmit={onSubmit}>
          {popup ? (<MessagePopup msg={popup} style={{width: '100%'}}/>) : null}
          <h1 className="hero-text">Login</h1>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={onChange}
            id="email"
            minLength="11"
            maxLength="100"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            id="password"
            minLength="8"
            maxLength="25"
            required
          />
          <input type="submit" value="Submit" />
        </form>
      </main>
  );
}

export default Login;
