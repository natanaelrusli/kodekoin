import React, { useState, useEffect } from "react";
import clsx from "clsx";
import ReactDOM from "react-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from "@material-ui/core/Button";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LockIcon from '@material-ui/icons/Lock';
import PaymentIcon from '@material-ui/icons/Payment';

import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

import Orders from "../components/Orders";
import Profile from "../components/Profile";
import ChangePassword from "../components/ChangePassword";
import Binding from "../components/BindingAccount";
import ReferalForm from "../components/ReferalForm";
import EditProfile from "../components/EditProfile";
import { updateInvoice } from "../components/DataFunctions";
import { logoutHandler } from "../components/DataFunctions";
import './css/navstyle.css';
import '../components/css/listitems.css'

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
        display: 'flex',
        backgroundColor: '#2E2E2E',
      },
      toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        backgroundColor: '#2E2E2E',
      },
      toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        marginTop: '-2px',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      menuButtonHidden: {
        display: 'none',
      },
      title: {
        marginLeft: '0px',
        flexGrow: 1,
      },
      drawerPaper: {
        backgroundColor: '#2E2E2E',
        zIndex: '1',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      },
      appBarSpacer: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      },
      container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: 240,
      },
      navbutton: {
          color: 'white',
      },
      loadingAnimation: {
          display: 'flex',
          justifyContent: 'center'
      }
    }));

export default function Dashboard() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const login = localStorage.getItem("isLoggedIn");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const invoices = JSON.parse(localStorage.getItem("invoices"));
    const [loading, setLoading] = useState(true);
    const [menuSelect, setMenuSelect] = useState('dashboard');

    const [opensidebar, setOpensidebar] = useState(false);

    const handleDrawerOpen = () => {
        setOpensidebar(true);
    };
    const handleDrawerClose = () => {
        setOpensidebar(false);
    };

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
                        userData != null ? userData.email : "Testing@test.com",
                    phone:
                        userData != null ? userData.phone : "Testing@test.com"
                }
            ]);
        }
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, opensidebar && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, opensidebar && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                    {users.map(user => (
                        <Typography key={user.email} component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Hi, {user.firstName}!
                        </Typography>
                    ))}
                <Button href="/" className='navbutton'>
                    Home
                </Button>
                <Button
                    onClick={logoutHandler}
                    className='navbutton'
                    >
                    Logout
                </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                classes={{
                paper: clsx(classes.drawerPaper, !opensidebar && classes.drawerPaperClose),
                }}
                open={opensidebar}
            >
                <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon style={{ color : 'white' }}/>
                </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={()=>{setMenuSelect('dashboard'); setOpensidebar(false)}}>
                        <ListItemIcon>
                            <DashboardIcon className='white'/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" className='white' />
                    </ListItem>
                    {/* <ListItem button onClick={()=>setMenuSelect('orders')}>
                        <ListItemIcon>
                            <ShoppingCartIcon className='white' />
                        </ListItemIcon>
                        <ListItemText primary="Orders" className='white'/>
                    </ListItem> */}
                    <ListItem button onClick={()=>{setMenuSelect('editprofile'); setOpensidebar(false)}}>
                        <ListItemIcon>
                            <LockIcon className='white'/>
                        </ListItemIcon>
                        <ListItemText primary="Edit Profile" className='white'/>
                    </ListItem>
                    <ListItem button onClick={()=>{setMenuSelect('referal'); setOpensidebar(false)}}>
                        <ListItemIcon>
                            <PaymentIcon className='white'/>
                        </ListItemIcon>
                        <ListItemText primary="Referal Code" className='white' />
                    </ListItem>
                </List>
            </Drawer>

            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Profile */}
                            {
                                menuSelect == 'dashboard' &&
                                <React.Fragment>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Paper className={classes.paper}>
                                            {users.map(user => (
                                                <Profile
                                                    key={user.email}
                                                    firstName={user.firstName}
                                                    lastName={user.lastName}
                                                    email={user.email}
                                                    phone={user.phone}
                                                />
                                            ))}
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6}>
                                        <Paper className={classes.paper}>
                                            <Binding/>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} md={12} lg={12}>
                                        <Paper className={classes.paper} style={{ marginTop: '5px' }}>
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
                                </React.Fragment>
                            }
                            
                            {/* Change Password */}
                            {
                                menuSelect == 'editprofile' &&
                                <Grid item xs={12}>
                                        <Paper className={classes.paper}>
                                            {users.map(user => (
                                                <EditProfile key={user.email} firstname = {user.firstName} lastname = {user.lastName} email = {user.email} phone={user.phone}/>
                                            ))}
                                        </Paper>
                                    <Paper className={classes.paper} style={{ marginTop: '20px' }}>
                                        <ChangePassword />
                                    </Paper>
                                </Grid>
                            }


                            {/* Referal Code */}
                            {
                                menuSelect == 'referal' &&
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <ReferalForm />
                                    </Paper>
                                </Grid>
                            }
                        </Grid>
                    </Container>
                </main>
        </div>
    );
}

if (document.getElementById("dashboard")) {
    ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
}
