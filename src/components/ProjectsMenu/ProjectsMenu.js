import React, { Component } from 'react';
import classes from './ProjectsMenu.module.css';

import AddButton from '../Ui/AddButton/AddButton';
import Modal from '../Ui/Modal/Modal';
import Backdrop from '../Ui/Backdrop/Backdrop';
import CreationProjectForm from '../CreationProjectForm/CreationProjectForm';
import Projects from '../Projects/Projects';
import Project from '../Projects/Project/Project';
import ProjectSetting from '../ProjectSetting/ProjectSetting';
import ProjectMembers from '../ProjectMembers/ProjectMembers';
import ProjectMember from '../ProjectMembers/ProjectMember/ProjectMember';

import axios from 'axios';
import * as actionTypes from '../../store/actions/actionTypes';

import { connect } from 'react-redux';

class ProjectsMenu extends Component {

    state = {
        showModal: false,
        showSetting: false,
        projectMembers: []
    }

    componentDidMount() {
        let projects = [];
        let accesToken = this.props.token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }
        let config = {
            method: 'get',
            url: 'http://localhost:8000/projects/',
            headers: { 
              'Authorization': `Bearer ${accesToken}`, 
              'Content-Type': 'application/json'
            }
        };
        axios(config)
            .then(response => {
                console.log(response.data);
                projects = response.data.map(project => {
                    return({
                        [project.id]: {
                            id: project.id,
                            projectName: project.name,
                            confirmed: project.confirmed,
                            inviter: project.inviter,
                            columns: {
                                'column-1': {
                                  id: 'column-1',
                                  title: 'برای انجام',
                                  tasks: [],
                                },
                                'column-2': {
                                  id: 'column-2',
                                  title: 'در حال انجام',
                                  tasks: [],
                                },
                                'column-3': {
                                  id: 'column-3',
                                  title: 'انجام شده',
                                  tasks: [],
                                },
                            }
                        }
                    });
                });
                this.props.onSetExistProjects(projects);
            })
            .catch(err => {
                console.log(err);
            })
    }

    addProjectBtnHandler = () => {
        this.setState({ showModal: true });
    }

    closeAddProjectModal = () => {
        this.setState({ showModal: false });
    }

    saveProjectHandler = (prjName) => {
        let projectId;
        let accesToken = this.props.token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        let data = { name: prjName };
        let config = {
            method: 'post',
            url: 'http://localhost:8000/project/',
            headers: { 
              'Authorization': `Bearer ${accesToken}`, 
              'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)     // bayad inviter ra tarif konam barash ba etelaate khode shakhs
            .then(response => {
                projectId = response.data.id;
                const project = {
                    [projectId]: {
                        id: projectId,
                        projectName: prjName,
                        confirmed: true,
                        
                        columns: {
                            'column-1': {
                              id: 'column-1',
                              title: 'برای انجام',
                              tasks: [],
                            },
                            'column-2': {
                              id: 'column-2',
                              title: 'در حال انجام',
                              tasks: [],
                            },
                            'column-3': {
                              id: 'column-3',
                              title: 'انجام شده',
                              tasks: [],
                            },
                        }
                    }
                };
                this.props.onUpdateActiveProject(prjName, projectId);
                this.props.onUpdateProjectsArray(project);
            })
            .catch(error => {
                console.log(error);
            });

        this.setState({
            showModal: false
        });
    }

    changeActiveProject = (activePrjName, id) => {
        this.props.onUpdateActiveProject(activePrjName, id);
    }

    settingClickedHandler = (prjName, prjId) => {
        
        console.log(prjId);
        let projectMembers = [];
        let accesToken = this.props.token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        let config = {
            method: 'GET',
            url: `http://localhost:8000/project/${prjId}/members`,
            headers: { 
              'Authorization': `Bearer ${accesToken}`, 
              'Content-Type': 'application/json'
            }
        };
        axios(config)
            .then(response => {
                console.log(response.data);
                projectMembers = response.data
                this.setState({
                    projectMembers: projectMembers
                });
            })
            .catch(error => {
                console.log(error)
            });
        this.setState({
            showSetting: true
        });
    }

    closeSettingProjectModal = () => {
        this.setState({showSetting: false});
    }

    editeProjectName = () => {

    }

    inviteOtherUser = (userMail) => {
        console.log(userMail);
        let accesToken = this.props.token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        let data = {
            "project_id": +this.props.activeProjectId,
            "user_email": userMail
        };
        console.log(data);

        let config = {
            method: 'post',
            url: 'http://localhost:8000/project/invite/',
            headers: { 
              'Authorization': `Bearer ${accesToken}`, 
              'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(response => {
                const projectMembers = [...this.state.projectMembers];
                let projecMember = {
                    confirmed: false,
                    email: userMail,
                    "user_role": "User",
                    username: response.data.username
                };
                projectMembers.push(projecMember);
                this.setState({
                    projectMembers: projectMembers
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        const projects = this.props.projects.map(project => {
            let projectId = Object.keys(project)[0];
            if(project[projectId].confirmed === false) {
                return null;
            }
            return (
                <Project 
                    key={projectId} 
                    projectName={project[projectId].projectName} 
                    settingClicked={() => this.settingClickedHandler(project[projectId].projectName, projectId)}
                    selectedProject={
                        () => this.changeActiveProject(project[projectId].projectName, projectId)
                    } 
                    activeProjectName={this.props.activeProject}/>
            );
        });

        let members = this.state.projectMembers.map(member => {
            return(
                <ProjectMember
                    key={member.username}
                    userName={member.username}
                    userEmail={member.email}
                    memberRole={member['user_role']} />
            )
        });

        return(
            <div className={classes.ProjectsMenu}>
                <Backdrop showModal={this.state.showSetting} clickedBackdrop={this.closeSettingProjectModal} />
                <Modal showModal={this.state.showSetting}>
                    <ProjectSetting
                        projectName={this.props.activeProject}
                        clickedEditName={this.editeProjectName}
                        clickedAddMember={this.inviteOtherUser} />
                    <ProjectMembers>
                        {members}
                    </ProjectMembers>
                </Modal>
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
        activeProject: state.dashboard.activeProject,
        activeProjectId: state.dashboard.activeProjectId,
        projects: state.dashboard.projects,
        token: state.auth.accessToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateActiveProject: 
            (activePrjName, activePrjId) => dispatch(
                {type: actionTypes.UPDATE_ACTIVE_PROJECT, activePrjName, activePrjId}
            ),
        onUpdateProjectsArray: (project) => dispatch({type: actionTypes.UPDATE_PROJECTS_ARRAY, project}),
        onSetExistProjects: (projects) => dispatch({type: actionTypes.SET_EXIST_PROJECTS, projects})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsMenu);