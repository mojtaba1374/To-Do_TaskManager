import * as actionTypes from './actionTypes';
import axios from '../../axios';

const TASK_PHASE = {
    todo: 'TODO',
    doing: 'DOING',
    done: 'DONE'
};

// GET USER PROFILE DATA

const successGetUserProfileData = (profileData) => {
    return {
        type: actionTypes.SUCCESS_GET_USER_PROFILE_DATA,
        profileData
    };
};

const failGetUserProfileData = () => {
    return {
        type: actionTypes.FAIL_GET_USER_PROFILE_DATA
    };
};

export const getUserProfileData = token => {
    return dispatch => {
        let accesToken = token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        let config = {
            method: 'GET',
            url: `/api/profile/`,
            headers: { 
                'Authorization': `Bearer ${accesToken}`
            }
        };

        axios(config)
            .then(response => {
                dispatch(successGetUserProfileData(response.data));
                // this.props.onSetUserProfile(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                dispatch(failGetUserProfileData());
                console.log(error);
            });
    };
};

// INITIALIZE PROJECTS FROM SERVER

const startInitializeProjects = () => {
    return {
        type: actionTypes.START_INITIALIZE_PROJECTS
    };
};

const successinitializeProjects = projects => {
    return {
        type: actionTypes.SUCCESS_INITIALIZE_PROJECTS,
        projects
    };
};

const failInitializeProjects = error => {
    return {
        type: actionTypes.FAIL_INITIALIZE_PROJECTS,
        error
    };
};

export const setExistProjects = accessToken => {
    return dispatch => {
        
        dispatch(startInitializeProjects());
        let projects = [];

        let accesToken = accessToken;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }
        let config = {
            method: 'get',
            url: '/projects/',
            headers: { 
                'Authorization': `Bearer ${accesToken}`
            }
        };
        axios(config)
            .then(response => {
                console.log(response.data);
                projects = response.data.map(project => {

                    const todoTasks = [];
                    const doingTasks = [];
                    const doneTasks = [];

                    project.tasks.forEach(task => {
                        if(task.phase === TASK_PHASE.todo) {
                            todoTasks.push(task);
                        } else if(task.phase === TASK_PHASE.doing) {
                            doingTasks.push(task);
                        } else if(task.phase === TASK_PHASE.done) {
                            doneTasks.push(task);
                        }
                    });
                    // console.log(project.tasks);
                    return({
                        [project.id]: {
                            id: project.id,
                            projectName: project.name,
                            confirmed: project.confirmed,
                            inviter: project.inviter,
                            userRole: project['user_role'],
                            columns: {
                                'column-1': {
                                  id: 'column-1',
                                  title: 'برای انجام',
                                  tasks: todoTasks,
                                },
                                'column-2': {
                                  id: 'column-2',
                                  title: 'در حال انجام',
                                  tasks: doingTasks,
                                },
                                'column-3': {
                                  id: 'column-3',
                                  title: 'انجام شده',
                                  tasks: doneTasks,
                                },
                            }
                        }
                    });
                });
                console.log(projects);
                dispatch(successinitializeProjects(projects));
            })
            .catch(error => {
                dispatch(failInitializeProjects(error))
                console.log(error);
            })
    }
};

// CHANGE ACTIVE PROJECT

export const changeActiveProject = (projectName, projectId) => {
    return {
        type: actionTypes.CHANGE_ACTIVE_PROJECT,
        projectName,
        projectId
    };
};

// ADD NEW PROJECT

const startAddNewProject = () => {
    return {
        type: actionTypes.START_ADD_NEW_PROJECT
    };
};

const successAddNewProject = (project, projectName, projectId) => {
    return {
        type: actionTypes.SUCCESS_ADD_NEW_PROJECT,
        project,
        projectName,
        projectId 
    };
};

const failAddNewProject = error => {
    return {
        type: actionTypes.FAIL_ADD_NEW_PROJECT,
        error
    };
};

export const addNewProject = (projectName, accessToken) => {
    
    return dispatch => {
        
        dispatch(startAddNewProject());
        let projectId;
        let accesToken = accessToken;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }
        
        let data = { name: projectName };
        let config = {
            method: 'post',
            url: '/project/',
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            },
            data : data
        };

        axios(config)
            .then(response => {
                projectId = response.data.id;
                const project = {
                    [projectId]: {
                        id: projectId,
                        projectName: projectName,
                        confirmed: true,
                        inviter: null,
                        userRole: 'Admin',
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
                console.log(project);
                dispatch(successAddNewProject(project, projectName, projectId));
            })
            .catch(error => {
                dispatch(failAddNewProject(error));
                console.log(error);
            });
    };
};

