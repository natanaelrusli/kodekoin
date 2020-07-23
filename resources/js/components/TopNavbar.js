import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
  import "./Navbar.css";

class TopNavbar extends React.Component{

    render(){
        return(
        <Navbar bg="dark" expand="lg" variant="dark">
            <div className="container">
                <Navbar.Brand href="/">Kode Koin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>

                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link eventKey={2} href="#">
                            Sign Up
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
        )  
    }
}

export default TopNavbar;