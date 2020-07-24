import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
import { Navbar,Nav,NavDropdown,Form,FormControl } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import "./Navbar.css";

function NavbarComponent() {
    const useStyles = makeStyles((theme) => ({
        
        navShadow: {
            boxShadow: "1px 3px 1px #bdbdbd",
        },
    }));
    
    const classes = useStyles();

    return(
        <Navbar bg="light" expand="sm" className={classes.navShadow}>
            <Navbar.Brand href="/">Kode Koin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* Only to push the other button to the right */}
                </Nav>
                <Nav className="mr-sm-2">
                    <Button variant="outline-success" href="/login">Login</Button>
                    <Button variant="outline-success" href="/signup">Signup</Button>
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