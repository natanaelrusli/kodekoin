import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PasswordIcon from '@material-ui/icons/VpnKey';
import ProfileIcon from '@material-ui/icons/Person';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ProfileIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Order History" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PasswordIcon />
      </ListItemIcon>
      <ListItemText primary="Change Password" />
    </ListItem>
  </div>
);