import React, { Component } from 'react';
import classes from './ProjectArea.module.css';

import Section from './Section/Section';

import { connect } from 'react-redux/es/exports';

import { DragDropContext } from 'react-beautiful-dnd';

const COLUMN_ORDER = ['column-1', 'column-2', 'column-3'];

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newTasks = Array.from(sourceCol.tasks);
    const [removed] = newTasks.splice(startIndex, 1);
    newTasks.splice(endIndex, 0, removed);
    
    const newColumn = {
      ...sourceCol,
      tasks: newTasks,
    };
  
    return newColumn;
  };

class ProjectArea extends Component {

    state = {
        projectTasks: [],
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

    // componentDidMount() {
    //     console.log(this.props.projects);
    // }

    componentDidUpdate(prevProps, prevState) {
        
        let prjActiveId;
        let projectTasks;
        for(const project of this.props.projects) {
            prjActiveId = Object.keys(project)[0];
            if(+prjActiveId === +this.props.activeProjectId) {
                projectTasks = [...project[prjActiveId].tasks];
            }
        }
        if(JSON.stringify(projectTasks) === JSON.stringify(prevState.projectTasks)) {
            return;
        }
        let todoTasks = [];
        let doingTasks = [];
        let doneTasks = [];

        projectTasks.forEach(task => {
            const taskId = Object.keys(task)[0];
            if(task[taskId].column === 'column-1') {
                todoTasks.push(task);
            } else if(task[taskId].column === 'column-2') {
                doingTasks.push(task);
            } else if(task[taskId].column === 'column-3') {
                doneTasks.push(task);
            }
        });

        this.setState({
            projectTasks: projectTasks,
            columns: {
                'column-1': {
                    ...this.state.columns['column-1'],
                    tasks: [...todoTasks],
                },
                'column-2': {
                    ...this.state.columns['column-2'],
                    tasks: [...doingTasks],
                },
                'column-3': {
                    ...this.state.columns['column-3'],
                    tasks: [...doneTasks],
                },
            }
        });
    }

    onDragEnd = (result) => {
        console.log('dragend');
        const { destination, source } = result;
        console.log(destination);
        console.log(source);
        // If user tries to drop in an unknown destination
        if (!destination) return;
    
        // if the user drags and drops back in the same position
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }
    
        // If the user drops within the same column but in a different positoin
        const sourceCol = this.state.columns[source.droppableId];
        const destinationCol = this.state.columns[destination.droppableId];
    
        console.log(sourceCol.tasks);

        if (sourceCol.id === destinationCol.id) {
          const newColumn = reorderColumnList(
            sourceCol,
            source.index,
            destination.index
          );
    
          const newState = {
            ...this.state,
            columns: {
              ...this.state.columns,
              [newColumn.id]: newColumn,
            },
          };
          this.props.onDragTaskInSameColumn();
          this.setState(newState);
          return;
        }
    
        // If the user moves from one column to another
        const startTasks = Array.from(sourceCol.tasks);
        const [removed] = startTasks.splice(source.index, 1);
        const newStartCol = {
          ...sourceCol,
          tasks: startTasks,
        };
    
        const endTasks = Array.from(destinationCol.tasks);
        endTasks.splice(destination.index, 0, removed);
        const newEndCol = {
          ...destinationCol,
          tasks: endTasks,
        };

        console.log(newStartCol);
        console.log(newEndCol);
    
        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [newStartCol.id]: newStartCol,
            [newEndCol.id]: newEndCol,
          },
        };
    
        this.setState(newState);
      };

    render() {
        // console.log(this.state.projectTasks);
        // console.log(this.state.columns);
        
        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={classes.ProjectArea}>
                    {COLUMN_ORDER.map(col => {
                        const column = this.state.columns[col];
                        const tasks = column.tasks
                        return (
                            <Section 
                                key={col} 
                                sectionName={this.state.columns[col].title}
                                column={column}
                                tasks={tasks} />
                        );
                    })}
                </div>
            </DragDropContext>
        )
            
    }
}

const mapStateToProps = state => {
    return {
        activeProject: state.activeProject,
        activeProjectId: state.activeProjectId,
        projects: state.projects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddToDoTaskForActiveProject:
            (taskContent) => dispatch({type: 'ADD_TODO_TASK_FOR_ACTIVE_PROJECT', taskContent: taskContent}),
        onDragTaskInSameColumn: () => dispatch({type: 'Drag_Task_IN_Same_Column'}),
        onDragTaskInOtherColumn: () => dispatch({type: 'Drag_Task_IN_Same_Column'})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectArea);