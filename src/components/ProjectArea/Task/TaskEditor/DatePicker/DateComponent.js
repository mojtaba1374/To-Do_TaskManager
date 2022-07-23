import React, { Component } from 'react';
import './DateComponent.css';

import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';

import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';


class DateComponent extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.task);
        // const value = this.props.task ? new Date(this.props.task['start_date']) : null;
        // const value = this.props.task['start-date'] ? new Date(this.props.task['start_date']) : null;
        // console.log(value);
        this.state = {
            value: moment('1396/7/6 6:00 ق.ظ', 'jYYYY/jM/jD'),
            setTodayOnBlur: false
        }
    }

    componentDidMount() {
        console.log(this.state.value);
    }

    EmptyDateHandler = () => {
        this.setState({ value: null });
    }

    registerDateHandler = (datePoint) => {
        console.log(this.state.value);
        let createdDate = new Date(new Date(this.state.value['_d'].toLocaleString('en-US'))).toISOString();  // we have to create date for backend so that understand that Date
        // console.log(new Date(datePoint).toLocaleString('en-EN'));
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
