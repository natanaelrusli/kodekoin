import React from "react";
import "./Home.css";
import ReactDOM from 'react-dom';
import Routes from "../Routes";
import Navbar from "../components/TopNavbar"
import ImageSlider from "../components/ImageSlider"
import Grid from '@material-ui/core/Grid';
import MediaQuery, { useMediaQuery } from 'react-responsive'

function Home() {
  return (
    <div className="Home">
      <Navbar></Navbar>
      <div className="row">
        <div className="col-sm-6">
          <MediaQuery minDeviceWidth={1224}>
            <ImageSlider></ImageSlider>
          </MediaQuery>
        </div>
        <div className="col-sm-6">
          <div className="lander">
            <h1>Kode Koin</h1>
            <p>Something bijak and cool text here</p>
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