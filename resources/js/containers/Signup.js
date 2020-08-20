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
import { signUpHandler } from "../components/DataFunctions";

function Copyright() {
    return (
        <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            style={{ color: "white" }}
        >
            {"Copyright © "}
            Kode Koin
            {" " + new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        backgroundColor: "#222222 !important",
        width: "100%",
        "& label.Mui-focused": {
            color: "#FF4646"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#FF4646"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#FF4646"
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
    paper: {
        paddingTop: "7%",
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
    },
    submit: {
        backgroundColor: "#FF4646",
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

    return (
        <Container
            component="main"
            maxWidth="xs"
            className={classes.root}
            style={{ backgroundColor: "#222222" }}
        >
            <div className={classes.paper}>
                <img src={logo} width={80} className="mb-3"></img>
                <h1 className="signup-text">Sign Up</h1>
                <form
                    className={classes.form}
                    onSubmit={e =>
                        signUpHandler(e, name, email, password, phone, setmsg)
                    }
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
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
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="phone"
                                name="phone"
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                onChange={e => setphone(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    {/* <p style={{ color: 'white' }}>{msg}</p> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        style={{ backgroundColor: "#FF4646" }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/login" style={{ color: "#FF4646" }}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5} mb={5}>
                <Copyright />
            </Box>
        </Container>
    );
};
export default Signup;
if (document.getElementById("signup")) {
    ReactDOM.render(<Signup />, document.getElementById("signup"));
}
