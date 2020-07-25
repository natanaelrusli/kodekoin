import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import './css/homeimage.css'

export default function HomeImage(){
    return(
        <div className="homeimage">
            <img src="../../images/BG.png"></img>
        </div>
    );
}