import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activeProject: '',
    activeProjectId: null,
    projects: [],
    activeProjectMembers: [],
    loading: false,
    showProjectSetting: false,
    showNotification: false,
    profileData: null
};

const reducer = (state = initialState, action) => {
    let updatedState;
    switch(action.type) {
        case actionTypes.SUCCESS_GET_USER_PROFILE_DATA:
            updatedState = {
                ...state,
                profileData: action.profileData
            };
            break;
        case actionTypes.FAIL_GET_USER_PROFILE_DATA:
            updatedState = {
                ...state
            };
            break;
        case actionTypes.START_INITIALIZE_PROJECTS:
            updatedState = {
                ...state,
                loading: true
            };
            break;
        case actionTypes.SUCCESS_INITIALIZE_PROJECTS:
            updatedState = {
                ...state,
                loading: false,
                projects: action.projects
            };
            break;
        case actionTypes.FAIL_INITIALIZE_PROJECTS:
            updatedState = {
                ...state,
                loading: false
            }
            break;
        case actionTypes.START_ADD_NEW_PROJECT:
            updatedState = {
                ...state,
                loading: true
            };
            break;
        case actionTypes.SUCCESS_ADD_NEW_PROJECT:
            updatedState = {
                ...state,
                loading: false,
                projects: state.projects.concat(action.project),
                activeProject: action.projectName,
                activeProjectId: action.projectId
            };
            break;
        case actionTypes.FAIL_ADD_NEW_PROJECT:
            updatedState = {
                ...state,
                loading: false
            };
            break;
        case actionTypes.CHANGE_ACTIVE_PROJECT:
            updatedState = {
                ...state,
                activeProject: action.projectName,
                activeProjectId: action.projectId,
            };
            break;
        case actionTypes.START_DELETE_PROJECT:
            updatedState = {
                ...state,
                loading: true
            };
            break;
        case actionTypes.SUCCESS_DELETE_PROJECT:
            const copiedProjects = [...state.projects];
            const filteringProjects = [...copiedProjects];
            copiedProjects.forEach((project, idx) => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +action.projectId) {
                    filteringProjects.splice(idx, 1);
                }
            });
            updatedState = {
                ...state,
                loading: false,
                showProjectSetting: false,
                projects: filteringProjects,
                activeProject: '',
                activeProjectId: null
            };
            break;
        case actionTypes.FAIL_DELETE_PROJECT:
            updatedState = {
                ...state,
                loading: false
            }
            break;
        case actionTypes.SHOW_SETTING_PROJECT_MODAL:
            updatedState = {
                ...state,
                showProjectSetting: true
            };
            break;
        case actionTypes.CLOSE_SETTING_PROJECT_MODAL:
            updatedState = {
                ...state,
                showProjectSetting: false
            };
            break;
        case actionTypes.START_EDIT_PROJECT_NAME:
            updatedState = {
                ...state,
                loading: true
            };
            break;
        case actionTypes.SUCCESS_EDIT_PROJECT_NAME:
            console.log(typeof action.projectId);
            const copyFromProjects = [...state.projects];
            copyFromProjects.forEach((project, idx) => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +action.projectId) {
                    project[prjId].projectName = action.projectName
                }
            });
            updatedState = {
                ...state,
                projects: copyFromProjects,
                activeProjectId: action.projectId,
                activeProject: action.projectName
            };
            break;
        case actionTypes.FAIL_EDIT_PROJECT_NAME:
            updatedState = {
                ...state,
                loading: false
            };
            break;
        case actionTypes.START_INITIALIZE_ACTIVEPROJECT_MEMBERS:
            updatedState = {
                ...state,
                loading: true
            };
            break;
        case actionTypes.SUCCESS_INITIALIZE_ACTIVEPROJECT_MEMBERS:
            updatedState = {
                ...state,
                loading: false,
                activeProjectMembers: action.projectMembers
            };
            break;
        case actionTypes.FAIL_INITIALIZE_ACTIVEPROJECT_MEMBERS:
            updatedState = {
                ...state,
                loading: false
            };
            break;
        case actionTypes.START_USER_LEAVE_PROJECT:
            updatedState = {
                ...state,
                loading: true
            };
            break;
        case actionTypes.FAIL_USER_LEAVE_PROJECT:
            updatedState = {
                ...state,
                loading: false
            };
            break;
        case actionTypes.START_INVITE_MEMBER:
            updatedState = {
                ...state,
                loading: true
            };
            break;
        case actionTypes.SUCCESS_INVITE_MEMBER:
            const projectMembers = [...state.activeProjectMembers];
            projectMembers.push(action.projecMember)
            updatedState = {
                ...state,
                loading: false,
                activeProjectMembers: projectMembers
            };
            break;
        case actionTypes.FAIL_INVITE_MEMBER:
            updatedState = {
                ...state,
                loading: false
            };
            break;
        case actionTypes.START_DELETE_MEMBER:
            updatedState = {
                ...state,
                loading: true
            };
            break;
        case actionTypes.SUCCESS_DELETE_MEMBER:
            const copyProjectMembers = [...state.activeProjectMembers];
            const newProjectMembers = [...copyProjectMembers];
            copyProjectMembers.forEach((member, idx) => {
                if(member.email === action.userEmail) {
                    newProjectMembers.splice(idx, 1);
                }
            });
            updatedState = {
                ...state,
                loading: false,
                activeProjectMembers: newProjectMembers
            };
            break;
        case actionTypes.FAIL_DELETE_MEMBER:
            updatedState = {
                ...state,
                loading: false
            };
            break;
        case actionTypes.OPEN_NOTIFICATION_STATUS:
            updatedState = {
                ...state,
                showNotification: true
            };
            break;
        case actionTypes.CLOSE_NOTIFICATION_STATUS:
            updatedState = {
                ...state,
                showNotification: false
            };
            break;
        case actionTypes.START_CONFIRMED_INVITE:
            updatedState = {
                ...state,
                loading: true
            };
            break;
        case actionTypes.SUCCESS_CONFIRMED_INVITE:
            const copyOfProjects = [...state.projects];
            copyOfProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +action.projectId) {
                    project[prjId].confirmed = true;
                }
            });
            updatedState = {
                ...state,
                loading: false,
                showNotification: false,
                activeProject: action.projectName,
                activeProjectId: action.projectId,
                projects: copyOfProjects
            };
            break;
        case actionTypes.FAIL_CONFIRMED_INVITE:
            updatedState = {
                ...state,
                loading: false
            };
            break;
        case actionTypes.START_INCONFIRMED_INVITE:
            updatedState = {
                ...state,
                loading: true
            };
            break;
        case actionTypes.SUCCESS_INCONFIRMED_INVITE:
            const copingProjects = [...state.projects];
            const filteredProjects = [...copingProjects];
            copingProjects.forEach((project, idx) => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +action.projectId) {
                    filteredProjects.splice(idx, 1);
                }
            });
            updatedState = {
                ...state,
                loading: false,
                projects: filteredProjects
            };
            break;
        case actionTypes.FAIL_INCONFIRMED_INVITE:
            updatedState = {
                ...state,
                loading: false
            };
            break;
        case 'ADD_TODO_TASK_FOR_ACTIVE_PROJECT':
            const updatedProjects = [...state.projects];

            updatedProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    project[prjId].columns['column-1'].tasks.push({
                        [Math.random() + action.taskContent]: {
                            id: prjId + action.taskContent,
                            name: action.taskContent,
                            column: 'column-1'
                        }
                    });
                }
            });

            updatedState = {
                ...state,
                projects: updatedProjects
            };
            break;
        case 'DRAG_TASK_IN_SAME_COLUMN':
            // console.log(action.newTasksArr);
            const updateProjects = [...state.projects];

            updateProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    // console.log(action.newColumn.id);
                    project[prjId].columns = {
                        ...project[prjId].columns,
                        [action.newColumn.id]: action.newColumn
                    }
                    console.log(project);
                }
            });
            updatedState = {
                ...state,
                projects: updateProjects
            };
            break;
        case 'DRAG_TASK_IN_OTHER_COLUMN':
            const copyProjects = [...state.projects];

            copyProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    // console.log(action.newColumn.id);
                    project[prjId].columns = {
                        ...project[prjId].columns,
                        [action.newStartCol.id]: action.newStartCol,
                        [action.newEndCol.id]: action.newEndCol,
                    }
                }
            });
            updatedState = {
                ...state,
                projects: copyProjects
            };
            break;
        case 'UPDATE_NOTIF_COUNTER':
            updatedState = {
                ...state,
                notifCounter: state.notifCounter - 1
            };
            break;
        default:
            updatedState = state;
    }
    return updatedState;
};

export default reducer;