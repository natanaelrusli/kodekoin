import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./css/pricelist.css";
import BcaLogo from "../images/bca-logo.png";
import GopayLogo from "../images/gopay-logo.png";
import OvoLogo from "../images/ovo-logo.png";
import DanaLogo from "../images/dana-logo.png";
import logo from "../images/logoimg.png";
import x from "../xendit";

const PriceList = () => {
    //Items is for list of denom shown in the page
    const [items, setItems] = useState([
        10000,
        25000,
        45000,
        75000,
        125000,
        225000,
        375000,
        495000
    ]);
    
    //To store the price chosen by user
    const [price, setPrice] = useState(false);
    //To store payment method chosen by the user
    const [method, setMethod] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const login = localStorage.getItem("isLoggedIn");
    const userData = JSON.parse(localStorage.getItem("userData"));

    const { Invoice } = x;
    const i = new Invoice({});

    function sendPayment() {
        //Sending payment data to back end
        alert("Send Payment " + method + " " + price);

        (async function() {
            try {
                let invoice = await i.createInvoice({
                    externalID:
                        Date.now().toString() + "+" + userData.first_name,
                    payerEmail: userData.email,
                    description: "RF Cash",
                    amount: price
                });
                console.log(Date.now().toString());
                axios
                    .post("http://localhost:8000/api/invoice", {
                        id_invoice: invoice.id,
                        id_user: invoice.user_id,
                        external_id: invoice.external_id,
                        email: invoice.payer_email,
                        amount: invoice.amount,
                        status: invoice.status,
                        description: invoice.description,
                        invoice_url: invoice.invoice_url,
                        expiry_date: invoice.expiry_date
                    })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => console.log(error));
                console.log("created invoice", invoice);
            } catch (e) {
                console.error(e);
            }
        })().catch(e => {
            console.error(e);
        });

        // Reset all states after sending data to back end
        setMethod(false);
        setPrice(false);
    }
    useEffect(() => {}, []);

    return (
        <div>
            {/* Notification Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <img src={logo} width="40"></img>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Silahkan pilih denominasi dan metode pembayaran terlebih
                    dahulu
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Notification Login */}
            <Modal
                show={showLogin}
                onHide={handleCloseLogin}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <img src={logo} width="40"></img>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Silahkan Login terlebih dahulu</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogin}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Denom card */}
            <Card className="p-3 mb-5 shadow dark-grey-bg">
                <div className="denom-header">
                    <h1>Pilih Denominasi</h1>
                    <p>* Dalam Rupiah (IDR)</p>
                </div>
                <div className="denom">
                    {items.map(item => (
                        <Button
                            variant="secondary-outline"
                            className={
                                price == item
                                    ? "orange-button"
                                    : "button-color-outline"
                            }
                            onClick={() => setPrice(item)}
                        >
                            {new Intl.NumberFormat().format(item)}
                        </Button>
                    ))}
                </div>
            </Card>

            {/* Payment method card */}
            <Card
                style={{ width: "100%" }}
                className="p-3 mb-5 shadow dark-grey-bg"
            >
                <div className="denom-header mb-3">
                    <h1>Pilih Metode Pembayaran</h1>
                </div>

                <div className="payment-methods">
                    <a
                        onClick={
                            price == false
                                ? () => setMethod()
                                : () => setMethod("gopay")
                        }
                    >
                        <Card
                            className={
                                price == false
                                    ? "mb-3 p-3 method-inactive"
                                    : method == "gopay"
                                    ? "mb-3 p-3 choose"
                                    : "mb-3 p-3 method"
                            }
                        >
                            <div className="row p-3 method__inner">
                                <img src={GopayLogo}></img>
                                <h3>
                                    {price == false
                                        ? "-"
                                        : "IDR " +
                                          new Intl.NumberFormat().format(price)}
                                </h3>
                            </div>
                        </Card>
                    </a>

                    <a
                        onClick={
                            price == false
                                ? () => setMethod("")
                                : () => setMethod("bca")
                        }
                    >
                        <Card
                            className={
                                price == false
                                    ? "mb-3 p-3 method-inactive"
                                    : method == "bca"
                                    ? "mb-3 p-3 choose"
                                    : "mb-3 p-3 method"
                            }
                        >
                            <div className="row p-3 method__inner">
                                <img src={BcaLogo}></img>
                                <h3>
                                    {price == false
                                        ? "-"
                                        : "IDR " +
                                          new Intl.NumberFormat().format(price)}
                                </h3>
                            </div>
                        </Card>
                    </a>

                    <a
                        onClick={
                            price == false
                                ? () => setMethod("")
                                : () => setMethod("ovo")
                        }
                    >
                        <Card
                            className={
                                price == false
                                    ? "mb-3 p-3 method-inactive"
                                    : method == "ovo"
                                    ? "mb-3 p-3 choose"
                                    : "mb-3 p-3 method"
                            }
                        >
                            <div className="row p-3 method__inner">
                                <img src={OvoLogo}></img>
                                <h3>
                                    {price == false
                                        ? "-"
                                        : "IDR " +
                                          new Intl.NumberFormat().format(price)}
                                </h3>
                            </div>
                        </Card>
                    </a>

                    <a
                        onClick={
                            price == false
                                ? () => setMethod("")
                                : () => setMethod("dana")
                        }
                    >
                        <Card
                            className={
                                price == false
                                    ? "mb-3 p-3 method-inactive"
                                    : method == "dana"
                                    ? "mb-3 p-3 choose"
                                    : "mb-3 p-3 method"
                            }
                        >
                            <div className="row p-3 method__inner">
                                <img src={DanaLogo}></img>
                                <h3>
                                    {price == false
                                        ? "-"
                                        : "IDR " +
                                          new Intl.NumberFormat().format(price)}
                                </h3>
                            </div>
                        </Card>
                    </a>
                </div>
            </Card>

            {/* Checkout button */}
            <div className="d-flex flex-row mt-3">
                <Button
                    variant="warning"
                    className="checkoutbutton"
                    onClick={
                        method == false || price == false
                            ? handleShow
                            : login
                            ? sendPayment
                            : handleShowLogin
                    }
                    active
                >
                    Pembayaran
                </Button>
            </div>
        </div>
    );
};
export default PriceList;
