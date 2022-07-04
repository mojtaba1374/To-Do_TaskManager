import React, { Component } from 'react';
import classes from './CreationTask.module.css';

import AddButton from '../../Ui/AddButton/AddButton';

class CreationTask extends Component {
    
    render() {
        return (
            <div className={classes.AddBtnTaskContainer}>
                <AddButton 
                    clickeAddBtn={() => this.props.creationNewTask(this.props.disableAdding)} 
                    disabled={this.props.disableAdding}/>
            </div>
        );
    }
}

export default CreationTask;