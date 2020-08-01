import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
import { Navbar,Nav,NavDropdown,Form,FormControl } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import logo from '../images/logoimg.png';
import './css/navstyle.css';

function NavbarComponent() {
    const useStyles = makeStyles((theme) => ({
        navShadow: {
            boxShadow: "1px 3px 1px #bdbdbd",
        },
    }));
    
    const classes = useStyles();

    return(
        <Navbar bg="light" expand="sm" className={classes.navShadow}>
            <Navbar.Brand href="/">
            <img 
                src={logo}
                width="70"
                className="d-inline-block align-top"
                alt="logo">
            </img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* Only to push the other button to the right */}
                </Nav>
                <Nav className="mr-sm-2">
                    <Button href="/login" className="navbutton orange">Login</Button>
                    <Button href="/signup" className="navbutton orange">Signup</Button>
                    <Button href="/dashboard" className="navbutton orange">Profile</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

class TopNavbar extends React.Component{
    render(){
        return(
            <NavbarComponent></NavbarComponent>
        )  
    }
}

export default TopNavbar;