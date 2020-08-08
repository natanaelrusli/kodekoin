import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ReactDOM from "react-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import logo from "../images/logoimg.png";
import "./css/signup.css";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            Kode Koin
            {" " + new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const Signup = () => {
    const classes = useStyles();
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [msg, setmsg] = useState("");

    const onSubmitHandler = e => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/signup", {
                name: name,
                email: email,
                phone: phone,
                password: password
            })
            .then(response => {
                console.log(response);
                if (response.data.status === 200) {
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
            });
    };

    // useEffect(() => {
    //     console.log(msg);
    // }, [onSubmitHandler]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img src={logo} width={80} className="mb-3"></img>
                <h1 className="signup-text">Sign Up</h1>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={onSubmitHandler}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="phone"
                                name="phone"
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                autoFocus
                                onChange={e => setphone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                onChange={e => setname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={e => setemail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => setpassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <p>{msg}</p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};
export default Signup;
if (document.getElementById("signup")) {
    ReactDOM.render(<Signup />, document.getElementById("signup"));
}
