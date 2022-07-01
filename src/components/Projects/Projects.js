import React, { Component } from 'react';
import classes from './Projects.module.css';

class Projects extends Component {

    render() {
        return(
            <div className={classes.Projects}>
                {this.props.children}
            </div>
        );
    }
}

export default Projects;