import React, { useState, useEffect } from "react";
import clsx from "clsx";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import Orders from "../components/Orders";
import Profile from "../components/Profile";
import ChangePassword from "../components/ChangePassword";
import Navbar from "../components/TopNavbar";
import { updateInvoice } from "../components/DataFunctions";
function Copyright() {
    return (
        <Typography variant="body2" style={{ color: "white" }} align="center">
            {"Copyright © Kode Koin "}
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

const drawerWidth = 230;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: 1,
        backgroundColor: "black",
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 1
    },
    titleOrder: {
        color: "#FF4646"
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9)
        }
    },
    content: {
        flexGrow: 1,
        backgroundColor: "#222222"
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        backgroundColor: "#f2f2f2 !important"
    },
    fixedHeight: {
        height: 240
    },
    loadingAnimation: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const login = localStorage.getItem("isLoggedIn");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const invoices = JSON.parse(localStorage.getItem("invoices"));
    const [loading, setLoading] = useState(true);
    // console.log(userData);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const chooseMenu = item => {
        setselectMenu(item);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const createHistory = require("history").createBrowserHistory;
    let history = createHistory();

    useEffect(() => {
        if (!(login == "true")) {
            history.push("/login");
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
        } else {
            updateInvoice(invoices, userData.email, setLoading);
            setUsers([
                {
                    firstName:
                        userData != null ? userData.first_name : "Testing",
                    lastName: userData != null ? userData.last_name : "Test",
                    email:
                        userData != null ? userData.email : "Testing@test.com"
                }
            ]);
        }
    }, []);

    return (
        <div className={classes.root}>
            <Navbar></Navbar>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={classes.paper}>
                                {users.map(user => (
                                    <Profile
                                        firstName={user.firstName}
                                        lastName={user.lastName}
                                        email={user.email}
                                    />
                                ))}
                            </Paper>
                        </Grid>

                        {/* Change Password */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <ChangePassword />
                            </Paper>
                        </Grid>

                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {loading ? (
                                    <div>
                                        <h3 className={classes.titleOrder}>
                                            Order History
                                        </h3>
                                        <div className={classes.loadingAnimation}>
                                            <PulseLoader
                                                css={override}
                                                size={10}
                                                color={"#FF4646"}
                                                loading={loading}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <Orders />
                                )}
                            </Paper>
                        </Grid>
                    </Grid>

                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}

if (document.getElementById("dashboard")) {
    ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
}
