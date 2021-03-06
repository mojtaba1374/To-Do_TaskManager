import React, { Component } from 'react';
import classes from './ProjectsDashboard.module.css';

import Header from '../Header/Header';
import ProjectsMenu from '../ProjectsMenu/ProjectsMenu';
import ProjectArea from '../ProjectArea/ProjectArea';

import Notification from '../Ui/Notification/Notification';
import NotificationMenu from '../NotificationMenu/NotificationMenu';
import NotificationItem from '../NotificationMenu/NotificationItem/NotificationItem';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import PageLoading from '../Ui/Loader/PageLoading/PageLoading';


class ProjectsDashboard extends Component {

    state = {
        showProfile: false,
        invitationProjectId: ''
    }

    componentDidMount() {
        this.props.onSetExistProjects(this.props.access);
        this.props.onGetUserProfileDat(this.props.access);
    }

    showNotificationHandler = () => {
        this.props.onOpenNotificationStatus();
    }
    
    closeNotificationHandler = () => {
        this.props.onCloseNotificationStatus();
    }

    confirmedInviteHandler = (projectName, projectId) => {
        this.setState({
            invitationProjectId: projectId
        });
        this.props.onConfirmedInvite(projectName, projectId, this.props.access);
    }
    
    rejectedInviteHandler = (projectId) => {
        this.setState({
            invitationProjectId: projectId
        });
        this.props.onInconfirmedInvite(projectId, this.props.access);
    }

    toggleUserProfile = () => {
        this.setState(prevState => {
            return {
                showProfile: !prevState.showProfile
            };
        });
    }

    render() {
        let counter = 0;
        const inconfirmedProjects = this.props.projects.map((project, idx) => {
            let projectId = Object.keys(project)[0];
            if(project[projectId].confirmed === true) {
                return null;
            }
            counter++;
            return (
                <NotificationItem 
                    key={project[projectId].inviter.username + idx}
                    inviterUsername={project[projectId].inviter.username} 
                    projectName={project[projectId].projectName}
                    projectId={projectId}
                    invitationProjectId={this.state.invitationProjectId}
                    loadingConfirmedInvite={this.props.loadingConfirmedInvite}
                    loadingInconfirmedInvite={this.props.loadingInconfirmedInvite}
                    clickedConfirmed={() => this.confirmedInviteHandler(project[projectId].projectName, projectId)}
                    clickedRejected={() => this.rejectedInviteHandler(projectId)} />
            );
        });

        return(
            <>
                {(this.props.loadingProfile && this.props.loadingProjects) ?
                    <div className={classes.PageLoading}>
                        <PageLoading /> 
                    </div>
                    :
                    <>
                        <Header 
                            showProfile={this.state.showProfile}
                            username={this.props.profileData && this.props.profileData.username}
                            email={this.props.profileData && this.props.profileData.email}
                            clickedProfile={this.toggleUserProfile}>
                        </Header>
                        <div className={classes.ProjectsDashboard}>
                            {this.props.showNotification && 
                                <NotificationMenu clickedCloseNotification={this.closeNotificationHandler}>
                                    {counter === 0 ?
                                        <p className={classes.ShowEmptyNotification}>???????????? ???????? ???? ?????????? ?????? ????????????</p> :
                                        inconfirmedProjects
                                    }
                                </NotificationMenu>
                            }
                            <ProjectsMenu />
                            <ProjectArea />
                            <Notification
                                clickedNotification={this.showNotificationHandler}
                                count={counter} />
                        </div>
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.dashboard.projects,
        notifCounter: state.dashboard.notifCounter,
        showNotification: state.dashboard.showNotification,
        profileData: state.dashboard.profileData,
        access: state.auth.accessToken,
        loadingProfile: state.dashboard.loadingProfile,
        errorProfile: state.dashboard.errorProfile,
        loadingProjects: state.dashboard.loadingProjects,
        errorProjects: state.dashboard.errorProject,
        loadingConfirmedInvite: state.dashboard.loadingConfirmedInvite,
        loadingInconfirmedInvite: state.dashboard.loadingInconfirmedInvite
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetExistProjects: accessToken => dispatch(actions.setExistProjects(accessToken)),
        onGetUserProfileDat: () => dispatch(actions.getUserProfileData()),
        onOpenNotificationStatus: () => dispatch(actions.openNotificationStatus()),
        onCloseNotificationStatus: () => dispatch(actions.closeNotificationStatus()),
        onConfirmedInvite: (projectName, projectId, token) => dispatch(actions.confirmedInvite(projectName, projectId, token)),
        onInconfirmedInvite: (projectI, token) => dispatch(actions.inconfirmedInvite(projectI, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsDashboard);