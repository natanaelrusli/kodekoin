import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './css/methodDropdown.css';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor : '#2E2E2E',
      margin : '10px',
      borderRadius : '5px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


function MethodDropdown({choosePrice, methods, title, setMethod, chooseMethod}) {
    
    const classes = useStyles();

    const test = (value) => {
        console.log(value);
    }

    return (
        <div className='container__accordion'>
            <Accordion square className={classes.root} disabled = {isNaN(choosePrice) ? true : false}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="error"/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography style={{ color:'white', width: '100%' }}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion">
                    {
                        methods.map(method =>  (
                                <div 
                                    onClick={
                                    () => setMethod(method)}
                                    className={chooseMethod == method ? "accordion__button choose" : "accordion__button"} 
                                    key = {method}
                                >
                                    <div className={"row p-3 method__inner"}>
                                        <div className="method__img">
                                            <img src={require("../images/" + Object.values({method}) + ".png")} style={{width: '50px', height: '50px'}}></img>
                                        </div>

                                        <Typography style={{ margin:'auto', color: '#2E2E2E', fontWeight: 'bold' }}>
                                            {isNaN(choosePrice) ? "-" : "IDR " +
                                                new Intl.NumberFormat().format(choosePrice)
                                            }
                                        </Typography>
                                    </div>
                                </div>
                        ))
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default MethodDropdown
