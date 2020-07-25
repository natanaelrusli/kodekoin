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

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function ImageSlider(){
  const classes = useStyles();
  return (
  <div className="container-fluid">
    <Grid item xs={12}>
      <Carousel className='mt-4'>
        <Carousel.Item>
          <img
            className="d-block"
            src="https://source.unsplash.com/random"
            alt="First slide"
          />
        </Carousel.Item>
        
        <Carousel.Item>
          <img
            className="d-block"
            src="https://source.unsplash.com/random"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src="https://source.unsplash.com/random"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </Grid>
  </div>
  );
}