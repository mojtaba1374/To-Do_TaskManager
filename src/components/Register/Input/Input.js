import React, { useState, useRef } from 'react';
import classes from './Input.module.css';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs/';

const Input = props => {

    const [eyeIconType, setEyeIconType] = useState('hide');

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

    // Handle Eye toggle Icon

    const passwordInput = useRef();

    let eyeIcon;
    let eyeToggleContainer;

    if(eyeIconType === 'hide') {
        eyeIcon = <BsEyeSlashFill />;
    } else if(eyeIconType === 'show') {
        eyeIcon = <BsEyeFill />;
    }

    const toggleEyeIcon = () => {
        console.log(passwordInput.current);
        const repPassword = passwordInput.current.closest('div').nextElementSibling.querySelector('input');
        setEyeIconType(prevState => {
            if(prevState === 'hide') {
                passwordInput.current.setAttribute('type', 'text');
                repPassword && repPassword.setAttribute('type', 'text');
                return 'show';
            }
            if(prevState === 'show') {
                passwordInput.current.setAttribute('type', 'password');
                repPassword && repPassword.setAttribute('type', 'password');
                return 'hide';
            }
        });
    };

    eyeToggleContainer = (
        <span className={classes.EyeIconContainer} onClick={toggleEyeIcon}>
            {eyeIcon}
        </span>
    );

    switch(props.elementType) {
        case 'input':
            inputElement = 
                (<>
                    <input
                        className={inputElementClasses.join(' ')} 
                        {...props.elementConfig}
                        value={props.value} 
                        onChange={props.changed}
                        ref={props.id === 'password' ? passwordInput : null} />
                    {validationError}
                    {props.id === 'password' && eyeToggleContainer}
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
