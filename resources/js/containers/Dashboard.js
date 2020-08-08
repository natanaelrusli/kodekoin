import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {mainListItems} from '../components/ProfileListItems';
import { spacing } from '@material-ui/system';
import Orders from '../components/Orders';
import Profile from '../components/Profile';
import ChangePassword from '../components/ChangePassword';
import './css/navstyle.css';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Kode Koin '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
    flexGrow: 1,
  },
  drawerPaper: {
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
    backgroundColor: '#F7F7F7',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectMenu, setselectMenu] = useState("profile");

  console.log(users)

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const chooseMenu = (item) => {
      setselectMenu(item);
  }

  useEffect(() => {
    setUsers([
        {
          firstName: 'Nata',
          lastName: 'Nael',
          email: 'natanael@kodingnext.com'
        },
    ]),

    setOrders([
      {
        date: '20 Juli 2020',
        ammount: 20000,
      }
    ])
  }, [])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root} style={{ backgroundColor:'#222222' }}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} style={{ background: '#2E2E2E', color: '#FF4646'}}>
        <Toolbar className={classes.toolbar}>
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton> */}
          {users.map(user =>(
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Hi, {user.firstName}!
            </Typography>
          ))}

          <Button color="inherit" href="/" style={{color: 'white'}} className="navbutton">Home</Button>
          <Button color="inherit" style={{color: 'white'}} className="navbutton">Logout</Button>
        </Toolbar>
      </AppBar>
      
      {/* <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
            {mainListItems}
        </List>
      </Drawer> */}
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>

            {/* Recent Deposits */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                {users.map(user =>(
                  <Profile firstName = {user.firstName} lastName = {user.lastName} email = {user.email}/>
                ))
                }
              </Paper>
            </Grid>

          {/* Recent Orders */}
          <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ChangePassword/>
              </Paper>
          </Grid>

            {/* Change Password */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {orders.map(order =>(
                  <Orders name={order.date} ammount={order.ammount}/>
                ))
                }
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

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}