import React, { Component } from 'react';
import './DateComponent.css';

import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';

import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';


class DateComponent extends Component {

    constructor(props) {
        super(props);
        let value;
        switch(props.datePoint) {
            case 'start':
                value = this.props.task.start_date ? moment(new Date(this.props.task['start_date'])) : null;
                break;
            case 'due':
                value = this.props.task.due_date ? moment(new Date(this.props.task['due_date'])) : null;
                break;
            default:
                value = null;
        }
        console.log(moment(null));
        console.log('DATE IS  ',value);
        this.state = {
            value: value,
            setTodayOnBlur: false
        }
    }

    componentDidMount() {
        console.log(this.props.task);
        console.log(this.state.value);
    }

    EmptyDateHandler = () => {
        this.setState({ value: null });
    }

    registerDateHandler = (datePoint) => {
        console.log(this.state.value);
        let createdDate = this.state.value ? new Date(new Date(this.state.value['_d'].toLocaleString('en-US'))).toISOString().split('.')[0] + 'Z' : null;  // we have to create date for backend so that understand that Date
        console.log(createdDate);
        switch (datePoint) {
            case 'start':
                this.props.onChangeTaskStartDate(
                    this.props.taskId,
                    createdDate,
                    this.props.accessToken
                );
                break;
            case 'due':
                this.props.onChangeTaskDueDate(
                    this.props.taskId,
                    createdDate,
                    this.props.accessToken
                );
                break;
            default:
                break;
        }
    }
    
    render() {
        return (
            <div className='Date-Picker'>
                <DatePicker
                    isGregorian={false}
                    setTodayOnBlur={this.state.setTodayOnBlur}
                    placeholder="1400/4/8 12:00 ق.ظ"
                    value={this.state.value}
                    dateValue={this.state.value}
                    onChange={value => this.setState({ value })}
                />
                <button 
                    className='Delete-Date-Btn' 
                    onClick={this.EmptyDateHandler}
                    disabled={!this.state.value}>
                        خالی کردن
                    </button>
                <button
                    className='Register-date-Btn' 
                    onClick={() => this.registerDateHandler(this.props.datePoint)}>
                        {this.state.value ?
                            'ثبت تاریخ' :
                            'حذف تاریخ'
                        }
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeTaskStartDate: 
            (taskId, startDate, accessToken) => dispatch(actions.changeTaskStartDate(taskId, startDate, accessToken)),
        onChangeTaskDueDate: 
            (taskId, dueDate, accessToken) => dispatch(actions.changeTaskDueDate(taskId, dueDate, accessToken)),
    };
};

export default connect(null, mapDispatchToProps)(DateComponent);
