import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { css } from "@emotion/core";
import Container from "@material-ui/core/Container";
import ReactDOM from "react-dom";
import PulseLoader from "react-spinners/PulseLoader";
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
        margin: theme.spacing(2, 0, 2)
    },
    submit: {
        backgroundColor: "#FF4646",
        margin: theme.spacing(3, 0, 2)
    }
}));

const Signup = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [erremail, setErremail] = useState(false);
    const [emailFormErr, setEmailFormErr] = useState(false);
    const [errpass, setErrpass] = useState(false);
    const [errphone, setErrphone] = useState(false);
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [msg, setMsg] = useState("");

    if ( msg == 'Whoops! email already registered') {
        setErremail(true);
        setLoading(false);
        setMsg('');
    }

    if ( msg == 'Email error') {
        setEmailFormErr(true);
        setLoading(false);
        setMsg('');
    }

    if ( msg == 'Password error' ) {
        setErrpass(true);
        setLoading(false);
        setMsg('');
    }

    if ( msg == 'Phone duplicate' ) {
        setErrphone(true);
        setLoading(false);
        setMsg('');
    }

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
                    onSubmit={e =>{
                        setLoading(true);
                        setErremail(false);
                        setErrpass(false);
                        setEmailFormErr(false);
                        setErrphone(false);
                        signUpHandler(e, name, email, password, phone, setMsg);
                        }
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
                                aria-label = "Name"
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
                                aria-label = "Email"
                                onChange={e => setemail(e.target.value)}
                            />
                            { erremail && <p className="errorText mb-1">Email already registered</p> }
                            { emailFormErr && <p className="errorText mb-1">Invalid Email</p> }

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
                                aria-label = "Password"
                                onChange={e => setpassword(e.target.value)}
                            />
                            { errpass && <p className="errorText mb-1">Password minimum 8 characters</p> }

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="phone"
                                type="number"
                                name="phone"
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                aria-label = "Phone"
                                onChange={e => setphone(e.target.value)}
                            />
                            { errphone && <p className="errorText mb-1">Phone number already registered</p> }
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
                        aria-label = "Signup"
                        onClick={ ()=>{
                            
                        } }
                    >
                         {erremail == false && errpass == false && emailFormErr == false && phone.length > 0 && loading == true ?
                            <PulseLoader
                                css={override}
                                size={10}
                                color={"white"}
                                loading={loading}
                            />
                            :
                            <Typography>
                                REGISTER
                            </Typography>
                        } 
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/login" style={{ color: "#FF4646" }} aria-label = "Login Link">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};
export default Signup;
if (document.getElementById("signup")) {
    ReactDOM.render(<Signup />, document.getElementById("signup"));
}