// OPEN AND CLOSE SETTING PROJECT MODAL

export const showSettingProjectModal = () => {
    return {
        type: actionTypes.SHOW_SETTING_PROJECT_MODAL
    };
};

export const closeSettingProjectModal = () => {
    return {
        type: actionTypes.CLOSE_SETTING_PROJECT_MODAL
    };
};

// DELETE ACTIVE PROJECT WITH ADMIN

const startDeleteProject = () => {
    return {
        type: actionTypes.START_DELETE_PROJECT
    };
};

const successDeleteProject = projectId => {
    return {
        type: actionTypes.SUCCESS_DELETE_PROJECT,
        projectId: projectId
    };
};

const failDeleteProject = () => {
    return {
        type: actionTypes.FAIL_DELETE_PROJECT
    };
};


export const deleteProject = (activeProjectId, token) => {
    return dispatch => {

        dispatch(startDeleteProject());
        let accesToken = token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        let config = {
            method: 'DELETE',
            url: `/project/${+activeProjectId}/`,
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            }
        };
        
        axios(config)
            .then(response => {
                dispatch(successDeleteProject(activeProjectId));
                console.log(response);
            })
            .catch(error => {
                dispatch(failDeleteProject());
                console.log(error)
            });
    }
};

// EDIT NAME OF ACTIVE PROJECT

const startEditProjectName = () => {
    return {
        type: actionTypes.START_EDIT_PROJECT_NAME
    };
};

const successEditProjectName = (projectId, projectName) => {
    return {
        type: actionTypes.SUCCESS_EDIT_PROJECT_NAME,
        projectId,
        projectName
    };
};
const failEditProjectName = () => {
    return {
        type: actionTypes.FAIL_EDIT_PROJECT_NAME
    };
};

export const editProjectName = (projectName, activeProjectId, token) => {
    return dispatch => {
        dispatch(startEditProjectName());
        let accesToken = token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        const data = {
            name: projectName
        };

        let config = {
            method: 'PUT',
            url: `/project/${+activeProjectId}/`,
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            },
            data: data
        };
        
        axios(config)
            .then(response => {
                dispatch(successEditProjectName(activeProjectId, projectName));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(failEditProjectName());
                console.log(error)
            });
    };
};

// GET ACTIVEPROJECT MEMBER FROM SERVER

const startinitializeActiveProjectMembers = () => {
    return {
        type: actionTypes.START_INITIALIZE_ACTIVEPROJECT_MEMBERS
    };
};

const successinitializeActiveProjectMembers = projectMembers => {
    return {
        type: actionTypes.SUCCESS_INITIALIZE_ACTIVEPROJECT_MEMBERS,
        projectMembers
    };
};

const FailinitializeActiveProjectMembers = () => {
    return {
        type: actionTypes.FAIL_INITIALIZE_ACTIVEPROJECT_MEMBERS
    };
};

export const initializeActiveProjectMembers = (projectId, token) => {

    return dispatch => {
        dispatch(startinitializeActiveProjectMembers());
        let projectMembers = [];
        let accesToken = token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        let config = {
            method: 'GET',
            url: `/project/${projectId}/members`,
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            }
        };
        axios(config)
            .then(response => {
                projectMembers = response.data;
                dispatch(successinitializeActiveProjectMembers(projectMembers));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(FailinitializeActiveProjectMembers());
                console.log(error)
            });
    };
};

// LEAVE PROJECT WITH MEMBER OF PROJECT

const startUserLeaveProject = () => {
    return {
        type: actionTypes.START_USER_LEAVE_PROJECT
    };
};

const failUserLeaveProject = () => {
    return {
        type: actionTypes.FAIL_USER_LEAVE_PROJECT
    };
};

export const userLeaveProject = (projectId, token) => {
    return dispatch => {

        dispatch(startUserLeaveProject());
        let accesToken = token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        let config = {
            method: 'DELETE',
            url: `/project/${+projectId}/member/`,
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            }
        };
        
        axios(config)
            .then(response => {
                // dispatch(successUserLeaveProject(projectId));
                dispatch(successDeleteProject(projectId));
                dispatch(closeSettingProjectModal());
                // this.setState({showSetting: false});
                console.log(response);
            })
            .catch(error => {
                dispatch(failUserLeaveProject());
                console.log(error)
            });
    };
};


