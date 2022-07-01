import React from 'react';
import classes from './Button.module.css';

const Button = props => {
    const btnClasses = [classes.Button];
    if(props.btnColor === 'green') {
        btnClasses.push(classes.Green);
    } else if(props.btnColor === 'red') {
        btnClasses.push(classes.Red);
    }

    return (
        <button className={btnClasses.join(' ')} onClick={props.clickedBtn} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default Button;