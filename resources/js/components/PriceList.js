import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Button from 'react-bootstrap/Button'
import './css/pricelist.css'
import BcaLogo from '../images/bca-logo.png'
import GopayLogo from '../images/gopay-logo.png'
import OvoLogo from '../images/ovo-logo.png'
import DanaLogo from '../images/dana-logo.png'

export default function PriceList(){
    //Items is for list of denom shown in the page
    const [items, setItems] = useState([10000,20000,30000,40000,50000,60000,70000]);

    //To store the price chosen by user
    const [price, setPrice] = useState();

    //To store payment method chosen by the user
    const [method, setMethod] = useState();

    return(
        <div>
            {/* Denom card */}
            <Card className="p-3 mb-5 shadow">
                <div className="denom-header">
                    <h1>Pilih Denominasi</h1>
                </div>
                <div className="denom">
                    {items.map(item => (
                        <Button
                          variant="secondary-outline"
                          className={price == item?"orange-button":"button-color-outline"}
                          onClick={()=>setPrice(item)}>
                          IDR {new Intl.NumberFormat().format(item)}
                        </Button>
                    ))}
                </div>
            </Card>

            {/* Payment method card */}
            <Card style={{ width: '100%' }} className="p-3 mb-5 shadow">
                <div className="denom-header">
                    <h1>Pilih Metode Pembayaran</h1>
                </div>

                <div className="payment-methods">
                    <Card className="mb-3 p-3">
                        <div className = "row p-3">
                            <img src={GopayLogo}></img>
                            <h3>
                                {price==null? '-' : 'IDR ' + new Intl.NumberFormat().format(price)}
                            </h3>
                            <Button 
                            variant="secondary-outline"
                            className={method == 'gopay'?"orange-button":"button-color-outline"}
                            disabled={!price}
                            onClick={()=>setMethod('gopay')}>
                                    Pilih
                            </Button>
                        </div>
                    </Card>
                    <Card className="mb-3 p-3">
                        <div className = "row p-3">
                            <img src={BcaLogo}></img>
                            <h3>
                                {price==null? '-' : 'IDR ' + new Intl.NumberFormat().format(price)}
                            </h3>
                            <Button 
                            variant="secondary-outline"
                            className={method == 'bca'?"orange-button":"button-color-outline"}
                            disabled={!price}
                            onClick={()=>setMethod('bca')}>
                                    Pilih
                            </Button>
                        </div>
                    </Card>
                    <Card className="mb-3 p-3">
                        <div className = "row p-3">
                            <img src={OvoLogo}></img>
                            <h3>
                                {price==null? '-' : 'IDR ' + new Intl.NumberFormat().format(price)}
                            </h3>
                            <Button 
                            variant="secondary-outline"
                            className={method == 'ovo'?"orange-button":"button-color-outline"}
                            disabled={!price}
                            onClick={()=>setMethod('ovo')}>
                                    Pilih
                            </Button>
                        </div>
                    </Card>
                    <Card className="mb-3 p-3">
                        <div className = "row p-3">
                            <img src={DanaLogo}></img>
                            <h3>
                                {price==null? '-' : 'IDR ' + new Intl.NumberFormat().format(price)}
                            </h3>
                            <Button 
                            variant="secondary-outline"
                            className={method == 'dana'?"orange-button":"button-color-outline"}
                            disabled={!price}
                            onClick={()=>setMethod('dana')}>
                                    Pilih
                            </Button>
                        </div>
                    </Card>
                </div>
            </Card>

            {/* Checkout button */}
            <div className="d-flex flex-row mt-3">
                <Button variant="warning"  className="checkoutbutton" active>
                    Pembayaran
                </Button>
            </div>
        </div>
    );
}