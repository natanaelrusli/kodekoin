import React, {useEffect} from "react";
import "./css/Home.css";
import ReactDOM from "react-dom";
import Navbar from "../components/TopNavbar";
import PriceList from "../components/PriceList";
import HomeImage from "../components/HomeImage";
import GameDesc from "../components/GameDescription";
import MediaQuery, { useMediaQuery } from "react-responsive";

const Home = props => {
    const login = localStorage.getItem("isLoggedIn");
    const createHistory = require("history").createBrowserHistory;
    let history = createHistory();

    useEffect(() => {
        if (!(login == "true")) {
            history.push("/login");
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
        }
    }, []);
    
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
