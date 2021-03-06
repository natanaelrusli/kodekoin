import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MethodDropdown from "./MethodDropdown";
import Form from "react-bootstrap/Form";
import { makeStyles } from "@material-ui/core/styles";
import "./css/pricelist.css";
import { createOrder } from "./DataFunctions";
import { stringify } from "querystring";
import { inArray } from "jquery";

const useStyles = makeStyles(theme => ({
    submit: {
        backgroundColor: "#FF4646",
        color: "#FFF",
        borderColor: "#FF4646",
        "&:hover, &:focus": {
            backgroundColor: "#FF4646",
            borderColor: "#FFF"
        },
        "&:disabled" : {
            backgroundColor: "#FF4646",
            borderColor: "#FF4646"
        }
    }
}));
function preventDefault(event) {
    event.preventDefault();
}
const PriceList = () => {
    const classes = useStyles();

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

    // List of all payment method
    // Should adapt with xendit requirements
    const [virtualAccount, setVirtualAccount] = useState([
        "bca",
        "bri",
        "bni",
        "mandiri",
        "permata"
    ]);

    const [ewallet, setEwallet] = useState(["ovo", "linkaja", "dana"]);

    const [merchant, setMerchant] = useState(["alfamart", "indomaret"]);

    const [qris, setQris] = useState(["qris"]);

    const [referal, setReferal] = useState(false);

    //To store the price chosen by user
    const [price, setPrice] = useState(false);
    //To store payment method chosen by the user
    const [method, setMethod] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showProccess, setShowProccess] = useState(false);
    const handleCloseProccess = () => setShowProccess(true);

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const login = localStorage.getItem("isLoggedIn");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const createHistory = require("history").createBrowserHistory;
    let history = createHistory();

    const changeMethod = value => {
        setMethod(value);
        console.log(method);
    };

    function sendPayment() {
        //Sending payment data to back end
        // alert("Send Payment " + String(method).toUpperCase() + " " + price);
        createOrder(
            userData.first_name,
            userData.email,
            userData.phone,
            "RF-Cash",
            price,
            String(method).toUpperCase(),
            virtualAccount.includes(method)
                ? 0
                : ewallet.includes(method)
                ? 1
                : merchant.includes(method)
                ? 2
                : 3,
            setShowProccess
        );
        // Reset all states after sending data to back end
        setMethod(false);
        setPrice(false);
        // window.location.reload(false);
    }

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
                        <img src={"../images/logoimg.png"} width={40}></img>
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
                        <img src={"../images/logoimg.png"} width={40}></img>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Silahkan Login terlebih dahulu</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogin}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Notification Proccess */}
            <Modal
                show={showProccess}
                onHide={handleCloseProccess}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <img src={"../images/logoimg.png"} width={40}></img>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Pesanan sedang diproses</Modal.Body>
            </Modal>

            {/* Denom card */}
            <Card className="p-3 mb-3 shadow dark-grey-bg">
                <div className="denom-header">
                    <h1>Pilih Denominasi</h1>
                    <p>* Dalam Rupiah (IDR)</p>
                </div>
                <div className="denom">
                    {items.map(item => (
                        <Button
                            variant="secondary-outline"
                            style={{ fontWeight: "bold" }}
                            className={
                                price == item
                                    ? "orange-button"
                                    : "button-color-outline"
                            }
                            onClick={() => setPrice(item)}
                            key={item}
                        >
                            {new Intl.NumberFormat().format(item)}
                        </Button>
                    ))}
                </div>
            </Card>

            {/* Payment method card */}
            <Card
                style={{ width: "100%" }}
                className="pr-3 pt-3 mb-3 shadow dark-grey-bg"
            >
                <div className="denom-header mb-3 ml-3">
                    <h1>Pilih Metode Pembayaran</h1>
                </div>

                <MethodDropdown
                    chooseMethod={method}
                    choosePrice={parseInt(price)}
                    methods={ewallet}
                    setMethod={setMethod}
                    title="E-Wallet"
                ></MethodDropdown>
                <MethodDropdown
                    chooseMethod={method}
                    choosePrice={parseInt(price)}
                    methods={virtualAccount}
                    setMethod={setMethod}
                    title="Virtual Account"
                ></MethodDropdown>
                <MethodDropdown
                    chooseMethod={method}
                    choosePrice={parseInt(price)}
                    methods={qris}
                    setMethod={setMethod}
                    title="QRIS"
                ></MethodDropdown>
                <MethodDropdown
                    chooseMethod={method}
                    choosePrice={parseInt(price)}
                    methods={merchant}
                    setMethod={setMethod}
                    title="Merchant"
                ></MethodDropdown>
            </Card>

            {referal && (
                <Card
                    style={{ width: "100%" }}
                    className="p-3 mb-3 shadow dark-grey-bg"
                >
                    <React.Fragment>
                        <div className="denom-header mb-3">
                            <h1>Referal Code</h1>
                        </div>
                        <Form onSubmit={e => preventDefault(e)}>
                            <Form.Group
                                controlId="formBasicText"
                                className="mt-1"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Put your referal code here..."
                                    className="red-glow"
                                    style={{
                                        backgroundColor: "#1C1C1F",
                                        borderColor: "#1C1C1F",
                                        color: "#FFF"
                                    }}
                                    onChange={e =>
                                        setPasswordOld(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className={classes.submit}
                                disabled={true}
                            >
                                Submit Referal Code
                            </Button>
                        </Form>
                    </React.Fragment>
                </Card>
            )}

            {/* Checkout button */}
            <div className="d-flex flex-row mt-5">
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
