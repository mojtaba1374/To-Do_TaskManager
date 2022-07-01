import React, { Component } from 'react';
import classes from './TaskCreator.module.css'

import Button from '../../../Ui/Button/Button';

class TaskCreator extends Component {

    constructor(props) {
        super(props);
        this.taskContent = React.createRef();
    }

    render() {
        return (
            <div className={classes.TaskCreator}>
                <div 
                    className={classes.TaskNameContainer}
                    contentEditable="true"
                    ref={this.taskContent}>
                </div>
                <Button btnColor="green" 
                    clickedBtn={event => this.props.clickedSaveBtn(event, this.taskContent.current.innerText)}
                    >ذخیره
                </Button>
                <Button btnColor="red" 
                    clickedBtn={this.props.clickedCancelBtn}>لغو
                </Button>
            </div>
        );
    }
}

export default TaskCreator;