import React, { Component } from 'react';
import classes from './ProjectSetting.module.css';

const EMAILREgex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;


class ProjectSetting extends Component {

    state = {
        name: this.props.projectName,
        email: '',
        emailIsValid: false
    }

    nameChangeHandler = event => {
        const value = event.target.value;
        this.setState({
            name: value
        });
    }

    emailChangeHandler = event => {
        const value = event.target.value;
        const emailIsValid = this.checkValidity(value);
        this.setState({
            email: value,
            emailIsValid: emailIsValid
        });
    }

    checkValidity = (email) => {
        let valid = EMAILREgex.test(email.trim());
        console.log(valid);
        return valid;
    }

    render() {
        return (
            this.props.userRoleOfActiveProject === 'Admin' ?
            <div className={classes.SettingContainer}>
                <h3 style={{textAlign: 'right'}}>مدیریت پروژه</h3>
                <div className={classes.ProjectNameContainer}>
                    <div className={classes.NameInputContainer}>
                        <input type="text" placeholder="اسم پروژه" spellCheck="false" 
                            value={this.state.name} 
                            onChange={event => this.nameChangeHandler(event)} />
                        <button 
                            disabled={this.state.name.trim().length === 0} 
                            onClick={() => this.props.clickedEditName(this.state.name.trim())}>
                            تایید
                        </button>
                    </div>
                </div>
                <h4 style={{textAlign: 'right'}}>کاربران تیم را حذف یا اضافه کنید</h4>
                
                <div className={classes.EmailInputContainer}>
                    <input type="text" placeholder="ایمیل کاربر را برای اضافه کردن وارد کنید"
                            value={this.state.email} 
                            onChange={event => this.emailChangeHandler(event)}/>
                    <button disabled={!this.state.emailIsValid}
                        onClick={() => this.props.clickedAddMember(this.state.email)}>
                        اضافه
                    </button> 
                </div>
            </div> :
            <h3 style={{textAlign: 'right', paddingRight: '40px'}}>اعضای تیم پروژه</h3>
        );
    }
}
export default ProjectSetting;