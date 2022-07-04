const initialState = {
    activeProject: '',
    activeProjectId: 0,
    projects: [
        {
          '1': {
            id: 1,
            projectName: 'اول',
            tasks: [
              {
                '1اولین': {
                  id: 15,
                  name: 'اولین',
                  column: 'column-1'
                }
              },
              {
                '1دومین': {
                  id: 16,
                  name: 'دومین',
                  column: 'column-1'
                }
              },
              {
                '1سومین': {
                  id: 17,
                  name: 'سومین',
                  column: 'column-2'
                }
              }
            ]
          }
        },
        {
          '2': {
            id: 2,
            projectName: 'دوم',
            tasks: [
              {
                '2اووولین': {
                  id: 18,
                  name: 'اووولین',
                  column: 'column-2'
                }
              },
              {
                '2دووومین': {
                  id: 19,
                  name: 'دووومین',
                  column: 'column-2'
                }
              },
              {
                '2سووومین': {
                  id: 111,
                  name: 'سووومین',
                  column: 'column-1'
                }
              }
            ]
          }
        },
        {
          '3': {
            id: 3,
            projectName: 'سوم',
            tasks: [
              {
                '3اوووووولین': {
                  id: 112,
                  name: 'اوووووولین',
                  column: 'column-2'
                }
              },
              {
                '3دووووومین': {
                  id: 113,
                  name: 'دووووومین',
                  column: 'column-1'
                }
              },
              {
                '3سوووووومین': {
                  id: 114,
                  name: 'سوووووومین',
                  column: 'column-3'
                }
              }
            ]
          }
        }
      ]
};

// let taskId = 1;  // For test before reach out API

const reducer = (state = initialState, action) => {
    let updatedState;
    switch(action.type) {
        case 'UPDATE_ACTIVE_PROJECT':
            updatedState = {
                ...state,
                activeProject: action.activePrjName,
                activeProjectId: action.activePrjId,
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
            }
            break;
        default:
            updatedState = state;
    }
    return updatedState;
};

export default reducer;