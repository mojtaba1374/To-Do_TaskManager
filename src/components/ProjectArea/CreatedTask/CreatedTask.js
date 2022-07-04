import React, { Component } from 'react';
import classes from './CreatedTask.module.css';

class Task extends Component {
    render() {
        return (
            <div 
                className={classes.Task}>
                {this.props.title}
            </div>
        );
    }
}

export default Task;