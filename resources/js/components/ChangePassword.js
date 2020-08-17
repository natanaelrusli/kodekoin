import React, { useState, useEffect } from "react";
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

const ChangePassword = () => {
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordConfNew, setPasswordConfNew] = useState("");
    const [message, setMessage] = useState("");
    const classes = useStyles();

    const passDB = ""; //password from database

    const changePassHandler = () => {
        if (passwordOld == passDb) {
            console.log("tahap 1 ok");
            if (passwordNew == passDB) {
                console.log("pass tidak boleh sama seperti sebelumnya");
                setMessage("pass tidak boleh sama seperti sebelumnya");
            } else {
                if (passwordNew == passwordConfNew) {
                    console.log("pass ok");
                    // call update function changepass
                    axios
                        .post("http://localhost:8000/api/resetpass", {
                            email: sessionStorage.data, //get email from session
                            password: passwordNew
                        })
                        .then(response => {
                            console.log(response);
                            if (response.data.status === 200) {
                                // setredirect(true);
                                // ganti password berhasil
                                setmsg(response.data.message);
                                console.log(response.data.message);
                                setTimeout(() => {
                                    setmsg("");
                                }, 5000);
                            }

                            if (response.data.status === "failed") {
                                setmsg(response.data.message);
                                console.log(response.data.message);
                                setTimeout(() => {
                                    setmsg("");
                                }, 5000);
                            }
                        })
                        .catch(error => console.log(error));
                } else {
                    console.log("pass tidak sama");
                    setMessage("pass tidak sama");
                }
            }
        } else {
            console.log("pass lama tidak sama");
            setMessage("pass lama tidak sama");
        }
    };

    return (
        <React.Fragment>
            <h3 className={classes.title}>Change Password</h3>
            <Form onSubmit={changePassHandler}>
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
