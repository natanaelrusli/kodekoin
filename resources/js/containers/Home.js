import React from "react";
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
import x from "../xendit";
import QRCode from "qrcode";

const Home = props => {
    $(function() {
        var canvas = document.getElementById("canvas");
        QRCode.toCanvas(
            canvas,
            "00020101021226660014ID.LINKAJA.WWW011893600911002411480002152004230411480010303UME51450015ID.OR.GPNQR.WWW02150000000000000000303UME520454995802ID5920Placeholder merchant6007Jakarta610612345662380115sktn1AhOrHASFVk0715sktn1AhOrHASFVk53033605405100006304A3F7",
            function(error) {
                if (error) console.error(error);
                console.log("success!");
            }
        );
    });
    return (
        <div
            className="Home"
            style={{ height: "100%", backgroundColor: "#2E2E2E" }}
        >
            <Navbar></Navbar>
            <div className="container-fluid">
                <div className="row" style={{ height: "100%" }}>
                    <div className="col-md-5 mt-3">
                        <MediaQuery minDeviceWidth={600}>
                            <HomeImage></HomeImage>
                        </MediaQuery>
                        <GameDesc></GameDesc>
                    </div>
                    <div className="col-md-7">
                        <div className="lander">
                            <canvas id="canvas"></canvas>
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
