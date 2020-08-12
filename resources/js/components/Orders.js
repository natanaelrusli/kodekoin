import React, { useState } from "react";
import "./css/orders.css";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CurrencyFormat from "react-currency-format";
import Button from "react-bootstrap/Button";
import Title from "./Title";
import Moment from "moment";

// Generate Order Data
function createData(id, id_invoice, date, product, status, amount, clickAble) {
    return { id, id_invoice, date, product, status, amount, clickAble };
}

// const rows = [
//     createData(0, "16 Mar, 2020", "GOPAY", "RF Gratis Main", 125000, false)
// ];

function preventDefault(event) {
    event.preventDefault();
}
function cancelOrder(order) {
    alert(order.id_invoice);
}
function detailOrder(order) {
    alert(order.id_invoice);
}
function payOrder(order) {
    alert(order.id_invoice);
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
    const statusOrder = "PENDING";
    let order = [];
    const invoices = JSON.parse(localStorage.getItem("invoices"));
    let rows = [];
    console.log(invoices.length);
    for (let index = 0; index < invoices.length; index++) {
        rows.push(
            createData(
                invoices[index].id,
                invoices[index].id_invoice,
                invoices[index].created_at,
                invoices[index].description,
                invoices[index].status,
                invoices[index].amount,
                String(invoices[index].status).includes(statusOrder)
                    ? true
                    : false
            )
        );
    }
    // console.log(rows);
    // for (let index = 0; index < invoices.length; index++) {
    //     order.push(invoices[index]);
    // }

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
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>
                                {Moment(row.date).format("D MMMM, YYYY H:mm")}
                            </TableCell>
                            <TableCell>{row.product}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>
                                <CurrencyFormat
                                    value={row.amount}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"IDR "}
                                    renderText={value => <div>{value}</div>}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                    variant={"info"}
                                    onClick={() => detailOrder(row)}
                                    size="sm"
                                >
                                    Detail
                                </Button>
                                <Button
                                    variant={
                                        row.clickAble == true
                                            ? "success"
                                            : "secondary"
                                    }
                                    disabled={
                                        row.clickAble == true ? false : true
                                    }
                                    onClick={() => payOrder(row)}
                                    size="sm"
                                >
                                    Pay
                                </Button>
                                <Button
                                    variant={
                                        row.clickAble == true
                                            ? "danger"
                                            : "secondary"
                                    }
                                    disabled={
                                        row.clickAble == true ? false : true
                                    }
                                    onClick={() => cancelOrder(row)}
                                    size="sm"
                                >
                                    Cancel
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
