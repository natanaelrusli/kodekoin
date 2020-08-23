import React, { useState, useEffect } from "react";
import "./css/orders.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CurrencyFormat from "react-currency-format";
import Button from "react-bootstrap/Button";
import Moment from "moment";
import Modal from "react-bootstrap/Modal";
import { cancelOrder } from "./DataFunctions";
import { method } from "lodash";

function preventDefault(event) {
    event.preventDefault();
}
const Orders = () => {
    const styles = theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(2)
        },
        closeButton: {
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        }
    });

    const useStyles = makeStyles(theme => ({
        seeMore: {
            marginTop: theme.spacing(3)
        },

        title: {
            color: "#FF4646"
        }
    }));

    const classes = useStyles();
    const statusOrder = "PENDING";
    const invoices = JSON.parse(localStorage.getItem("invoices"));

    const [open, setOpen] = useState(false);

    const handleOpen = i => {
        setOpen(true);
        console.log(invoices);
        detailOrder(i);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [show, setShow] = useState(false);
    const [detailText, setdetailText] = useState("");
    const detailOrder = i => {
        let methodshow = ""
        // Set the date we're counting down to
        let countDownDate = new Date(i.expiry_date).getTime();
        let now = new Date().getTime();
        let hours = 0
        let minutes = 0
        let seconds = 0
        let days = 0
        let countdowntime = i.expiry_date
        let distance = 0;

        var interval = setInterval(() => {
            distance = countDownDate - now;
        }, 1000);

        if (i.retail != null) {
            methodshow = i.retail
        }
        else if (i.bank != null) {
            methodshow = i.bank
        }
        else if (i.ewallet != null) {
            methodshow = i.ewallet
        }
        
        setdetailText(
            i.description +
            `\n` + "Payment method : " + methodshow +
            `\nAmount : IDR ` + new Intl.NumberFormat().format(i.amount) +
            "\nExpiry Date : " +
                Moment(i.expiry_date).format("D MMMM, YYYY H:mm") +
            "\nStatus : " + i.status
        );
    };

    return (
        <div>
            {/* Order detail dialog */}
            <Modal show={open} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header><strong>Order Detail</strong></Modal.Header>
                <Modal.Body>
                    <p className='dialogText mb-1'>
                        {detailText}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mx-1 my-1" variant={"danger"} onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            
            <h3 className={classes.title}>Order History</h3>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Date</strong></TableCell>
                        <TableCell><strong>Product</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Sale Amount</strong></TableCell>
                        <TableCell align="right"><strong>Action</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map(inv => (
                        <TableRow key={inv.id} hover={true}>
                            <TableCell className="dateColumn">
                                {Moment(inv.created_at).format(
                                    "D MMMM, YYYY H:mm"
                                )}
                            </TableCell>
                            
                            <TableCell className="productColumn">
                                {inv.description}
                            </TableCell>

                            <TableCell>
                                {inv.status}
                            </TableCell>

                            <TableCell className="amountColumn">
                                <CurrencyFormat
                                    value={inv.amount}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"IDR "}
                                    renderText={value => <div>{value}</div>}
                                />
                            </TableCell>
                            
                            <TableCell align="right" className="actionColumn">
                                <Button
                                    className="mx-1 actionButton"
                                    variant={"outline-info"}
                                    onClick={() => {
                                        handleOpen(inv);
                                    }}
                                    size="sm"
                                >
                                    Detail
                                </Button>
                                <a href={inv.invoice_url} target="_blank">
                                    <Button
                                        className="mx-1 actionButton"
                                        variant={
                                            String(inv.status).includes(
                                                statusOrder
                                            )
                                                ? "outline-success"
                                                : "outline-secondary"
                                        }
                                        disabled={
                                            String(inv.status).includes(
                                                statusOrder
                                            )
                                                ? false
                                                : true
                                        }
                                        // onClick={() => payOrder(inv.id)}
                                        size="sm"
                                    >
                                        Pay
                                    </Button>
                                </a>
                                <Button
                                    className="mx-1 actionButton"
                                    variant={
                                        String(inv.status).includes(statusOrder)
                                            ? "outline-danger"
                                            : "outline-secondary"
                                    }
                                    disabled={
                                        String(inv.status).includes(statusOrder)
                                            ? false
                                            : true
                                    }
                                    onClick={() => cancelOrder(inv.id_invoice)}
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
        </div>
    );
};
export default Orders;
