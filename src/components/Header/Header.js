import React, { Component } from 'react';
import classes from './Header.module.css';

import { BsPersonFill } from 'react-icons/bs';
import { BsStopCircleFill } from 'react-icons/bs';


class Header extends Component {
    
    render() {
        return(
            <header className={classes.Header}>
                <div className={classes.ProfileIcon} onClick={this.props.clickedProfile}>
                    <BsPersonFill />
                </div>
                {this.props.showProfile && 
                    <div className={classes.ProfileContainer}>
                        <div className={classes.UserName}>
                            <p>{this.props.username}</p>
                        </div>
                        <div className={classes.Email}>
                            <p>{this.props.email}</p>
                        </div>
                        <div className={classes.Logout}>
                            <BsStopCircleFill /> 
                            <p>
                                خروج
                            </p>
                        </div>
                    </div>
                }
            </header>
        );
    }
}

export default Header;