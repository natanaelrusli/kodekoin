import React, { Component } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

export default class App extends Component {
    render() {
        let navLink = (
            <div className="Tab">
                <NavLink
                    to="/login"
                    activeClassName="activeLink"
                    className="signIn"
                >
                    Login
                </NavLink>
                <NavLink
                    exact
                    to="/signup"
                    activeClassName="activeLink"
                    className="signUp"
                >
                    Sign Up
                </NavLink>
            </div>
        );
        const login = localStorage.getItem("isLoggedIn");

        return (
            <div className="App">
                {login ? (
                    <Router>
                        <Route exact path="/" component={Home}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/signup" component={Signup}></Route>
                    </Router>
                ) : (
                    <Router>
                        {/* {navLink} */}
                        <Route exact path="/" component={Home}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/signup" component={Signup}></Route>
                    </Router>
                )}
            </div>
        );
    }
}
if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
