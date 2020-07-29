import React from 'react';
import './css/gamedescription.css'
import './css/pricelist.css'
import Card from '@material-ui/core/Card';
import GameLogo from "../images/gratismain.png"

export default function HomeImage(){
    return(
        <Card className="mt-3 p-3 shadow">
            <div className="row">
                <div className="col-sm-5">
                    <img src={GameLogo} className="gamelogo"></img>
                </div>
                <div className="col-sm-7">
                    <h1 className="gametitle">RF Online GratisMain</h1>
                </div>
            </div>
            <div className="gamedetails">

            </div>
        </Card>  
    );
}