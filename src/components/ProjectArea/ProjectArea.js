import React, { Component } from 'react';
import classes from './ProjectArea.module.css';

import Section from './Section/Section';

import { DragDropContext } from 'react-beautiful-dnd';

import { connect } from 'react-redux/es/exports';
import * as actions from '../../store/actions/index';


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
            
            let draggedTaskId;
            let newPosition = destination.index;
            let destinationColumn = destination.droppableId;
            const newTasks = Array.from(sourceCol.tasks);
            const [removed] = newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, removed);
            draggedTaskId = removed.id;
            const newColumn = {
              ...sourceCol,
              tasks: newTasks,
            };
            
            this.props.onDragTaskSameColumn(
                draggedTaskId,
                newPosition, 
                destinationColumn, 
                newColumn, 
                this.props.accessToken,
                sourceCol
            )
          return;
        }
    
        // If the user moves from one column to another
        let draggedTaskId;
        let newPosition = destination.index;
        let destinationColumn = destination.droppableId;

        const startTasks = Array.from(sourceCol.tasks);
        const [removed] = startTasks.splice(source.index, 1);
        draggedTaskId = removed.id;
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
        // this.props.onDragTaskInOtherColumn(newStartCol, newEndCol);
        this.props.onDragTaskOtherColumn(
            draggedTaskId,
            newPosition,
            destinationColumn,
            newStartCol, 
            newEndCol, 
            this.props.accessToken,
            sourceCol,
            destinationCol
        );
    };

    render() {

        let columns = null;
        this.props.projects.forEach(project => {
            const projectId = Object.keys(project)[0];
            if(+projectId === +this.props.activeProjectId) {
                columns = project[projectId].columns;
            }
        });
        console.log(this.props.projects);

        const sections = columns &&
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
            });
        
        return(
            this.props.activeProjectId ? 
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={classes.ProjectArea}>
                    {sections}
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
        projects: state.dashboard.projects,
        accessToken: state.auth.accessToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDragTaskSameColumn: (taskId, newPosition, destinationCol, newColumn, accessToken, sourceCol) =>
            dispatch(actions.dragTaskSameColumn(taskId, newPosition, destinationCol, newColumn, accessToken, sourceCol)),
        // onDragTaskInSameColumn:
        //     newColumn => dispatch({type: actionTypes.DRAG_TASK_IN_SAME_COLUMN, newColumn}),
        onDragTaskOtherColumn: (taskId, newPosition, destinationCol, newStartColumn, newEndColumn, accessToken, sourceStartCol, sourceEndCol) =>
            dispatch(actions.dragTaskOtherColumn(taskId, newPosition, destinationCol, newStartColumn, newEndColumn, accessToken, sourceStartCol, sourceEndCol)),
        // onDragTaskInOtherColumn: 
        //     (newStartCol, newEndCol) => dispatch({type: actionTypes.DRAG_TASK_IN_OTHER_COLUMN, newStartCol, newEndCol})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectArea);