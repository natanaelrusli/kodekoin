import React from 'react'
import { Button, TextField, Paper, Grid, Link } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import logo from "../images/logoimg.png";
import './css/forgotPassword.css'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#222222 !important",
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FF4646',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#FF4646',
                color: '#FF4646',
            },
            '&:hover fieldset': {
                borderColor: '#FF4646',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FF4646',
            },
            '&.MuiButton-label': {
                color: 'white',
            },
            '&.MuiTypography' : {
                color: "white",
            }
          },
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
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
    },
    formContainer: {
        backgroundColor: "#222222",
    },
    submit: {
        backgroundColor: theme.palette.grey[600],
        margin: theme.spacing(3, 0, 2),
    }
}));

function ForgotPassword({changePassword, triggerChangeComponent}) {
    const classes = useStyles();
    const func = () => {
        console.log(changeComponent);
        setChangeComponent(false);
    }

    return (
        <div className={classes.root}>
            <Grid   
                container 
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <div className={classes.paper}>
                    <img src={logo} width={60}></img>
                    <h1 className="header__text">Setel Ulang Sandi</h1>
                    <span className="header__subtitle">Lupa password? Masukan alamat email yang telah kamu daftar</span>
                    <form
                        className={classes.form}
                        // onSubmit={onSubmitHandler}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Alamat Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setemail(e.target.value)}
                            aria-label = "Email Address"
                        />
                        {/* <p>{msg}</p> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: '#FF4646' }}
                            color="primary"
                            className={classes.submit}
                            className="submit"
                            aria-label = "Masukan"
                            onClick = {changePassword}
                        >
                            Masukan
                        </Button>
                        <Grid container style={{marginTop: "10px"}}>
                            <Grid item xs>
                                <Link  onClick={triggerChangeComponent} variant="body2" style={{ color: 'white' }} className="link">
                                    Kembali
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </div>
        )
    }

export default ForgotPassword
