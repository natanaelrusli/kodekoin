import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ReactDOM from "react-dom";
import logo from "../images/logoimg.png";
import ForgotPassword from "../components/ForgotPassword";
import "./css/Login.css";
import { BrowserRouter, Redirect } from "react-router-dom";
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        backgroundColor: "#222222 !important",
        "& .MuiInput-underline:after": {
            borderBottomColor: "#FF4646"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#FF4646",
                color: "#FF4646"
            },
            "&:hover fieldset": {
                borderColor: "#FF4646"
            },
            "&.Mui-focused fieldset": {
                borderColor: "#FF4646"
            },
            "&.MuiButton-label": {
                color: "white"
            },
            "&.MuiTypography": {
                color: "white"
            }
        }
    },
    image: {
        backgroundImage: 'url("../../images/BG.png")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1)
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    formContainer: {
        backgroundColor: "#222222"
    },
    submit: {
        backgroundColor: theme.palette.grey[600],
        margin: theme.spacing(3, 0, 2)
    }
}));

const Login = e => {
    const [changeComponent, setChangeComponent] = useState(false);
    const classes = useStyles();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [msg, setmsg] = useState("");
    const [redirect, setredirect] = useState(false);
    const createHistory = require("history").createBrowserHistory;
    let history = createHistory();

    const triggerChangeComponent = () => {
        setChangeComponent(!changeComponent);
    }

    const changePassword = () => {
        console.log("Change Password");
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/login", {
                email: email,
                password: password
            })
            .then(response => {
                console.log(response);
                if (response.data.status === 200) {
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem(
                        "userData",
                        JSON.stringify(response.data.data)
                    );
                    setredirect(true);
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
    };

    const login = localStorage.getItem("isLoggedIn");
    if (redirect || login == "true") {
        history.push("/");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }

    return (
        <Grid container component="main" className={classes.root}>
            {changeComponent && <ForgotPassword changePassword = {changePassword} triggerChangeComponent = {triggerChangeComponent}></ForgotPassword>}
            {!changeComponent && <React.Fragment>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    className={classes.formContainer}
                >
                    <div className={classes.paper}>
                        <img src={logo} width={60}></img>
                        <form
                            className={classes.form}
                            onSubmit={onSubmitHandler}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={e => setemail(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                aria-required="true"
                                onChange={e => setpassword(e.target.value)}
                            />
                            {/* <p>{msg}</p> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: '#FF4646', }}
                                color="primary"
                                className={classes.submit}
                                className="submit"
                            >
                                Sign In
                            </Button>
                            <Grid container style={{marginTop: "10px"}}>
                                <Grid item xs>
                                    <Link  onClick={triggerChangeComponent} variant="body2" style={{ color: 'white', }} className="link">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2" style={{ color: 'white', }}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </React.Fragment>
            }
        </Grid>
    );
};

export default Login;
if (document.getElementById("login")) {
    ReactDOM.render(<Login />, document.getElementById("login"));
}