// INVITE MEMBER TO PROJECT

const startInviteMember = () => {
    return {
        type: actionTypes.START_INVITE_MEMBER
    };
};

const successInviteMember = projecMember => {
    return {
        type: actionTypes.SUCCESS_INVITE_MEMBER,
        projecMember
    };
};

const failInviteMember = () => {
    return {
        type: actionTypes.FAIL_INVITE_MEMBER
    };
};

export const inviteMember = (userMail, projectId, token) => {
    return dispatch => {
        dispatch(startInviteMember());
        let accesToken = token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        let data = {
            "project_id": +projectId,
            "user_email": userMail
        };
        console.log(data);

        let config = {
            method: 'post',
            url: '/project/invite/',
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            },
            data : data
        };

        axios(config)
            .then(response => {
                let projecMember = {
                    confirmed: false,
                    email: userMail,
                    "user_role": "User",
                    username: response.data.username
                };
                dispatch(successInviteMember(projecMember));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(failInviteMember());
                console.log(error);
            })
    };
};

// DELETE MEMBER BY ADMIN

const startDeleteMember = () => {
    return {
        type: actionTypes.START_DELETE_MEMBER      
    };
};

const successDeleteMember = userEmail => {
    return {
        type: actionTypes.SUCCESS_DELETE_MEMBER,
        userEmail     
    };
};

const failDeleteMember = () => {
    return {
        type: actionTypes.FAIL_DELETE_MEMBER     
    };
};

export const deleteMember = (userEmail, projectId, token) => {
    return dispatch => {
        dispatch(startDeleteMember);
        let accesToken = token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        const data = {
            email: userEmail
        };

        let config = {
            method: 'DELETE',
            url: `/project/${+projectId}/member/`,
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            },
            data: data
        };
        
        axios(config)
            .then(response => {
                dispatch(successDeleteMember(userEmail));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(failDeleteMember());
                console.log(error);
            });
    };
};

// OPEN AND CLOSE NOTIFICATION STATUS

export const openNotificationStatus = () => {
    return {
        type: actionTypes.OPEN_NOTIFICATION_STATUS
    };
};

export const closeNotificationStatus = () => {
    return {
        type: actionTypes.CLOSE_NOTIFICATION_STATUS
    };
};

// CONFIRMED INVITE

const startConfirmedInvite = () => {
    return {
        type: actionTypes.START_CONFIRMED_INVITE
    };
};

const successConfirmedInvite = (projectName, projectId) => {
    return {
        type: actionTypes.SUCCESS_CONFIRMED_INVITE,
        projectName,
        projectId
    };
};

const failConfirmedInvite = () => {
    return {
        type: actionTypes.FAIL_CONFIRMED_INVITE
    };
};

export const confirmedInvite = (projectName, projectId, token) => {
    return dispatch => {

        dispatch(startConfirmedInvite());
        let accesToken = token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        const data = {
            "project_id": projectId,
            "confirmed": true
        }

        let config = {
            method: 'post',
            url: '/project/invite/answer/',
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            },
            data: data
        };
        
        axios(config)
            .then(response => {
                dispatch(successConfirmedInvite(projectName, projectId))
                console.log(response.data);
            })
            .catch(error => {
                dispatch(failConfirmedInvite());
                console.log(error);
            });
    };
};

// INCONFIRMED INVITE

const startInonfirmedInvite = () => {
    return {
        type: actionTypes.START_INCONFIRMED_INVITE
    };
};

const successInconfirmedInvite = projectId => {
    return {
        type: actionTypes.SUCCESS_INCONFIRMED_INVITE,
        projectId
    };
};

const failInconfirmedInvite = () => {
    return {
        type: actionTypes.FAIL_INCONFIRMED_INVITE
    };
};

export const inconfirmedInvite = (projectId, token) => {
    return dispatch => {

        dispatch(startInonfirmedInvite());
        let accesToken = token;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        const data = {
            "project_id": projectId,
            "confirmed": false
        }

        let config = {
            method: 'post',
            url: 'http://localhost:8000/project/invite/answer/',
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            },
            data: data
        };
        
        axios(config)
            .then(response => {
                dispatch(successInconfirmedInvite(projectId));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(failInconfirmedInvite());
                console.log(error);
            });
    };
};

