import React, { Component } from 'react';
import classes from './TaskContainer.module.css';

class TaskContainer extends Component {

    render() {

        return (
            <div className={classes.TaskContainer}>
                <h4>{this.props.stateName}</h4>
                {this.props.children}
            </div>
        );
    }
}

export default TaskContainer;