import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "react-bootstrap/Button";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  nameLabel: {
    fontSize: '20px',
  },

  title: {
    color: '#FF4646',
  },
});

export default function Profile(props){
  const classes = useStyles();
  return (
    <React.Fragment>
      <h3 className={classes.title}>Profil</h3>
      <Typography color="textPrimary" className={classes.nameLabel} aria-label = "Name">
        {props.firstName} {props.lastName} 
      </Typography>
      <Typography color="textSecondary" aria-label = "Email">
        {props.email}
      </Typography>
      <Typography color="textSecondary" aria-label = "Phone">
        {props.phone}
      </Typography>
    </React.Fragment>
  );
}