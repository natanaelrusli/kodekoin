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
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import ReactDOM from "react-dom";
import logo from "../images/logoimg.png";
import ForgotPassword from "../components/ForgotPassword";
import "./css/Login.css";
import { loginHandler } from "../components/DataFunctions";

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

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
  zindex: 1;
  transition : 1s ease-in;
`;

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
    const [loading, setLoading] = useState(false);
    const [changeComponent, setChangeComponent] = useState(false);
    const classes = useStyles();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [msg, setmsg] = useState("");
    const [redirect, setredirect] = useState(false);
    const [erruser, setErruser] = useState(false);
    const [errpass, setErrpass] = useState(false);
    const createHistory = require("history").createBrowserHistory;
    let history = createHistory();

    const triggerChangeComponent = () => {
        setChangeComponent(!changeComponent);
    };

    const changePassword = () => {
        console.log("Change Password");
    };

    const login = localStorage.getItem("isLoggedIn");

    if (redirect || login == "true") {
        setLoading(false);
        history.push("/");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }

    if ( msg == 'Unable to login. Incorrect password.' ) {
        setLoading(false);
        setmsg('');
        setErrpass(true);
    }

    if ( msg == "Unable to login. Email doesn't exist." ) {
        setLoading(false);
        setmsg('');
        setErruser(true);
    }

    return (
        <Grid container component="main" className={classes.root}>
            {changeComponent && (
                <ForgotPassword
                    changePassword={changePassword}
                    triggerChangeComponent={triggerChangeComponent}
                ></ForgotPassword>
            )}
            {!changeComponent && (
                <React.Fragment>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        className={classes.image}
                    />
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
                                onSubmit={e =>
                                    loginHandler(
                                        e,
                                        email,
                                        password,
                                        setmsg,
                                        setredirect
                                    )
                                }
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

                                { erruser && <p className="errorText mb-1">User doesn't exists</p> }

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

                                { errpass && <p className="errorText mb-1">Incorrect Password</p> }
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    style={{ backgroundColor: "#FF4646", marginTop: "10px", marginBottom: "2px" }}
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => {setLoading(true); setErruser(false); setErrpass(false)}}
                                    className="submit"
                                >
                                    {email.length > 0 && password.length > 0 &&  loading == true ?
                                        <PulseLoader
                                            css={override}
                                            size={10}
                                            color={"white"}
                                            loading={loading}
                                        />
                                        :
                                        <Typography>
                                            Login
                                        </Typography>
                                    }
                                </Button>
                                <Grid container style={{ marginTop: "10px" }}>
                                    <Grid item xs>
                                        <Link
                                            onClick={triggerChangeComponent}
                                            href="#"
                                            variant="body2"
                                            style={{ color: "white" }}
                                        >
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link
                                            href="/signup"
                                            variant="body2"
                                            style={{ color: "white" }}
                                        >
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Grid>
                </React.Fragment>
            )}
        </Grid>
    );
};

export default Login;
if (document.getElementById("login")) {
    ReactDOM.render(<Login />, document.getElementById("login"));
}
