import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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