// CREATE TODO TASK TO ACTIVE PROJECT

const startCreateTodoTask = () => {
    return {
        type: actionTypes.START_CREATE_TODO_TASK
    };
};

const successCreateTodoTask = task => {
    return {
        type: actionTypes.SUCCESS_CREATE_TODO_TASK,
        task: task
    };
};

const failCreateTodoTask = () => {
    return {
        type: actionTypes.FAIL_CREATE_TODO_TASK
    };
};

export const createTodoTask = (taskTitle, activeProjectId, accessToken) => {
    return dispatch => {
        dispatch(startCreateTodoTask());

        let accesToken = accessToken;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }
        
        let data = { title: taskTitle };
        let config = {
            method: 'post',
            url: `/project/${+activeProjectId}/task/`,
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            },
            data : data
        };

        axios(config)
            .then(response => {
                console.log(response.data);
                const createdTask = response.data;
                const task = createdTask;
                dispatch(successCreateTodoTask(task));
            })
            .catch(error => {
                dispatch(failCreateTodoTask(error));
                console.log(error);
            });
    };
};

// DRAG TASK IN SAME COLUMN

const successDragTaskSameColumn = (newColumn) => {
    return {
        type: actionTypes.SUCCESS_DRAG_TASK_SAME_COLUMN,
        newColumn
    };
};

const failDragTaskSameColumn = (sourceCol, error) => {
    return {
        type: actionTypes.FAIL_DRAG_TASK_SAME_COLUMN,
        sourceCol,
        error
    };
};

export const dragTaskSameColumn = (taskId, newPosition, destinationCol, newColumn, accessToken, sourceCol) => {
    return dispatch => {

        let accesToken = accessToken;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        let phase;
        if(destinationCol === 'column-1') { phase = TASK_PHASE.todo ;}
        if(destinationCol === 'column-2') { phase = TASK_PHASE.doing ;}
        if(destinationCol === 'column-3') { phase = TASK_PHASE.done ;}
        
        let data = {
            phase : phase,
            'row_position' : +newPosition,
        }
        console.log(data);
        console.log(taskId);
        console.log(newPosition);
        console.log(destinationCol);
        console.log(newColumn);

        let config = {
            method: 'PUT',
            url: `/project/task/${taskId}/`,
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            },
            data : data
        };

        dispatch(successDragTaskSameColumn(newColumn));
        axios(config)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                dispatch(failDragTaskSameColumn(sourceCol, error));
                console.log(error);
            });
    };
};

// DRAG TASK IN OTHER COLUMN

const successDragTaskOtherColumn = (newStartColumn, newEndColumn) => {
    return {
        type: actionTypes.SUCCESS_DRAG_TASK_OTHER_COLUMN,
        newStartColumn,
        newEndColumn
    };
};

const failDragTaskOtherColumn = (sourceStartCol, sourceEndCol, error) => {
    return {
        type: actionTypes.FAIL_DRAG_TASK_OTHER_COLUMN,
        sourceStartCol,
        sourceEndCol,
        error
    };
};

export const dragTaskOtherColumn = (taskId, newPosition, destinationCol, newStartColumn, newEndColumn, accessToken, sourceStartCol, sourceEndCol) => {
    return dispatch => {

        let accesToken = accessToken;
        if(!accesToken) {
            accesToken = localStorage.getItem('access');
        }

        let phase;
        if(destinationCol === 'column-1') { phase = TASK_PHASE.todo ;}
        if(destinationCol === 'column-2') { phase = TASK_PHASE.doing ;}
        if(destinationCol === 'column-3') { phase = TASK_PHASE.done ;}
        
        let data = {
            phase : phase,
            'row_position' : +newPosition,
        }
        console.log(data);
        console.log(taskId);
        console.log(newPosition);
        console.log(destinationCol);
        console.log(newStartColumn);
        console.log(newEndColumn);

        let config = {
            method: 'PUT',
            url: `/project/task/${taskId}/`,
            headers: { 
              'Authorization': `Bearer ${accesToken}`
            },
            data : data
        };

        dispatch(successDragTaskOtherColumn(newStartColumn, newEndColumn));
        axios(config)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                dispatch(failDragTaskOtherColumn(sourceStartCol, sourceEndCol, error));
                console.log(error);
            });
    };
};