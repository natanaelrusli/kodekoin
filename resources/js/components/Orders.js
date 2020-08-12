import React, { useState } from 'react';
import './css/orders.css';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CurrencyFormat from 'react-currency-format';
import Button from 'react-bootstrap/Button';
import Title from './Title';

// Generate Order Data
function createData(id, date, product, paymentMethod, amount, cancelAble) {
  return { id, date, product, paymentMethod, amount, cancelAble};
}

const rows = [
  createData(0, '16 Mar, 2020', 'GOPAY', 'RF Gratis Main',125000, false),
];

function preventDefault(event) {
  event.preventDefault();
}
function cancelOrder(){
  alert("CANCEL ORDER");
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },

  title: {
    color: '#FF4646',
  },
}));

export default function Orders() {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <h3 className={classes.title}>Order History</h3>
      
      <Table size="small">
        
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Sale Amount</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell><CurrencyFormat value={row.amount} displayType={'text'} thousandSeparator={true} prefix={'IDR '} renderText={value => <div>{value}</div>} /></TableCell>
              <TableCell align="right">
                <Button 
                  variant={row.cancelAble == true ? "danger" : "secondary"} 
                  disabled={row.cancelAble == true ? false : true}
                  onClick={cancelOrder}
                  size="sm">Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}
    </React.Fragment>
  );
}