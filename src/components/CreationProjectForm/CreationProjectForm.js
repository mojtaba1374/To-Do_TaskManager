import React, { Component } from 'react';
import classes from './CreationProjectForm.module.css';

import Button from '../Ui/Button/Button';

class CreationProjectForm extends Component {

    state = {
        projectName: ''
    }

    inputChangeHandler = event => {
        this.setState({
            projectName: event.target.value
        });
    }

    render() {
        return(
            <div className={classes.CreationProjectForm}>
                <h4>پروژه جدید</h4>
                <input 
                    type="text" 
                    placeholder="نام پروژه" 
                    value={this.state.projectName} 
                    onChange={this.inputChangeHandler} />
                <Button 
                    btnColor="green" 
                    clickedBtn={() => this.props.saveBtnClicked(this.state.projectName)} 
                    disabled={this.state.projectName.trim().length < 1}>ذخیره</Button>
                <Button 
                    btnColor="red" 
                    clickedBtn={this.props.cancelBtnClicked}>لغو</Button>
            </div>
        );
    }
}

export default CreationProjectForm;