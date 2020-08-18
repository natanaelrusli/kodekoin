import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import logo from "../images/logoimg.png";
import "./css/navstyle.css";
import { logoutHandler } from "./DataFunctions";

function NavbarComponent() {
    const useStyles = makeStyles(theme => ({
        nav: {
            boxShadow: "1px 3px 1px rgb(0,0,0,0.4)",
            backgroundColor: "#2E2E2E",
            borderColor: "#FF4646"
        },

        navbutton: {
            color: "#FFFFFF",
            "&:hover, &:focus": {
                color: "#FF4646"
            }
        }
    }));

    const classes = useStyles();
    const login = localStorage.getItem("isLoggedIn");

    return (
        <Navbar expand="sm" className={classes.nav}>
            <Navbar.Brand href="/">
                <img
                    src={logo}
                    width="40"
                    className="d-inline-block align-top"
                    alt="logo"
                ></img>
            </Navbar.Brand>
            <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="navbar-dark"
            />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* Only to push the other button to the right */}
                </Nav>
                {login ? (
                    <Nav className="mr-sm-2">
                        {/* showing name from session in here */}
                        {!window.location.href.includes("dashboard") ? (
                            <div>
                                <Button
                                    href="/dashboard"
                                    className={classes.navbutton}
                                >
                                    Profile
                                </Button>
                                <Button
                                    onClick={logout}
                                    className={classes.navbutton}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Button href="/" className={classes.navbutton}>
                                    Home
                                </Button>
                                <Button
                                    onClick={logoutHandler}
                                    className={classes.navbutton}
                                >
                                    Logout
                                </Button>
                            </div>
                        )}
                    </Nav>
                ) : (
                    <Nav className="mr-sm-2">
                        <Button href="/login" className={classes.navbutton}>
                            Login
                        </Button>
                        <Button href="/signup" className={classes.navbutton}>
                            Signup
                        </Button>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

class TopNavbar extends React.Component {
    render() {
        return <NavbarComponent></NavbarComponent>;
    }
}

export default TopNavbar;
