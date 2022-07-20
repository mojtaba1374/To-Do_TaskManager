import React, { Component } from 'react';
import classes from './Projects.module.css';

import FormLoading from '../Ui/Loader/FormLoading/FormLoading';


class Projects extends Component {

    render() {
        return(
            <div className={classes.Projects}>
                {this.props.children}
                {this.props.creatingProject && 
                    <FormLoading />
                }
            </div>
        );
    }
}

export default Projects;