import React from 'react';
import classes from './AddButton.module.css';

const AddButton = props => {

    let addBtnClasses = [classes.AddButton];
    if(props.disabled) {
        addBtnClasses.push(classes.DisabledAddBtn);
    }

    return(
        <div className={addBtnClasses.join(' ')} onClick={props.clickeAddBtn}>
            <div className={classes.Horizontal}></div>
        </div>
    );
};

export default AddButton;