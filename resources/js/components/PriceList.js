import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './css/pricelist.css';
import BcaLogo from '../images/bca-logo.png';
import GopayLogo from '../images/gopay-logo.png';
import OvoLogo from '../images/ovo-logo.png';
import DanaLogo from '../images/dana-logo.png';
import logo from '../images/logoimg.png';

export default function PriceList(){
    //Items is for list of denom shown in the page
    const [items, setItems] = useState([10000,20000,30000,40000,50000,60000,70000, 100000, 120000]);

    //To store the price chosen by user
    const [price, setPrice] = useState(false);

    //To store payment method chosen by the user
    const [method, setMethod] = useState(false);
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const handleShow = () => setShow(true);

    function sendPayment(){
        alert("Send Payment " + method + " " + price);
    }

    return(
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title><img src={logo} width="70"></img></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Silahkan pilih denominasi dan metode pembayaran terlebih dahulu!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Denom card */}
            <Card className="p-3 mb-5 shadow">
                <div className="denom-header">
                    <h1>Pilih Denominasi</h1>
                    <p>* Dalam Rupiah (IDR)</p>
                </div>
                <div className="denom">
                    {items.map(item => (
                        <Button
                          variant="secondary-outline"
                          className={price == item?"orange-button":"button-color-outline"}
                          onClick={()=>setPrice(item)}>
                          {new Intl.NumberFormat().format(item)}
                        </Button>
                    ))}
                </div>
            </Card>

            {/* Payment method card */}
            <Card style={{ width: '100%' }} className="p-3 mb-5 shadow">
                <div className="denom-header mb-3">
                    <h1>Pilih Metode Pembayaran</h1>
                </div>
                
                <div className="payment-methods">
                    <a onClick={price==null? ()=>setMethod() : ()=>setMethod('gopay')}>
                        <Card className= {price == null? "mb-3 p-3" : method=='gopay'? "mb-3 p-3 choose" : "mb-3 p-3 method"}>
                            <div className = "row p-3">
                                <img src={GopayLogo}></img>
                                <h3>
                                    {price==false? '-' : 'IDR ' + new Intl.NumberFormat().format(price)}
                                </h3>
                            </div>
                        </Card>
                    </a>

                    <a onClick={price==null? ()=>setMethod('') : ()=>setMethod('bca')}>
                        <Card className= {price == null? "mb-3 p-3" : method=='bca'? "mb-3 p-3 choose" : "mb-3 p-3 method"}>
                            <div className = "row p-3">
                                <img src={BcaLogo}></img>
                                <h3>
                                    {price==false? '-' : 'IDR ' + new Intl.NumberFormat().format(price)}
                                </h3>
                            </div>
                        </Card>
                    </a>

                    <a onClick={price==null? ()=>setMethod('') : ()=>setMethod('ovo')}>
                        <Card className= {price == null? "mb-3 p-3" : method=='ovo'? "mb-3 p-3 choose" : "mb-3 p-3 method"}>
                            <div className = "row p-3">
                                <img src={OvoLogo}></img>
                                <h3>
                                    {price==false? '-' : 'IDR ' + new Intl.NumberFormat().format(price)}
                                </h3>
                            </div>
                        </Card>
                    </a>

                    <a onClick={price==null? ()=>setMethod('') : ()=>setMethod('dana')}>
                        <Card className= {price == null? "mb-3 p-3" : method=='dana'? "mb-3 p-3 choose" : "mb-3 p-3 method"}>
                            <div className = "row p-3">
                                <img src={DanaLogo}></img>
                                <h3>
                                    {price==false? '-' : 'IDR ' + new Intl.NumberFormat().format(price)}
                                </h3>
                            </div>
                        </Card>
                    </a>
                </div>
            </Card>

            {/* Checkout button */}
            <div className="d-flex flex-row mt-3">
                <Button variant="warning"  className="checkoutbutton" onClick={(method==false) || (price == false)? handleShow : sendPayment} active>
                    Pembayaran
                </Button>
            </div>
        </div>
    );
}