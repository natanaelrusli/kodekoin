import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./css/component.css";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    depositContext: {
        flex: 1
    },

    title: {
        color: "#FF4646"
    },

    submit: {
        backgroundColor: "#FFF",
        color: "#FF4646",
        borderColor: "#FF4646",
        "&:hover, &:focus": {
            backgroundColor: "#FF4646",
            borderColor: "#FF4646"
        }
    },

    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    }
}));

function EditProfile({firstname, lastname, email, phone}) {
    const classes = useStyles();

    return (
        <div>
            <React.Fragment>
            <h3 className={classes.title}>Edit Profile</h3>
            <Form
                onSubmit={e => {
                    preventDefault(e);
                }}
            >
                <Form.Group controlId="formBasicFName" className="mt-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        className="red-glow"
                        aria-label = "First Name"
                        defaultValue = {firstname}
                        // onChange={e => setPasswordOld(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicLName" className="mt-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        className="red-glow"
                        aria-label = "Last Name"
                        defaultValue = {lastname}
                        // onChange={e => setPasswordOld(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mt-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="E-mail"
                        className="red-glow"
                        aria-label = "E-Mail"
                        defaultValue = {email}
                        // onChange={e => setPasswordNew(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPhone" className="mt-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Phone Number"
                        className="red-glow"
                        aria-label = "Phone Number"
                        defaultValue = {phone}
                        // onChange={e => setPasswordNew(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    aria-label = "Submit"
                    className={classes.submit}
                >
                    Update Profile
                </Button>
            </Form>
        </React.Fragment>
        </div>
    )
}

export default EditProfile
