import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CurrencyFormat from "react-currency-format";
import Title from "./Title";
import Moment from "moment";

// Generate Order Data
function createData(id, date, product, paymentMethod, amount) {
    return { id, date, product, paymentMethod, amount };
}

const rows = [createData(0, "16 Mar, 2020", "GOPAY", "RF Gratis Main", 125000)];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3)
    },

    title: {
        color: "#FF4646"
    }
}));

const Orders = () => {
    const classes = useStyles();
    let order = [];

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
                        <TableCell align="right">Sale Amount</TableCell>
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
export default Orders;
