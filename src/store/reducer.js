const initialState = {
    activeProject: '',
    activeProjectId: 0,
    projects: [],
};

// let taskId = 1;  // For test before reach out API

const reducer = (state = initialState, action) => {
    let updatedState;
    switch(action.type) {
        case 'UPDATE_ACTIVE_PROJECT':
            updatedState = {
                ...state,
                activeProject: action.activePrjName,
                activeProjectId: action.activePrjId
            }
            break;
        case 'UPDATE_PROJECTS_ARRAY':
            updatedState = {
                ...state,
                projects: state.projects.concat(action.project)
            }
            break;
        case 'ADD_TODO_TASK_FOR_ACTIVE_PROJECT':
            const updatedProjects = [...state.projects];
            
            updatedProjects.forEach(project => {
                let prjId = +Object.keys(project)[0];
                if(prjId === +state.activeProjectId) {
                    project[prjId].tasks.push({
                        [prjId + action.taskContent]: {
                            name: action.taskContent,
                            section: 'todo'
                        }
                    });
                }
            });

            updatedState = {
                ...state,
                projects: updatedProjects
            }
            break;
        default:
            updatedState = state;
    }
    return updatedState;
};

export default reducer;