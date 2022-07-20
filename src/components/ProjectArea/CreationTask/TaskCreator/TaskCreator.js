import React, { Component } from 'react';
import classes from './TaskCreator.module.css'

import Button from '../../../Ui/Button/Button';
import FormLoading from '../../../Ui/Loader/FormLoading/FormLoading';

class TaskCreator extends Component {

    constructor(props) {
        super(props);
        this.taskContent = React.createRef();
    }

    
    componentDidMount() {
        this.taskContent.current.focus();
    }

    componentDidUpdate() {
        this.taskContent.current.focus();
        this.taskContent.current.innerText = '';
    }

    render() {
        return (
            <div className={classes.TaskCreator}>
                <div 
                    className={classes.TaskNameContainer}
                    contentEditable="true"
                    ref={this.taskContent}>
                </div>
                <div className={classes.BtnGroup}>
                    <Button btnColor="green" 
                        clickedBtn={event => this.props.clickedSaveBtn(event, this.taskContent.current.innerText)}
                        >ذخیره
                    </Button>
                    <Button btnColor="red" 
                        clickedBtn={this.props.clickedCancelBtn}>لغو
                    </Button>
                </div>
                {this.props.loadingCreateTask &&
                    <div className={classes.Loader}>
                        <FormLoading />
                    </div>
                }
            </div>
        );
    }
}

export default TaskCreator;