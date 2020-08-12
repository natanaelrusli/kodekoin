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
import Moment from "moment";

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

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3)
    },

    title: {
        color: "#FF4646"
    }
}));

export default function Orders() {
    const classes = useStyles();
    
    const Orders = () => {
      const classes = useStyles();
      let order = [];
    }

    const invoices = JSON.parse(localStorage.getItem("invoices"));

    for (let index = 0; index < invoices.length; index++) {
        order.push(invoices[index]);
    }

    return (
        <React.Fragment>
            <h3 className={classes.title}>Order History</h3>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Sale Ammount</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {order.map(ord => (
                        <TableRow key={ord.id}>
                            <TableCell>
                                {Moment(ord.created_at).format(
                                    "D MMMM, YYYY H:mm"
                                )}
                            </TableCell>
                            <TableCell>{ord.description}</TableCell>
                            <TableCell>{ord.status}</TableCell>
                            <TableCell align="right">
                                <CurrencyFormat
                                    value={ord.amount}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"IDR "}
                                    renderText={value => <div>{value}</div>}
                                />
                            </TableCell>
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
};