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

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// import FormLoading from '../Ui/Loader/FormLoading/FormLoading';


class ProjectsMenu extends Component {

    state = {
        showModal: false,
        showSetting: false,
        deletingMemberMail: false
    }

    openAddProjectModal = () => {
        this.setState({ showModal: true });
    }

    closeAddProjectModal = () => {
        this.setState({ showModal: false });
    }

    addProjectHandler = (projectName) => {
        this.props.onAddNewProject(projectName, this.props.token);
        if(!this.props.createProjectLoading) {
            this.setState({ showModal: false });
        }
    }

    editeProjectName = (projectName) => {
        this.props.onEditProjectName(projectName, this.props.activeProjectId, this.props.token)
    }

    deleteProjectHandler = () => {
        this.props.onDeleteProject(this.props.activeProjectId, this.props.token);
    }

    changeActiveProject = (activePrjName, id) => {
        this.props.onChangeActiveProject(activePrjName, id);
    }

    settingClickedHandler = (projectId) => {
        this.props.onShowSettingProjectModal();
        this.props.onInitializeActiveProjectMembers(projectId, this.props.token);
    }

    inviteMember = (userMail) => {
        this.props.onInviteMember(userMail, this.props.activeProjectId, this.props.token);
    }

    userLeaveProjectHandler = () => {
        this.props.onUserLeaveProject(this.props.activeProjectId, this.props.token);
    }

    deleteMemberFromProjectHandler = userEmail => {
        this.setState({
            deletingMemberMail: userEmail
        });
        this.props.onDeleteMember(userEmail, this.props.activeProjectId, this.props.token);
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
                    settingClicked={() => this.settingClickedHandler(projectId)}
                    selectedProject={
                        () => this.changeActiveProject(project[projectId].projectName, projectId)
                    } 
                    activeProjectName={this.props.activeProject}/>
            );
        });

        let userRoleOfActiveProject;
        this.props.projects.forEach(project => {
            const projectId = Object.keys(project)[0];
            if(+projectId === +this.props.activeProjectId) {
                userRoleOfActiveProject = project[projectId].userRole;
            }
        });

        let members;
        if(this.props.activeProjectMembers) {
            members= this.props.activeProjectMembers.map((member, idx) => {
                return(
                    <ProjectMember
                        key={member.username + idx}
                        userName={member.username}
                        userEmail={member.email}
                        confirmed={member.confirmed}
                        userRoleOfActiveProject={userRoleOfActiveProject}
                        memberRole={member['user_role']}
                        profileData={this.props.profileData}
                        deletingMemberMail={this.state.deletingMemberMail}
                        loadingDeleteMember={this.props.loadingDeleteMember}
                        clickedDeleteUserBtn={() => this.deleteMemberFromProjectHandler(member.email)} />
                );
            });
        } 

        return(
            <div className={classes.ProjectsMenu}>
                <Backdrop showModal={this.props.showProjectSetting} clickedBackdrop={this.props.onCloseSettingProjectModal} />
                <Modal showModal={this.props.showProjectSetting}>
                    <ProjectSetting
                        userRoleOfActiveProject={userRoleOfActiveProject}
                        projectName={this.props.activeProject}
                        loadingEditPrjName={this.props.loadingEditPrjName}
                        loadingInvitation={this.props.loadingInvitation}
                        closeSettingProject={this.props.onCloseSettingProjectModal}
                        clickedEditName={this.editeProjectName}
                        clickedAddMember={this.inviteMember} />
                    <ProjectMembers loadingGetMembers={this.props.loadingGetMembers}>
                        {members}
                    </ProjectMembers>
                    {userRoleOfActiveProject === 'Admin' &&
                        <button className={classes.DeleteProjectBtn} onClick={this.deleteProjectHandler}>
                            حذف پروژه
                        </button>
                    }
                    {userRoleOfActiveProject === 'User' &&
                        <button className={classes.DeleteProjectBtn} onClick={this.userLeaveProjectHandler}>
                            ترک گروه
                        </button>
                    }
                </Modal>
                <Backdrop showModal={this.state.showModal} clickedBackdrop={this.closeAddProjectModal} />
                <Modal showModal={this.state.showModal}>
                    <CreationProjectForm
                        cancelBtnClicked={this.closeAddProjectModal}
                        saveBtnClicked={this.addProjectHandler}
                    />
                </Modal>
                <div className={classes.ProjectsHeader}>
                    <span>پروژه ها</span>
                    <AddButton clickeAddBtn={this.openAddProjectModal} />
                </div>
                <Projects creatingProject={this.props.createProjectLoading}>
                    {projects}
                </Projects>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.dashboard.projects,
        activeProject: state.dashboard.activeProject,
        activeProjectId: state.dashboard.activeProjectId,
        activeProjectMembers: state.dashboard.activeProjectMembers,
        profileData: state.dashboard.profileData,
        showProjectSetting: state.dashboard.showProjectSetting,
        token: state.auth.accessToken,
        createProjectLoading: state.dashboard.loadingCrtPrj,
        loadingEditPrjName: state.dashboard.loadingEditPrjName,
        loadingGetMembers: state.dashboard.loadingGetMembers,
        loadingInvitation: state.dashboard.loadingInvitation,
        loadingDeleteMember: state.dashboard.loadingDeleteMember
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddNewProject: (projectName, accessToken) => dispatch(actions.addNewProject(projectName, accessToken)),
        onDeleteProject: (projectId, accessToken) => dispatch(actions.deleteProject(projectId, accessToken)),
        onEditProjectName: (projectName, projectId, accessToken)=> dispatch(actions.editProjectName(projectName, projectId, accessToken)),
        onShowSettingProjectModal: () => dispatch(actions.showSettingProjectModal()),
        onCloseSettingProjectModal: () => dispatch(actions.closeSettingProjectModal()),
        onChangeActiveProject: (projectName, projectId) => dispatch(actions.changeActiveProject(projectName, projectId)),
        onInitializeActiveProjectMembers: (projectId, token) => dispatch(actions.initializeActiveProjectMembers(projectId, token)),
        onUserLeaveProject: (projectId, accessToken) => dispatch(actions.userLeaveProject(projectId, accessToken)),
        onInviteMember: (userMail, projectId, token) => dispatch(actions.inviteMember(userMail, projectId, token)),
        onDeleteMember: (userEmail, projectId, token) => dispatch(actions.deleteMember(userEmail, projectId, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsMenu);