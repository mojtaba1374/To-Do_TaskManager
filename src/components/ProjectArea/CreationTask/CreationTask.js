import React, { Component } from 'react';
import classes from './CreationTask.module.css';

import AddButton from '../../Ui/AddButton/AddButton';
import TaskCreator from './TaskCreator/TaskCreator';

class CreationTask extends Component {
    
    render() {
        return (
            <>
                <div className={classes.AddBtnTaskContainer}>
                    <AddButton 
                        clickeAddBtn={() => this.props.creationNewTask(this.props.disableAdding)} 
                        disabled={this.props.disableAdding}/>
                </div>
                {
                this.props.addingTask &&
                    <TaskCreator 
                        clickedCancelBtn={this.props.cancelCreationTask}
                        clickedSaveBtn={this.props.saveTask} />
                }
            </>
        );
    }
}

export default CreationTask;