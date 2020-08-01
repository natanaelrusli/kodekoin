import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@material-ui/core/styles';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },

  title: {
    color: '#F88D4B',
  },

  submit: {
    backgroundColor: '#FFF',
    color: '#F88D4B',
    borderColor: '#F88D4B',
    "&:hover, &:focus": {
        backgroundColor: '#F88D4B',
        borderColor: '#F88D4B',
      },
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

export default function ChangePassword() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <h3 className={classes.title}>Change Password</h3>
      <Form>
        <Form.Group controlId="formBasicEmail" className="mt-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control type="password" placeholder="Current Password"/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="mt-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="New Password" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="mt-3">
            <Form.Label>Repeat New Password</Form.Label>
            <Form.Control type="password" placeholder="Repeat New Password" />
        </Form.Group>
        <Button variant="primary" type="submit" className={classes.submit}>
            Change Password
        </Button>
        </Form>
    </React.Fragment>
  );
}