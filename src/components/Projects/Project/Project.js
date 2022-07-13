import React, { Component } from 'react';
import classes from './Project.module.css';

import SettingIcon from '../../Ui/SettingIcon/SettingIcon';


class Project extends Component {

    render() {

        const projectClasses = [classes.ProjectItem];
        
        if(this.props.activeProjectName === this.props.projectName) {
            projectClasses.push(classes.ActivaProject);
        }

        return(
            <div 
                className={projectClasses.join(' ')}
                onClick={this.props.selectedProject}>
                {this.props.projectName}
                <div className={classes.SettingIcon} onClick={this.props.settingClicked}>
                    <SettingIcon />
                </div>
            </div>
        );
    }
}

export default Project;