import React, { Component } from 'react';
import classes from './ProjectsDashboard.module.css';

import Header from '../Header/Header';
import ProjectsMenu from '../ProjectsMenu/ProjectsMenu';
import ProjectArea from '../ProjectArea/ProjectArea';

import { connect } from 'react-redux';
import Notification from '../Ui/Notification/Notification';
import NotificationMenu from '../NotificationMenu/NotificationMenu';
import NotificationItem from '../NotificationMenu/NotificationItem/NotificationItem';

import * as actions from '../../store/actions/index'


class ProjectsDashboard extends Component {

    state = {
        showProfile: false
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
        this.props.onConfirmedInvite(projectName, projectId, this.props.access);
    }
    
    rejectedInviteHandler = (projectId) => {
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
                    clickedConfirmed={() => this.confirmedInviteHandler(project[projectId].projectName, projectId)}
                    clickedRejected={() => this.rejectedInviteHandler(projectId)} />
            );
        });

        return(
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
                                <p className={classes.ShowEmptyNotification}>پیغامی برای هم گروهی شدن ندارید</p> :
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
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.dashboard.projects,
        notifCounter: state.dashboard.notifCounter,
        showNotification: state.dashboard.showNotification,
        profileData: state.dashboard.profileData,
        access: state.auth.accessToken
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