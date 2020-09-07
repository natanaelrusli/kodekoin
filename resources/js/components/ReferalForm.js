import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./css/component.css";
import { grey } from "@material-ui/core/colors";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    depositContext: {
        flex: 1
    },

    title: {
        color: "#FF4646"
    },

    subtitle: {
        color: "grey",
        fontSize: "15px",
        marginBottom: "5px",
    },

    submit: {
        backgroundColor: "#FFF",
        color: "#FF4646",
        borderColor: "#FF4646",
        "&:hover, &:focus": {
            backgroundColor: "#FF4646",
            borderColor: "#FF4646"
        }
    },

    form: {
        width: "100%", // Fix IE 11 issue.
    }
}));

function ReferalForm() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <h3 className={classes.title}>Kode Referal</h3>
            <p className={classes.subtitle}>Untuk mendapatkan kode referal yang bisa kamu share secara publik, dan dapat mendapatkan bonus saat orang lain memakai kode referal-mu<br></br>Kamu boleh mengajukan kode referal kamu pada kolom dibawah ini. Tim kami akan menganalisa apakah akun kamu layak untuk mendapatkan kode referal<br></br>Analisa akan dilakukan paling lama   2 hari sejak pengajuan dilakukan.</p>
            <Form
                onSubmit={e => {
                   
                }}
            >
                <Form.Group controlId="formBasicText" className="mt-1">
                    <Form.Control
                        type="text"
                        placeholder="Masukkan kode referalmu disini..."
                        className="red-glow referal__form"
                        aria-label = "Kode Referal"
                        onChange={e => setPasswordOld(e.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    aria-label = "Submit"
                    className={classes.submit}
                >
                    Ajukan Kode Referal
                </Button>
            </Form>
        </React.Fragment>
    )
}

export default ReferalForm
