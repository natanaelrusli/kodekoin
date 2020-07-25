import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default function PriceList(){
    return(
        <div>
            <Card style={{ width: '100%' }} className="p-3 mb-3">
                <h1>Pilih Nominal</h1>
            </Card>
            <Card style={{ width: '100%' }} className="p-3 mb-3">
                <h1>Pilih Metode Pembayaran</h1>
            </Card>
            <Card style={{ width: '100%' }} className="p-3 mb-3">
                <h1>Pay</h1>
            </Card>
        </div>
    );
}