import React from "react";
import "./Home.css";
import ReactDOM from 'react-dom';
import Routes from "../Routes";
import Navbar from "../components/TopNavbar"

function Home() {
  return (
    <div className="Home">
      <Navbar></Navbar>
      <div className="lander">
        <h1>Kode Koin</h1>
        <p>Something bijak and cool text here</p>
      </div>
    </div>
  );
}


export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}