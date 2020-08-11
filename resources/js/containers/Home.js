import React, { useEffect } from "react";
import "./css/Home.css";
import ReactDOM from "react-dom";
import Navbar from "../components/TopNavbar";
import PriceList from "../components/PriceList";
import HomeImage from "../components/HomeImage";
import GameDesc from "../components/GameDescription";
import Grid from "@material-ui/core/Grid";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const Home = props => {
    const login = localStorage.getItem("isLoggedIn");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const invoices = JSON.parse(localStorage.getItem("invoices"));
    useEffect(() => {
        if (login == "true" && invoices == null) {
            axios
                .get(`http://localhost:8000/api/invhistory/${userData.email}`)
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem(
                            "invoices",
                            JSON.stringify(response.data)
                        );
                        console.log("success retrieve invoice");
                    }
                    // console.log(response);

                    if (response.data.status === "failed") {
                        console.log(response.data.message);
                    }
                })
                .catch(error => console.log(error));
        }
    }, []);
    return (
        <div
            className="Home"
            style={{ height: "100vh", backgroundColor: "#2E2E2E" }}
        >
            <Navbar></Navbar>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-5 mt-3">
                        <MediaQuery minDeviceWidth={600}>
                            <HomeImage></HomeImage>
                        </MediaQuery>
                        <GameDesc></GameDesc>
                    </div>
                    <div className="col-sm-7">
                        <div className="lander">
                            <PriceList></PriceList>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

if (document.getElementById("home")) {
    ReactDOM.render(<Home />, document.getElementById("home"));
}
