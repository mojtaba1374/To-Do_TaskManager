import * as actionTypes from '../actions/actionTypes';

const initialState = {
    profileData: null,
    activeProject: '',
    activeProjectId: null,
    projects: [],
    activeProjectMembers: [],
    loading: false,
    showProjectSetting: false,
    showNotification: false,
    loadingProfile: false,
    errorProfile: null,
    loadingProjects: false,
    errorProjects: null,
    loadingCrtPrj: false,
    errorCrtPrj: null,
    loadingDeletePrj: false,
    errorDeletePrj: null,
    loadingGetMembers: false,
    errorGetMembers: null,
    errorUserLeave: null,
    loadingInvitation: false,
    errorInvitation: null,
    loadingCreateTask: false,
    errorCreateTask: null,
    errorDragSameCol: null,
    errorDragOtherCol: null,
    loadingConfirmedInvite: false,
    errorConfirmedInvite: null,
    loadingInconfirmedInvite: false,
    errorInconfirmedInvite: null,
    loadingChangeProgress: false,
    errorChangeProgress: null,
    openDescriptionTextarea: false,
    errorChangeDescription: null,
    loadinChangeDescription: false,
    loadingChangeTaskTitle: false,
    errorChangeTaskTitle: null,
    loadingChangeTaskStartDate: false,
    errorChangeTaskStartDate: null,
    loadingDeleteTask: false,
    errorDeleteTask: null
};

