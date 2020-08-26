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

function ReferalForm() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <h3 className={classes.title}>Referal Code</h3>
            <Form
                onSubmit={e => {
                   
                }}
            >
                <Form.Group controlId="formBasicText" className="mt-1">
                    <Form.Control
                        type="text"
                        placeholder="Put your referal code here..."
                        className="red-glow"
                        aria-label = "Referal Code"
                        onChange={e => setPasswordOld(e.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    aria-label = "Submit"
                    className={classes.submit}
                >
                    Submit Referal Code
                </Button>
            </Form>
        </React.Fragment>
    )
}

export default ReferalForm
