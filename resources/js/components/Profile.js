import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },

  title: {
    color: '#FF4646',
  },
});

export default function Profile(props){
  const classes = useStyles();
  return (
    <React.Fragment>
      <h3 className={classes.title}>Profile</h3>
      <Typography color="textSecondary" className={classes.depositContext} aria-label = "First Name">
        First Name : {props.firstName}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext} aria-label = "Last Name">
        Last Name : {props.lastName}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext} aria-label = "Email">
        Email : {props.email}
      </Typography>
    </React.Fragment>
  );
}