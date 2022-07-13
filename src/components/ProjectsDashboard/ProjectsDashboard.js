import React, { Component } from 'react';
import classes from './ProjectsDashboard.module.css';

import Header from '../Header/Header';
import ProjectsMenu from '../ProjectsMenu/ProjectsMenu';
import ProjectArea from '../ProjectArea/ProjectArea';

import { connect } from 'react-redux';
import Notification from '../Ui/Notification/Notification';
import NotificationMenu from '../NotificationMenu/NotificationMenu';
import NotificationItem from '../NotificationMenu/NotificationItem/NotificationItem';

import axios from 'axios';

import * as actionTypes from '../../store/actions/actionTypes';


class ProjectsDashboard extends Component {

    state = {
        showNotification: false
    }

    showNotificationHandler = () => {
        this.setState({
            showNotification: true
        });
    }

    closeNotificationHandler = () => {
        this.setState({
            showNotification: false
        });
    }

    confirmedHandler = (projectName, projectId) => {
        
        let accesToken = this.props.token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        const data = {
            "project_id": projectId,
            "confirmed": true
        }

        let config = {
            method: 'post',
            url: 'http://localhost:8000/project/invite/answer/',
            headers: { 
              'Authorization': `Bearer ${accesToken}`, 
              'Content-Type': 'application/json'
            },
            data: data
        };
        console.log('confirmed');
        axios(config)
            .then(response => {
                
                this.props.onUpdateConfirmedProject(projectId);
                this.props.onUpdateActiveProject(projectName, projectId);
                this.props.onUpdateNotifCounter();
                this.closeNotificationHandler();
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    rejectedHandler = () => {
        console.log('rejected');
    }

    render() {
        let counter = 0;
        const inconfirmedProjects = this.props.projects.map(project => {
            let projectId = Object.keys(project)[0];
            if(project[projectId].confirmed === true) {
                return null;
            }
            counter++;
            return (
                <NotificationItem 
                    key={project[projectId].inviter.username}
                    inviterUsername={project[projectId].inviter.username} 
                    projectName={project[projectId].projectName}
                    clickedConfirmed={() => this.confirmedHandler(project[projectId].projectName, projectId)}
                    clickedRejected={() => this.rejectedHandler(projectId)} />
            );
        });

        return(
            <>
                <Header />
                <div className={classes.ProjectsDashboard}>
                    {this.state.showNotification && 
                        <NotificationMenu clickedCloseNotification={this.closeNotificationHandler}>
                            {inconfirmedProjects}
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
        notifCounter: state.dashboard.notifCounter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateConfirmedProject: 
            projectId => dispatch({type: actionTypes.UPDATE_CONFIRMED_PROJECT, projectId}),
        onUpdateActiveProject: 
            (activePrjName, activePrjId) => dispatch(
                {type: actionTypes.UPDATE_ACTIVE_PROJECT, activePrjName, activePrjId}
            ),
        onUpdateNotifCounter: () => dispatch({type: actionTypes.UPDATE_NOTIF_COUNTER})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsDashboard);