import React, { Component } from 'react';
import classes from './Section.module.css';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import CreationTask from '../CreationTask/CreationTask';
import TaskCreator from '../CreationTask/TaskCreator/TaskCreator';
import Task from '../Task/Task';
import Backdrop from '../../Ui/Backdrop/Backdrop'; 
import Modal from '../../Ui/Modal/Modal';
import TaskEditor from '../Task/TaskEditor/TaskEditor';


class Section extends Component {

    state = {
        addingTask: false,
        taskEditor: false,
        taskClicked: null
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

        if(taskContent.trim().length === 0) {
            event.preventDefault();
        } else {
            this.props.onCreateTodoTask(taskContent, this.props.activeProjectId, this.props.accessToken);

            // bayad yek loader dashte basham va vaghti ke success bod action bala adding task ra bebandad.
            this.setState({
                addingTask: false
            });
        }
    }

    openTaskEditor = (task) => {
        this.setState({
            taskEditor: true,
            taskClicked: task
        });
    }
    
    closeTaskEditor = () => {
        this.setState({taskEditor: false});
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

        let tasks = (
            this.props.tasks.map((task, index) => {
                return (
                    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                        {(draggableProvided, draggableSnapshot) => {
                            const style = {
                                boxShadow: draggableSnapshot.isDragging ? '0 0 5px rgba(0, 0, 0, 0.6)' : '0 0 3px rgba(0, 0, 0, 0.6)',
                                fontSize: '16px',
                                width: '95%',
                                minHeight: '60px',
                                textOverflow: 'ellipsis',
                                wordWrap: 'breakWord',
                                margin: '15px auto',
                                overflow: 'hidden',
                                borderRadius: '6px 6px 3px 3px',
                                cursor: 'pointer',
                                backgroundColor: '#ffffff',
                                ...draggableProvided.draggableProps.style,
                            };
                            return (
                                <div 
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.draggableProps}
                                    {...draggableProvided.dragHandleProps}
                                    style={style}
                                >
                                    <Task 
                                        title={task.title}
                                        percentage={60}
                                        clickedTask={() => this.openTaskEditor(task)} />
                                </div>
                            )
                        }}
                    </Draggable>
                )
            })
        );

        const modal = (
            <>
                <Backdrop showModal={this.state.taskEditor} clickedBackdrop={this.closeTaskEditor} />
                <Modal showModal={this.state.taskEditor}>
                    {this.state.taskClicked &&
                        <TaskEditor
                            task={this.state.taskClicked}
                            closeTaskEditor={this.closeTaskEditor} />
                    }
                </Modal>
            </>
        )
        
        return (
            <div className={classes.Section}>
                {modal}
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
                            {tasks}
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
        activeProjectId: state.dashboard.activeProjectId,
        activeProject: state.dashboard.activeProject,
        accessToken: state.auth.accessToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateTodoTask: (taskTitle, activeProjectId, accessToken) => dispatch(actions.createTodoTask(taskTitle, activeProjectId, accessToken)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);