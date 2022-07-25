import React, { Component } from 'react';
import classes from './TaskEditor.module.css';

import { AiOutlineClose } from 'react-icons/ai';
import { TbFileDescription } from 'react-icons/tb';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import FormLoading from '../../../Ui/Loader/FormLoading/FormLoading';
import DateComponent from './DatePicker/DateComponent';


class TaskEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.task.title,
            openEditTitle: false,
            description: this.props.task.description,
            openDescription: false,
            progressPercentage: this.props.task.percentage,
            openPercentage: false,
            startData: '',
            dueDate: ''
        };
    }

    onInputHandler = event => {
        event.target.style.height = "5px";
        event.target.style.height = (event.target.scrollHeight)+"px";
    }

    changeTitleHandler = event => {
        this.setState({title: event.target.value});
    }

    openEditTitleHandler = () => {
        this.setState({openEditTitle: true});
    }

    closeEditTitleHandler = () => {
        this.setState({
            openEditTitle: false,
            title: this.props.task.title
        });
    }

    changeTaskTitle = () => {
        this.props.onChangeTaskTitle(
            this.props.task.id,
            this.state.title,
            this.props.accessToken
        );
        this.setState({openEditTitle: false});
    }

    openDescription = () => {
        this.props.onOpenDescriptionTextarea();
    }

    changeDescriptionHandler = event => {
        this.setState({description: event.target.value});
    }

    cancelChangeDescription = () => {
        this.props.onCloseDescriptionTextarea();
        this.setState({
            description: this.props.task.description
        });
    }
    
    saveChangeDescription = () => {
        this.props.onChangeDescription(
            this.props.task.id,
            this.state.description,
            this.props.accessToken
        );
    }

    openPercentageEdit = () => {
        this.setState({openPercentage: true});
    }

    editPercentageHandler = () => {
        this.props.onChangeProgressPercentage(
                this.props.task.id,
                this.state.progressPercentage,
                this.props.accessToken
            );
            
        this.setState({
            openPercentage: false
        });
    }

    deleteTaskHandler = () => {
        this.props.onDeleteTask(
            this.props.task.id,
            this.props.accessToken
        );
        this.props.closeTaskEditor(); // bayad taeedie begirad baraye hazfe task va in alakie
    }

    render() {
        let localCreatedTime = new Date(this.props.task['created_at']).toLocaleString('fa-IR');
        
        return (
            <div className={classes.TaskEditor}>
                <div className={classes.CloseTaskEditor} onClick={this.props.closeTaskEditor}>
                    <AiOutlineClose />
                </div>
                <div className={classes.TaskInfo}>
                    <div className={classes.creatorCharacteric}>
                        <span>ساخته شده توسط </span>
                        <span> {this.props.task.creator.email} <strong>({this.props.task.creator.username})</strong> </span>
                        <span>در تاریخ {localCreatedTime}</span>
                    </div>
                    <div className={classes.TaskName} onClick={this.openEditTitleHandler}>
                        <textarea 
                            spellCheck={false}
                            onInput={this.onInputHandler} 
                            value={this.state.title} 
                            onChange={this.changeTitleHandler}>
                        </textarea>
                        {this.props.loadingChangeTaskTitle && 
                            <div className={classes.LoaderTitle}>
                                <FormLoading />
                            </div>
                        }
                    </div>
                    {this.state.openEditTitle  &&
                        <div className={classes.BtnGroup}>
                            <button className={classes.Canceled} onClick={this.closeEditTitleHandler}>
                                لغو
                            </button>
                            <button className={classes.Confirmed} onClick={this.changeTaskTitle}>
                                تایید
                            </button>
                        </div>
                    }
                </div>
                <div className={classes.Description}>
                    {this.props.openDescriptionTextarea && 
                        <>
                            <textarea onInput={this.onInputHandler} spellCheck={false}
                                      value={this.state.description} 
                                      onChange={this.changeDescriptionHandler}>
                            </textarea>
                            <div className={classes.BtnGroup}>
                                <button className={classes.Canceled} onClick={this.cancelChangeDescription}>
                                    لغو
                                </button>
                                <button className={classes.Confirmed} onClick={this.saveChangeDescription}>
                                    تایید
                                </button>
                            </div>
                        </>
                    }
                    {this.props.loadinChangeDescription &&
                        <div className={classes.LoaderDescription}>
                            <FormLoading />
                        </div>
                    }
                    {!this.props.openDescriptionTextarea &&
                        <>
                            <button className={classes.ToggleDescriptBtn} onClick={this.openDescription}>
                                <TbFileDescription />
                                {this.props.task.description ? 'ویرایش توضیحات':  'افزودن توضیحات'}
                            </button>
                            <p style={{textAlign: 'right', paddingRight: '24px', wordWrap: 'break-word'}}>
                                {this.props.errorChangeDescription
                                    ? this.props.task.description
                                    : this.state.description
                                }
                            </p>
                        </>
                    }
                </div>
                <div className={classes.progressPercentage}>
                    <div className={classes.ProgressShower}>
                        <p>درصد پیشرفت پروژه</p> 
                        {this.props.loadingChangeProgress && 
                            <div className={classes.LoadingProgress}>
                                <FormLoading />
                            </div>
                        }
                        {this.state.openPercentage ?
                            <>
                                <input type="number" max={100} min={0} step={1} 
                                    value={this.state.progressPercentage}
                                    onChange={event => this.setState({progressPercentage: event.target.value})} />
                                <button className={classes.Confirmed} onClick={this.editPercentageHandler}>
                                    تایید
                                </button>
                            </>
                            :
                            <>
                                <span className={classes.PercentageShower}>
                                    {this.props.errorChangeProgress 
                                        ? this.props.task.percentage 
                                        : this.state.progressPercentage
                                    }
                                </span>
                                <span className={classes.PersentageEditation} onClick={this.openPercentageEdit}>(تعییر درصد پیشرفت)</span>
                            </>
                        }
                    </div>
                </div>
                <div className={classes.TaskDate}>
                    <div className={classes.StartDate}>
                        <div className={classes.DateStatusDescription}>
                            <div className={classes.DateIcon}>
                                <FaRegCalendarAlt />
                            </div>
                            <div className={classes.DateTitle}>
                                تاریخ و زمان شروع
                            </div>
                        </div>
                        <DateComponent 
                            datePoint="start" 
                            task={this.props.task}
                            taskId={this.props.task.id} 
                            accessToken={this.props.accessToken} />
                    </div>
                    <div className={classes.DueDate}>
                        <div className={classes.DateStatusDescription}>
                            <div className={classes.DateIcon}>
                                <FaRegCalendarAlt />
                            </div>
                            <div className={classes.DateTitle}>
                                تاریخ و زمان پایان
                            </div>
                        </div>
                        <DateComponent 
                            datePoint="due" 
                            task={this.props.task}
                            taskId={this.props.task.id} 
                            accessToken={this.props.accessToken} />
                    </div>
                </div>
                <div className={classes.DeleteContainer}>
                    {this.props.loadingDeleteTask &&
                        <div className={classes.LoadingDelete}>
                            <FormLoading />
                        </div>
                    }
                    <button 
                        className={classes.DeleteTaskBtn}
                        onClick={this.deleteTaskHandler}>
                        حذف
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.accessToken,
        loadingChangeProgress: state.dashboard.loadingChangeProgress,
        errorChangeProgress: state.dashboard.errorChangeProgress,
        loadinChangeDescription: state.dashboard.loadinChangeDescription,
        errorChangeDescription: state.dashboard.errorChangeDescription,
        openDescriptionTextarea: state.dashboard.openDescriptionTextarea,
        loadingChangeTaskTitle: state.dashboard.loadingChangeTaskTitle,
        errorChangeTaskTitle: state.dashboard.errorChangeTaskTitle,
        loadingDeleteTask: state.dashboard.loadingDeleteTask,
        errorDeleteTask: state.dashboard.errorDeleteTask
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeProgressPercentage: 
            (taskId, percentage, accessToken) => dispatch(actions.changeProgressPercentage(taskId, percentage, accessToken)),
        onChangeDescription: 
            (taskId, description, accessToken) => dispatch(actions.changeDescription(taskId, description, accessToken)),
        onOpenDescriptionTextarea: () => dispatch(actions.openDescriptionTextarea()),
        onCloseDescriptionTextarea: () => dispatch(actions.closeDescriptionTextarea()),
        onChangeTaskTitle: 
            (taskId, description, accessToken) => dispatch(actions.changeTaskTitle(taskId, description, accessToken)),
        onDeleteTask: (taskId, accessToken) => dispatch(actions.deleteTask(taskId, accessToken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditor);