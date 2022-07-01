import React, { Component } from 'react';
import classes from './ProjectArea.module.css';

import { connect } from 'react-redux/es/exports';

import TaskContainer from './TaskContainer/TaskContainer';

import CreationTask from './CreationTask/CreationTask';
import Task from './CreatedTask/CreatedTask';

class ProjectArea extends Component {

    state = {
        addingTask: false,
        tasks: []
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
        // console.log(taskContent);
        
        if(taskContent.trim().length <= 0) {
            event.preventDefault();
        } else {
            // const tasks = this.state.tasks;
            // tasks.push(taskContent);

            this.props.onAddToDoTaskForActiveProject(taskContent);

            this.setState({
                addingTask: false
                // tasks: tasks
            });
        }
    }

    render() {

        let tasks;
        let activeProjectTasksArray = [];

        for(const project of this.props.projects) {
            const prjId = +Object.keys(project)[0];
            
            if(prjId === +this.props.activeProjectId) {
                activeProjectTasksArray = project[prjId].tasks;
            }
        }
        
        tasks = activeProjectTasksArray.map(task => {
            const taskId = Object.keys(task)[0];
            return <Task key={taskId} title={task[taskId].name} />;
        });

        return(
            <div className={classes.ProjectArea}>
                <TaskContainer stateName="برای انجام">
                    <CreationTask 
                        addingTask={this.state.addingTask}
                        creationNewTask={this.addingNewTaskHandler}
                        cancelCreationTask={this.cancelCreationTaskHandler}
                        saveTask={this.saveTaskHandler}
                        disableAdding={this.props.activeProject.trim().length === 0} />
                    {tasks}
                </TaskContainer>
                <TaskContainer stateName="در حال انجام">
                    
                </TaskContainer>
                <TaskContainer stateName="انجام شده">

                </TaskContainer>
            </div>
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
            (taskContent) => dispatch({type: 'ADD_TODO_TASK_FOR_ACTIVE_PROJECT', taskContent: taskContent})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectArea);