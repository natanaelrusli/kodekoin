import React from "react";
import "./Home.css";
import ReactDOM from 'react-dom';
import Routes from "../Routes";

function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Kode Koin</h1>
        <p>Some bijak and cool text here</p>
      </div>
    </div>
  );
}


export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}