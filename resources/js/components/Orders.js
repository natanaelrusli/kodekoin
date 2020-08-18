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
import Modal from "react-bootstrap/Modal";
import Moment from "moment";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { cancelOrder } from "./DataFunctions";

function preventDefault(event) {
    event.preventDefault();
}

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
   },
});

const DialogContent = makeStyles((theme) => ({
root: {
    padding: theme.spacing(2),
},
}))(MuiDialogContent);

const DialogActions = makeStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
}))(MuiDialogActions);

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
    const invoices = JSON.parse(localStorage.getItem("invoices"));

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [show, setShow] = useState(false);
    const [detailText, setdetailText] = useState({});
    const detailOrder = i => {
        setdetailText({
            desc: i.description,
            amn: "Amount : IDR " + i.amount,
            exp:
                "Expiry Date : " +
                Moment(i.expiry_date).format("D MMMM, YYYY H:mm"),
            stt: "Status : " + i.status
        });
    };

    return (
        <React.Fragment>
            {/* Order detail dialog */}
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography>
                        Order Details
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    {/* Put the details here */}
                    <p className="dialogText">
                        {'Invoice Line 1\nInvoice line 2\nInvoice line3'}
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant={"outline-danger"}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Notification Detail
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <img src={"../images/logoimg.png"} width={40}></img>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{detailText.desc}</Modal.Body>
                <Modal.Body>{detailText.amn}</Modal.Body>
                <Modal.Body>{detailText.stt}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}

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
                                    onClick={() => {
                                        detailOrder(inv);
                                        handleOpen();
                                    }}
                                    size="sm"
                                >
                                    Detail
                                </Button>
                                <a href={inv.invoice_url} target="_blank">
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
                                        // onClick={() => payOrder(inv.id)}
                                        size="sm"
                                    >
                                        Pay
                                    </Button>
                                </a>
                                <Button
                                    className="mx-1"
                                    variant={
                                        String(inv.status).includes(statusOrder)
                                            ? "outline-danger"
                                            : "secondary"
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
        </React.Fragment>
    );
}
