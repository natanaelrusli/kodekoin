import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import ReactDOM from 'react-dom';
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      console.log("LOGIN")
    }
  
    return (
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" size="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" size="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block size="large" disabled={!validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}