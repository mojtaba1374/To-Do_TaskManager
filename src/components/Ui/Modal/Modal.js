import React from 'react';
import classes from './Modal.module.css';

const Modal = props => {

    if(!props.showModal) {
        return;
    }

    return (
        <div className={classes.Modal}>
            {props.children}
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p> */}
        </div>
    );
};

export default Modal;