import React, { useRef } from 'react';
import classes from './Input.module.css';

const Input = props => {
    let inputElement;
    let validationError;
    let inputElementClasses = [classes.InputElement];
    // console.log(props);
    if(props.isValid && !props.isValid[0] && props.shouldValidate && props.touched) {
        // console.log('here');
        inputElementClasses.push(classes.InvalidInputElement);
        validationError = (
            <span className={classes.ErrorMessage}>
                {props.isValid[1]}
            </span>
        );
    }

    switch(props.elementType) {
        case 'input':
            inputElement = 
                (<>
                    <input
                        className={inputElementClasses.join(' ')} 
                        {...props.elementConfig}
                        value={props.value} 
                        onChange={props.changed} />
                    {validationError}
                </>);
            break;
        default:
            inputElement = 
                <input
                    className={classes.InputElement} 
                    {...props.elementConfig}
                    value={props.value} 
                    onChange={props.changed} />;
    }

    return(
        <div className={classes.Input}>
            {/* <label className={classes.Label}>{props.label}</label> */}
            {inputElement}
        </div>
    );
};

export default Input;
