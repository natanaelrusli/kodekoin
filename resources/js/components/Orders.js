import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CurrencyFormat from "react-currency-format";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Moment from "moment";
import "./css/orders.css";
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
    const [status, setStatus] = useState('');

    const handleOpen = i => {
        setOpen(true);

        if (i.status == 'SETTLED') {
            setStatus('SETTLED');
        }
        else if (i.status == 'PENDING') {
            setStatus('PENDING');
        }
        else if (i.status == 'EXPIRED') {
            setStatus('EXPIRED');
        }
        console.log(status);

        // console.log(invoices);
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
                    <div className="row">
                        <div className="col-sm-7">
                            <p className='dialogText mb-1'>
                                {detailText}
                            </p>
                        </div>
                        <div className="col-sm-5">
                            {status == 'SETTLED' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd" className="statusIcon green"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm7 7.457l-9.005 9.565-4.995-5.865.761-.649 4.271 5.016 8.24-8.752.728.685z"/></svg>}
                            {status == 'PENDING' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="statusIcon yellow"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"/></svg>}
                            {status == 'EXPIRED' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="statusIcon red"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.31 7.526c-.099-.807.528-1.526 1.348-1.526.771 0 1.377.676 1.28 1.451l-.757 6.053c-.035.283-.276.496-.561.496s-.526-.213-.562-.496l-.748-5.978zm1.31 10.724c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mx-1 my-1" variant={"outline-danger"} onClick={handleClose}>Close</Button>
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
