import React, { Component } from 'react';
import classes from './Section.module.css';

import CreationTask from '../CreationTask/CreationTask';
import TaskCreator from '../CreationTask/TaskCreator/TaskCreator';
// import Task from '../CreatedTask/CreatedTask';

import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class Section extends Component {

    state = {
        addingTask: false
    }

    addingNewTaskHandler = (disableAdding) => {
        if(disableAdding) {
            return;
        }
        this.setState({ addingTask: true });
    }

    cancelCreationTaskHandler = () => {
        this.setState({ addingTask: false });
    }


    saveTaskHandler = (event, taskContent) => {

        if(taskContent.trim().length <= 0) {
            event.preventDefault();
        } else {
            this.props.onAddToDoTaskForActiveProject(taskContent);

            this.setState({
                addingTask: false
            });
        }
    }

    render() {

        let creationTask;
        if(this.props.sectionName === 'برای انجام') {
            creationTask = (
                <CreationTask 
                    addingTask={this.state.addingTask}
                    creationNewTask={this.addingNewTaskHandler}
                    disableAdding={this.props.activeProject.trim().length === 0} />
            );
        }

        let addingTask;
        if(this.props.sectionName === 'برای انجام' && this.state.addingTask) {
            addingTask = (
                <TaskCreator 
                            clickedCancelBtn={this.cancelCreationTaskHandler}
                            clickedSaveBtn={this.saveTaskHandler} />
            );
        }

        // const taskClasses = [classes.Task];
        // const taskDraggingClasses = [classes.task, classes.TaskDragging];

        return (
            <div className={classes.Section}>
                <div className={classes.SectionHeader}>
                    <div>
                        {this.props.sectionName}
                    </div>
                    {creationTask}
                </div>
                <Droppable droppableId={this.props.column.id}>
                    {(droppableProvided, droppableSnapshot) => (
                        <div className={classes.SectionTasks}
                            ref={droppableProvided.innerRef}
                            {...droppableProvided.droppableProps}
                        >
                            {
                                this.props.tasks.map((task, index) => {
                                    const taskId = Object.keys(task)[0];
                                    return (
                                        <Draggable key={taskId} draggableId={`${taskId}`} index={index}>
                                            {(draggableProvided, draggableSnapshot) => (
                                                <div 
                                                    className={draggableSnapshot.isDragging ? classes.DraggingTask : classes.Task}
                                                    ref={draggableProvided.innerRef}
                                                    {...draggableProvided.draggableProps}
                                                    {...draggableProvided.dragHandleProps}
                                                >
                                                    {task[taskId].name}
                                                </div>
                                            )}
                                        </Draggable>
                                        // <Task 
                                        //     key={taskId}
                                        //     title={task[taskId].name}
                                        //     section={task[taskId].section} />
                                    )
                                })
                            }
                            {addingTask}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeProject: state.dashboard.activeProject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddToDoTaskForActiveProject: 
            taskContent => dispatch({type: 'ADD_TODO_TASK_FOR_ACTIVE_PROJECT',taskContent: taskContent })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);