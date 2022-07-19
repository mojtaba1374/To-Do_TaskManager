import React, { Component } from 'react';
import classes from './TaskEditor.module.css';

import { AiOutlineClose } from 'react-icons/ai';
import { TbFileDescription } from 'react-icons/tb';
import { FaRegCalendarAlt } from 'react-icons/fa';


class TaskEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.task.title,
            description: this.props.task.description,
            startData: '',
            dueDate: '',
            progressPercentage: this.props.task.percentage,
            openDescription: false,
            openEditTitle: false,
            openPercentage: false
        };
    }

    openDescription = () => {
        this.setState({openDescription: true});
    }
    
    closeDescription = () => {
        this.setState({
            openDescription: false
        });
    }

    cancelChangeDescription = () => {
        this.setState({
            openDescription: false,
            description: this.props.task.description
        })
    }

    saveDescription = () => {
        this.setState({
            
        });
    }

    onInputHandler = event => {
        event.target.style.height = "5px";
        event.target.style.height = (event.target.scrollHeight)+"px";
    }

    changeTitleHandler = event => {
        this.setState({title: event.target.value});
    }

    changeDescriptionHandler = event => {
        this.setState({description: event.target.value});
    }

    openPercentageEdit = () => {
        this.setState({openPercentage: true});
    }

    editPercentageHandler = () => {
        this.setState({openPercentage: false})
    }

    render() {

        console.log(this.props.task);
        return (
            <div className={classes.TaskEditor}>
                <div className={classes.CloseTaskEditor} onClick={this.props.closeTaskEditor}>
                    <AiOutlineClose />
                </div>
                <div className={classes.TaskInfo}>
                    <div className={classes.TaskName}>
                        <textarea onInput={this.onInputHandler} value={this.state.title} onChange={this.changeTitleHandler}></textarea>
                    </div>
                    <div className={classes.creatorCharacteric}>
                        {/* <span>ساخته شده توسط </span>
                        <span>{this.props.task['created_at']} </span>
                        <span> {this.props.task.creator.email} </span> */}
                        <span>ساخته شده توسط mojtab_ameli در 20 تیر</span>
                    </div>
                    <div className={classes.BtnGroup}>
                        <button className={classes.Canceled}>
                            لغو
                        </button>
                        <button className={classes.Confirmed}>
                            تایید
                        </button>
                    </div>
                </div>
                <div className={classes.Description}>
                    {this.state.openDescription && 
                        <>
                            <textarea onInput={this.onInputHandler} value={this.state.description} onChange={this.changeDescriptionHandler}></textarea>
                            <div className={classes.BtnGroup}>
                                <button className={classes.Canceled} onClick={this.cancelChangeDescription}>
                                    لغو
                                </button>
                                <button className={classes.Confirmed} onClick={this.closeDescription}>
                                    تایید
                                </button>
                            </div>
                        </>
                    }
                    {!this.state.openDescription &&
                        <>
                            <button className={classes.ToggleDescriptBtn} onClick={this.openDescription}>
                                <TbFileDescription />
                                {this.state.description ? 'ویرایش توضیحات':  'افزودن توضیحات'}
                            </button>
                            {this.state.description &&
                                <p style={{textAlign: 'right', paddingRight: '7px', wordWrap: 'break-word'}}>{this.state.description}</p>
                            }
                        </>
                    }
                </div>
                <div className={classes.progressPercentage}>
                    <div className={classes.ProgressShower}>
                        <p>درصد پیشرفت پروژه</p> 
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
                                <span className={classes.PercentageShower}>{this.state.progressPercentage}</span>
                                <span className={classes.PersentageEditation} onClick={this.openPercentageEdit}>(تعییر درصد پیشرفت)</span>
                            </>
                        }
                    </div>
                </div>
                {/* <div className={classes.TaskDate}>
                    <div className={classes.StartDate}>
                        <FaRegCalendarAlt /> شروع
                        <input type="date" />
                    </div>
                    <div className={classes.DueDate}>
                        <FaRegCalendarAlt />
                    </div>
                </div> */}
            </div>
        );
    }
}

export default TaskEditor;