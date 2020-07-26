import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './css/pricelist.css'
import BcaLogo from '../images/bca-logo.png'
import GopayLogo from '../images/gopay-logo.png'
import OvoLogo from '../images/ovo-logo.png'
import DanaLogo from '../images/dana-logo.png'

export default function PriceList(){
    const [items, setItems] = useState(['10.000','20.000','30.000','40.000','50.000','60.000']);

    return(
        <div>
            <Card className="p-3 mb-5 shadow">
                <div className="denom-header">
                    <h1>Pilih Denominasi</h1>
                </div>
                <div className="denom">
                    {items.map(item => (
                        <Button variant="outline-secondary" className="button-color-outline">IDR {item}</Button>
                    ))}
                </div>
            </Card>

            <Card style={{ width: '100%' }} className="p-3 mb-5 shadow">
                <div className="denom-header">
                    <h1>Pilih Metode Pembayaran</h1>
                </div>
                <div className="payment-methods">
                    <Card className="mb-3 p-3">
                        <div className = "row p-3">
                            <img src={GopayLogo}></img>
                            <h3>Rp. Sekian</h3>
                            <Button variant="outline-secondary" className="lg-btn button-color-outline">Pilih</Button>
                        </div>
                    </Card>
                    <Card className="mb-3 p-3">
                        <div className = "row p-3">
                            <img src={BcaLogo}></img>
                            <h3>Rp. Sekian</h3>
                            <Button variant="outline-secondary" className="lg-btn button-color-outline">Pilih</Button>
                        </div>
                    </Card>
                    <Card className="mb-3 p-3">
                        <div className = "row p-3">
                            <img src={OvoLogo}></img>
                            <h3>Rp. Sekian</h3>
                            <Button variant="outline-secondary" className="lg-btn button-color-outline">Pilih</Button>
                        </div>
                    </Card>
                    <Card className="mb-3 p-3">
                        <div className = "row p-3">
                            <img src={DanaLogo}></img>
                            <h3>Rp. Sekian</h3>
                            <Button variant="outline-secondary" className="lg-btn button-color-outline">Pilih</Button>
                        </div>
                    </Card>
                </div>
            </Card>

            <div className="d-flex flex-row mt-3">
                <Button variant="warning"  className="checkoutbutton" active>
                    Pembayaran
                </Button>
            </div>
        </div>
    );
}