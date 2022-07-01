import React, { Component } from 'react';
import classes from './ProjectsMenu.module.css';

import AddButton from '../Ui/AddButton/AddButton';
import Modal from '../Ui/Modal/Modal';
import Backdrop from '../Ui/Backdrop/Backdrop';
import CreationProjectForm from '../CreationProjectForm/CreationProjectForm';
import Projects from '../Projects/Projects';
import Project from '../Projects/Project/Project';
// import * as actionTypes from '../../store/actionTypes';

import { connect } from 'react-redux';

let projectId = 1;  // For test before rich API

class ProjectsMenu extends Component {

    state = {
        showModal: false
    }

    addProjectBtnHandler = () => {
        this.setState({ showModal: true });
    }

    closeAddProjectModal = () => {
        this.setState({ showModal: false });
    }

    saveProjectHandler = (prjName) => {

        this.props.onUpdateActiveProject(prjName, projectId);

        // baraye project zakhire shode dar redux bayad id ham set konam
        // baraye project zakhire shode dar redux bayad state haye todo doing done ham set konam
        const project = {
            [projectId]: {
                projectName: prjName,
                tasks: []
            }
        }
        // const project = {
        //     projectName: prjName,
        //     id: projectId,
        //     tasks: []
        // }

        projectId++;  // For test before rich API
        
        this.props.onUpdateProjectsArray(project);
        
        this.setState({
            showModal: false
        });
    }

    changeActiveProject = (activePrjName, id) => {
        this.props.onUpdateActiveProject(activePrjName, id);
    }

    render() {

        const projects = this.props.projects.map(project => {
            let projectId = Object.keys(project)[0];
            return (
                <Project 
                    key={projectId} 
                    projectName={project[projectId].projectName} 
                    selectedProject={
                        () => this.changeActiveProject(project[projectId].projectName, projectId)} 
                    activeProjectName={this.props.activeProject}/>
            );
        })

        return(
            <div className={classes.ProjectsMenu}>
                <Backdrop showModal={this.state.showModal} clickedBackdrop={this.closeAddProjectModal} />
                <Modal showModal={this.state.showModal}>
                    <CreationProjectForm
                        cancelBtnClicked={this.closeAddProjectModal}
                        saveBtnClicked={this.saveProjectHandler}
                    />
                </Modal>
                <div className={classes.ProjectsHeader}>
                    <span>پروژه ها</span>
                    <AddButton clickeAddBtn={this.addProjectBtnHandler} />
                </div>
                <Projects>
                    {projects}
                </Projects>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeProject: state.activeProject,
        projects: state.projects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateActiveProject: 
            (activePrjName, activePrjId) => dispatch(
                {type: 'UPDATE_ACTIVE_PROJECT', activePrjName: activePrjName, activePrjId: activePrjId}
            ),
        onUpdateProjectsArray: (project) => dispatch({type: 'UPDATE_PROJECTS_ARRAY', project: project})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsMenu);