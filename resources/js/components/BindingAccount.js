import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "react-bootstrap/Button";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
    root: {
        width: '120px',
        height: '96.5px',
        textAlign: 'center',
    },
    card: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    depositContext: {
        flex: 1,
    },

    title: {
        color: '#FF4646',
    },

    pos: {
        marginBottom: 5,
    },

    logo: {
        width: '60px',
        margin: '0 auto',
        marginBottom: '10px',
    },

    bindButton: {
        backgroundColor: "#FFF",
        color: "#FF4646",
        borderColor: "#FF4646",
        width: "100px",
        margin: '0 auto',
        fontSize: '9.5px',
        "&:hover, &:focus": {
            backgroundColor: "#FF4646",
            borderColor: "#FF4646"
        },
        "&:disabled": {
            // backgroundColor: "#90EE90",
            // borderColor: "#90EE90",
            backgroundColor: "#FF4646",
            borderColor: "#FF4646",
            opacity:"0.6",
        },
    },
});



function BindingAccount() {
    const [bind, setBind] = useState(true);
    const classes = useStyles();
    const handleBindClick = () => {
        console.log('Binding...');
        setBind(false);
    }

    return (
        <React.Fragment>    
            <h3 className={classes.title}>Menghubungkan Akun</h3>

            <Card className={classes.root} variant="outlined">
                <CardContent className={classes.card}>
                    <img src={require("../images/productlogo/gratismain.png")} className={classes.logo}></img>
                    <Button
                        variant="danger"
                        type="submit"
                        aria-label = "Submit"
                        className={classes.bindButton}
                        disabled = {bind == false? true : false}
                        onClick = {handleBindClick}
                    >
                        {bind == false? 'Telah Terhubung' : 'Hubungkan Akun'}
                    </Button>
                </CardContent>
            </Card>
            
        </React.Fragment>
    )
}

export default BindingAccount
