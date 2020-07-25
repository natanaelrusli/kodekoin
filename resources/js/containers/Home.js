import React from "react";
import "./Home.css";
import ReactDOM from 'react-dom';
import Routes from "../Routes";
import Navbar from "../components/TopNavbar"
import PriceList from "../components/PriceList"
import HomeImage from "../components/HomeImage"
import Grid from '@material-ui/core/Grid';
import MediaQuery, { useMediaQuery } from 'react-responsive'

function Home() {
  return (
    <div className="Home">
      <Navbar></Navbar>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-sm-5 mt-3">
            <MediaQuery minDeviceWidth={1224}>
              <HomeImage></HomeImage>
            </MediaQuery>
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
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}