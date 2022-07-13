const initialState = {
    activeProject: '',
    activeProjectId: 0,
    projects: [],
    notifCounter: 0
};

// let taskId = 1;  // For test before reach out API

const reducer = (state = initialState, action) => {
    let updatedState;
    switch(action.type) {
        case 'SET_EXIST_PROJECTS':
            updatedState = {
                ...state,
                projects: action.projects
            };
            break;
        case 'UPDATE_ACTIVE_PROJECT':
            updatedState = {
                ...state,
                activeProject: action.activePrjName,
                activeProjectId: action.activePrjId,
            };
            break;
        case 'UPDATE_PROJECTS_ARRAY':
            updatedState = {
                ...state,
                projects: state.projects.concat(action.project)
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
        case 'UPDATE_CONFIRMED_PROJECT':
            const copyOfProjects = [...state.projects];
            copyOfProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +action.projectId) {
                    console.log(project[prjId]);
                    project[prjId].confirmed = true;
                }
            });
            updatedState = {
                ...state,
                projects: copyOfProjects
            };
            break;
        case 'UPDATE_NOTIF_COUNTER':
            updatedState = {
                ...state,
                notifCounter: state.notifCounter - 1
            }
            break;
        default:
            updatedState = state;
    }
    return updatedState;
};

export default reducer;