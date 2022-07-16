import React, { Component } from 'react';
import classes from './ProjectArea.module.css';

import Section from './Section/Section';

import { connect } from 'react-redux/es/exports';

import { DragDropContext } from 'react-beautiful-dnd';

import * as actionTypes from '../../store/actions/actionTypes';
// import axios from 'axios';

class ProjectArea extends Component {

    onDragEnd = (result) => {

        let columns;
        this.props.projects.forEach(project => {
            const projectId = Object.keys(project)[0];
            if(+projectId === +this.props.activeProjectId) {
                columns = project[projectId].columns;
            }
        });

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
        const sourceCol = columns[source.droppableId];
        const destinationCol = columns[destination.droppableId];
    
        console.log(sourceCol.tasks);

        if (sourceCol.id === destinationCol.id) {
        
            const newTasks = Array.from(sourceCol.tasks);
            const [removed] = newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, removed);
            const newColumn = {
              ...sourceCol,
              tasks: newTasks,
            };
            // mitavan payload haye index , columni ke hast ham gozasht baraye ferestadan be backend
            this.props.onDragTaskInSameColumn(newColumn);  // dispatching action for reordering in same column
    
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
        // mitavan payload haye index , columni ke hast va mikhad bere ra ham gozasht baraye ferestadan be backend
        this.props.onDragTaskInOtherColumn(newStartCol, newEndCol);
    };

    render() {

        let columns;
        this.props.projects.forEach(project => {
            const projectId = Object.keys(project)[0];
            if(+projectId === +this.props.activeProjectId) {
                columns = project[projectId].columns;
            }
        });
        console.log(columns);
        console.log(this.props.activeProjectId);
        
        return(
            this.props.activeProjectId ? 
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={classes.ProjectArea}>
                    {columns &&
                    Object.keys(columns).map(col => {
                        const column = columns[col];
                        const tasks = column.tasks;
                        return (
                            <Section 
                                key={col} 
                                sectionName={column.title}
                                column={column}
                                tasks={tasks} />
                        );
                    })}
                </div>
            </DragDropContext>:
            <div className={classes.EmptyProjectArea}>
                <p>
                    پروژه ای را از لیست پروژه های خود انتخاب کنید یا یک پروژه جدید ایجاد کنید
                </p>
            </div>
        )
            
    }
}

const mapStateToProps = state => {
    return {
        activeProject: state.dashboard.activeProject,
        activeProjectId: state.dashboard.activeProjectId,
        projects: state.dashboard.projects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddToDoTaskForActiveProject:
            (taskContent) => dispatch({type: actionTypes.ADD_TODO_TASK_FOR_ACTIVE_PROJECT, taskContent}),
        onDragTaskInSameColumn:
            newColumn => dispatch({type: actionTypes.DRAG_TASK_IN_SAME_COLUMN, newColumn}),
        onDragTaskInOtherColumn: 
            (newStartCol, newEndCol) => dispatch({type: actionTypes.DRAG_TASK_IN_OTHER_COLUMN, newStartCol, newEndCol})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectArea);