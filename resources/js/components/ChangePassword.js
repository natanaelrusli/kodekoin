import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./css/component.css";
import { changePassHandler, passFromDB } from "./DataFunctions";

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

const ChangePassword = () => {
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordConfNew, setPasswordConfNew] = useState("");
    const [message, setMessage] = useState("");
    const classes = useStyles();

    return (
        <React.Fragment>
            <h3 className={classes.title}>Change Password</h3>
            <Form
                onSubmit={e => {
                    preventDefault(e);
                    changePassHandler(
                        passwordOld,
                        passwordNew,
                        passwordConfNew,
                        setMessage
                    );
                }}
            >
                <Form.Group controlId="formBasicEmail" className="mt-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Current Password"
                        className="red-glow"
                        onChange={e => setPasswordOld(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mt-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="New Password"
                        className="red-glow"
                        onChange={e => setPasswordNew(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mt-3">
                    <Form.Label>Repeat New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repeat New Password"
                        className="red-glow"
                        onChange={e => setPasswordConfNew(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className={classes.submit}
                >
                    Change Password
                </Button>
            </Form>
        </React.Fragment>
    );
};

export default ChangePassword;
