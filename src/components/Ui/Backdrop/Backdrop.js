import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = props => {
    
    if(!props.showModal) {
        return;
    }

    return (
        <div className={classes.Backdrop} onClick={props.clickedBackdrop}>
        </div>
    );
};

export default Backdrop;