const reducer = (state = initialState, action) => {
    let updatedState;
    switch(action.type) {
        case actionTypes.START_GET_USER_PROFILE_DATA:
            updatedState = {
                ...state,
                errorProfile: null,
                loadingProfile: true
            };
            break;
        case actionTypes.SUCCESS_GET_USER_PROFILE_DATA:
            updatedState = {
                ...state,
                loadingProfile: false,
                profileData: action.profileData
            };
            break;
        case actionTypes.FAIL_GET_USER_PROFILE_DATA:
            updatedState = {
                ...state,
                loadingProfile: false,
                errorProfile: action.error
            };
            break;
        case actionTypes.START_INITIALIZE_PROJECTS:
            updatedState = {
                ...state,
                loadingProjects: true,
                errorProjects: null
            };
            break;
        case actionTypes.SUCCESS_INITIALIZE_PROJECTS:
            updatedState = {
                ...state,
                loadingProjects: false,
                projects: action.projects
            };
            break;
        case actionTypes.FAIL_INITIALIZE_PROJECTS:
            updatedState = {
                ...state,
                loadingProjects: false,
                error: action.error
            }
            break;
        case actionTypes.START_ADD_NEW_PROJECT:
            updatedState = {
                ...state,
                loadingCrtPrj: true,
                errorCrtPrj: null
            };
            break;
        case actionTypes.SUCCESS_ADD_NEW_PROJECT:
            updatedState = {
                ...state,
                loadingCrtPrj: false,
                projects: state.projects.concat(action.project),
                activeProject: action.projectName,
                activeProjectId: action.projectId
            };
            break;
        case actionTypes.FAIL_ADD_NEW_PROJECT:
            updatedState = {
                ...state,
                loadingCrtPrj: false,
                errorCrtPrj: action.error
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
                loadingDeletePrj: true,
                errorDeletePrj: null
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
                loadingDeletePrj: false,
                showProjectSetting: false,
                projects: filteringProjects,
                activeProject: '',
                activeProjectId: null
            };
            break;
        case actionTypes.FAIL_DELETE_PROJECT:
            updatedState = {
                ...state,
                loadingDeletePrj: false,
                errorDeletePrj: action.error
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
                loadingEditPrjName: true,
                errorEditPrjName: null
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
                loadingEditPrjName: false,
                projects: copyFromProjects,
                activeProjectId: action.projectId,
                activeProject: action.projectName
            };
            break;
        case actionTypes.FAIL_EDIT_PROJECT_NAME:
            updatedState = {
                ...state,
                loadingEditPrjName: false,
                errorEditPrjName: action.error
            };
            break;
        case actionTypes.START_INITIALIZE_ACTIVEPROJECT_MEMBERS:
            updatedState = {
                ...state,
                errorGetMembers: null,
                loadingGetMembers: true
            };
            break;
        case actionTypes.SUCCESS_INITIALIZE_ACTIVEPROJECT_MEMBERS:
            updatedState = {
                ...state,
                loadingGetMembers: false,
                activeProjectMembers: action.projectMembers
            };
            break;
        case actionTypes.FAIL_INITIALIZE_ACTIVEPROJECT_MEMBERS:
            updatedState = {
                ...state,
                loadingGetMembers: false,
                errorGetMembers: action.error
            };
            break;
        case actionTypes.START_USER_LEAVE_PROJECT:
            updatedState = {
                ...state,
                errorUserLeave:null
            };
            break;
        case actionTypes.FAIL_USER_LEAVE_PROJECT:
            updatedState = {
                ...state,
                errorUserLeave: action.error
            };
            break;
        case actionTypes.START_INVITE_MEMBER:
            updatedState = {
                ...state,
                errorInvitation: null,
                loadingInvitation: true
            };
            break;
        case actionTypes.SUCCESS_INVITE_MEMBER:
            const projectMembers = [...state.activeProjectMembers];
            projectMembers.push(action.projecMember)
            updatedState = {
                ...state,
                loadingInvitation: false,
                activeProjectMembers: projectMembers
            };
            break;
        case actionTypes.FAIL_INVITE_MEMBER:
            updatedState = {
                ...state,
                loadingInvitation: false,
                errorInvitation: action.error
            };
            break;
        case actionTypes.START_DELETE_MEMBER:
            updatedState = {
                ...state,
                errorDeleteMember: null,
                loadingDeleteMember: true
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
                loadingDeleteMember: false,
                activeProjectMembers: newProjectMembers
            };
            break;
        case actionTypes.FAIL_DELETE_MEMBER:
            updatedState = {
                ...state,
                errorDeleteMember: action.error,
                loadingDeleteMember: false
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
                errorConfirmedInvite: null,
                loadingConfirmedInvite: true
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
                loadingConfirmedInvite: false,
                showNotification: false,
                activeProject: action.projectName,
                activeProjectId: action.projectId,
                projects: copyOfProjects
            };
            break;
        case actionTypes.FAIL_CONFIRMED_INVITE:
            updatedState = {
                ...state,
                loadingConfirmedInvite: false,
                errorConfirmedInvite: action.error
            };
            break;
        case actionTypes.START_INCONFIRMED_INVITE:
            updatedState = {
                ...state,
                errorInconfirmedInvite: null,
                loadingInconfirmedInvite: true
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
                loadingInconfirmedInvite: false,
                projects: filteredProjects
            };
            break;
        case actionTypes.FAIL_INCONFIRMED_INVITE:
            updatedState = {
                ...state,
                loadingInconfirmedInvite: false,
                errorInconfirmedInvite: action.error
            };
            break;
        case actionTypes.START_CREATE_TODO_TASK:
            updatedState = {
                ...state,
                loadingCreateTask: true,
                errorCreateTask: null
            };
            break;
        case actionTypes.SUCCESS_CREATE_TODO_TASK:
            const copiiedProjects = [...state.projects];
            
            copiiedProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    project[prjId].columns['column-1'].tasks = 
                        [...project[prjId].columns['column-1'].tasks.concat(action.task)];
                }
            });
            updatedState = {
                ...state,
                loadingCreateTask: false,
                projects: copiiedProjects
            };
            break;
        case actionTypes.FAIL_CREATE_TODO_TASK:
            updatedState = {
                ...state,
                loadingCreateTask: false,
                errorCreateTask: action.error
            };
            break;
        case actionTypes.START_DRAG_TASK_SAME_COLUMN:
            updatedState = {
                ...state,
                errorDragSameCol: null
            };
            break;
        case actionTypes.SUCCESS_DRAG_TASK_SAME_COLUMN:
            const updateProjects = [...state.projects];

            updateProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    // console.log(action.newColumn.id);
                    project[prjId].columns = {
                        ...project[prjId].columns,
                        [action.newColumn.id]: action.newColumn
                    }
                    // console.log(project);
                }
            });
            updatedState = {
                ...state,
                projects: updateProjects
            };
            break;
        case actionTypes.FAIL_DRAG_TASK_SAME_COLUMN:
            const updatingProjects = [...state.projects];

            updatingProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    // console.log(action.newColumn.id);
                    project[prjId].columns = {
                        ...project[prjId].columns,
                        [action.sourceCol.id]: action.sourceCol
                    }
                    // console.log(project);
                }
            });
            updatedState = {
                ...state,
                errorDragSameCol: action.error,
                projects: updatingProjects
            };
            break;
        case actionTypes.START_DRAG_TASK_OTHER_COLUMN:
            updatedState = {
                ...state,
                errorDragOtherCol: null
            };
            break;
        case actionTypes.SUCCESS_DRAG_TASK_OTHER_COLUMN:
            const copyProjects = [...state.projects];

            copyProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    console.log(action.newStartColumn);
                    // console.log(action.newColumn.id);
                    project[prjId].columns = {
                        ...project[prjId].columns,
                        [action.newStartColumn.id]: action.newStartColumn,
                        [action.newEndColumn.id]: action.newEndColumn,
                    }
                }
            });
            updatedState = {
                ...state,
                projects: copyProjects
            };
            break;
        case actionTypes.FAIL_DRAG_TASK_OTHER_COLUMN:
            const copyyProjects = [...state.projects];

            copyyProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    console.log(action.newStartColumn);
                    // console.log(action.newColumn.id);
                    project[prjId].columns = {
                        ...project[prjId].columns,
                        [action.sourceStartCol.id]: action.sourceStartCol,
                        [action.sourceEndCol.id]: action.sourceEndCol,
                    }
                }
            });
            updatedState = {
                ...state,
                errorDragOtherCol: action.error,
                projects: copyyProjects
            };
            break;
        case actionTypes.START_CHANGE_PROGRESS_PERCENTAGE:
            updatedState = {
                ...state,
                errorChangeProgress: null,
                loadingChangeProgress: true
            };
            break;
        case actionTypes.SUCCESS_CHANGE_PROGRESS_PERCENTAGE:
            const copProjects = [...state.projects];

            copProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    const projectColumns = {...project[prjId].columns};
                    Object.keys(projectColumns).forEach(col => {
                        console.log(projectColumns[col]);
                        projectColumns[col].tasks.forEach(task => {
                            if(task.id === + action.taskId) {
                                task.percentage = action.percentage
                            }
                        });
                    })
                }
            });
            updatedState = {
                ...state,
                loadingChangeProgress: false,
                projects: copProjects
            };
            break;
        case actionTypes.FAIL_CHANGE_PROGRESS_PERCENTAGE:
            updatedState = {
                ...state,
                loadingChangeProgress: false,
                errorChangeProgress: action.error
            };
            break;
        case actionTypes.OPEN_DESCRIPTION_TEXTAREA:
            updatedState = {
                ...state,
                openDescriptionTextarea: true
            };
            break;
        case actionTypes.CLOSE_DESCRIPTION_TEXTAREA:
            updatedState = {
                ...state,
                openDescriptionTextarea: false
            };
            break;
        case actionTypes.START_CHANGE_DESCRIPTION:
            updatedState = {
                ...state,
                errorChangeDescription: null,
                loadinChangeDescription: true
            };
            break;
        case actionTypes.SUCCESS_CHANGE_DESCRIPTION:
            const cloneProjects = [...state.projects];

            cloneProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    const projectColumns = {...project[prjId].columns};
                    Object.keys(projectColumns).forEach(col => {
                        console.log(projectColumns[col]);
                        projectColumns[col].tasks.forEach(task => {
                            if(task.id === +action.taskId) {
                                task.description = action.description
                            }
                        });
                    })
                }
            });
            updatedState = {
                ...state,
                loadinChangeDescription: false,
                projects: cloneProjects
            };
            break;
        case actionTypes.FAIL_CHANGE_DESCRIPTION:
            updatedState = {
                ...state,
                loadinChangeDescription: false,
                errorChangeDescription: action.error
            };
            break;
        case actionTypes.START_CHANGE_TASK_TITLE:
            updatedState = {
                ...state,
                errorChangeTaskTitle: null,
                loadingChangeTaskTitle: true
            };
            break;
        case actionTypes.SUCCESS_CHANGE_TASK_TITLE:
            const cloningProjects = [...state.projects];

            cloningProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    const projectColumns = {...project[prjId].columns};
                    Object.keys(projectColumns).forEach(col => {
                        console.log(projectColumns[col]);
                        projectColumns[col].tasks.forEach(task => {
                            if(task.id === +action.taskId) {
                                task.title = action.title
                            }
                        });
                    })
                }
            });
            updatedState = {
                ...state,
                loadingChangeTaskTitle: false,
                projects: cloningProjects
            };
            break;
        case actionTypes.FAIL_CHANGE_TASK_TITLE:
            updatedState = {
                ...state,
                loadingChangeTaskTitle: false,
                errorChangeTaskTitle: action.error
            }
            break;
        case actionTypes.START_CHANGE_TASK_START_DATE:
            updatedState = {
                ...state,
                errorChangeTaskStartDate: null,
                loadingChangeTaskStartDate: true
            };
            break;
        case actionTypes.SUCCESS_CHANGE_TASK_START_DATE:
            const clonedProjects = [...state.projects];

            clonedProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    const projectColumns = {...project[prjId].columns};
                    Object.keys(projectColumns).forEach(col => {
                        console.log(projectColumns[col]);
                        projectColumns[col].tasks.forEach(task => {
                            if(task.id === +action.taskId) {
                                task['start_date'] = action.startDate
                            }
                        });
                    })
                }
            });
            updatedState = {
                ...state,
                loadingChangeTaskStartDate: false,
                projects: clonedProjects
            };
            break;
        case actionTypes.FAIL_CHANGE_TASK_START_DATE:
            updatedState = {
                ...state,
                errorChangeTaskStartDate: action.error,
                loadingChangeTaskStartDate: false
            };
            break;
        case actionTypes.START_CHANGE_TASK_DUE_DATE:
            updatedState = {
                ...state,
                errorChangeTaskDueDate: null,
                loadingChangeTaskDueDate: true
            };
            break;
        case actionTypes.SUCCESS_CHANGE_TASK_DUE_DATE:
            const cloneedProjects = [...state.projects];

            cloneedProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    const projectColumns = {...project[prjId].columns};
                    Object.keys(projectColumns).forEach(col => {
                        console.log(projectColumns[col]);
                        projectColumns[col].tasks.forEach(task => {
                            if(task.id === +action.taskId) {
                                task['due_date'] = action.dueDate
                            }
                        });
                    })
                }
            });
            updatedState = {
                ...state,
                loadingChangeTaskDueDate: false,
                projects: cloneedProjects
            };
            break;
        case actionTypes.FAIL_CHANGE_TASK_DUE_DATE:
            updatedState = {
                ...state,
                errorChangeTaskDueDate: action.error,
                loadingChangeTaskDueDate: false
            };
            break;
        case actionTypes.START_DELETE_TASK:
            updatedState = {
                ...state,
                loadingDeleteTask: true,
                errorDeleteTask: null
            };
            break;
        case actionTypes.SUCCESS_DELETE_TASK:
            const cloneddProjects = [...state.projects];

            cloneddProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    const projectColumns = {...project[prjId].columns};
                    Object.keys(projectColumns).forEach(col => {
                        console.log(projectColumns[col]);
                        const updateProjectColumnsTask = projectColumns[col].tasks.filter(task => {
                            return task.id !== +action.taskId
                        });
                        projectColumns[col].tasks = updateProjectColumnsTask
                    })
                }
            });
            
            updatedState = {
                ...state,
                loadingDeleteTask: false,
                projects: cloneddProjects
            };
            break;
        case actionTypes.FAIL_DELETE_TASK:
            updatedState = {
                ...state,
                loadingDeleteTask: false,
                errorDeleteTask: action.error
            };
            break;
        default:
            updatedState = state;
    }
    return updatedState;
};

export default reducer;