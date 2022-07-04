import React, { Component } from 'react';
import classes from './ProjectsDashboard.module.css';

import ProjectsMenu from '../ProjectsMenu/ProjectsMenu';
import ProjectArea from '../ProjectArea/ProjectArea';


class ProjectsDashboard extends Component {

    onDragEnd = () => {
        
    }

    render() {
        return(
            <div className={classes.ProjectsDashboard}>
                <ProjectsMenu />
                <ProjectArea />
            </div>
        )
    }
}

export default ProjectsDashboard;