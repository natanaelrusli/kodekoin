import React, { useState, useEffect } from "react";
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
import { getInvoiceByEmail, cancelOrder, updateInvoice } from "./DataFunctions";

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

export default function Orders() {
    const classes = useStyles();
    const statusOrder = "PENDING";
    const user = JSON.parse(localStorage.getItem("userData"));
    let invoices = JSON.parse(localStorage.getItem("invoices"));
    const [loadingData, setLoadingData] = useState(true);
    const [proccess, setProccess] = useState(true);

    if (proccess) {
        updateInvoice(invoices);
        console.log("useeeffffff");
        getInvoiceByEmail(user.email, setLoadingData);
        invoices = JSON.parse(localStorage.getItem("invoices"));
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
                {loadingData ? (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan="5" align="center">
                                Fetching data {/* Loading component here*/}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {invoices.map(inv => (
                            <TableRow key={inv.id}>
                                <TableCell>
                                    {Moment(inv.created_at).format(
                                        "D MMMM, YYYY H:mm"
                                    )}
                                </TableCell>
                                <TableCell>{inv.description}</TableCell>
                                <TableCell>{inv.status}</TableCell>
                                <TableCell>
                                    <CurrencyFormat
                                        value={inv.amount}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"IDR "}
                                        renderText={value => <div>{value}</div>}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        className="mx-1"
                                        variant={"outline-info"}
                                        onClick={() => detailOrder(row)}
                                        size="sm"
                                    >
                                        Detail
                                    </Button>
                                    <Button
                                        className="mx-1"
                                        variant={
                                            String(inv.status).includes(
                                                statusOrder
                                            )
                                                ? "outline-success"
                                                : "secondary"
                                        }
                                        disabled={
                                            String(inv.status).includes(
                                                statusOrder
                                            )
                                                ? false
                                                : true
                                        }
                                        onClick={() => payOrder(row)}
                                        size="sm"
                                    >
                                        Pay
                                    </Button>
                                    <Button
                                        className="mx-1"
                                        variant={
                                            String(inv.status).includes(
                                                statusOrder
                                            )
                                                ? "outline-danger"
                                                : "secondary"
                                        }
                                        disabled={
                                            String(inv.status).includes(
                                                statusOrder
                                            )
                                                ? false
                                                : true
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
                )}
            </Table>
            {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}
        </React.Fragment>
    );
}
