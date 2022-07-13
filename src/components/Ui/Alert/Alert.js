import React, { Component } from 'react';
import classes from './Alert.module.css'

import { BsXLg } from "react-icons/bs";


class Alert extends Component {

    state = {
        show: true
    }

    componentDidMount() {
        setTimeout(() => {
            console.log('ffff');
        }, 5000);
    }

    closeAlertHandler = () => {
        this.setState({
            show: false
        });
    }

    componentWillUnmount() {
        
    }

    render() {
        let alertClasses = [classes.Alert];
        if(this.props.successAlert) {
            alertClasses.push(classes.Success);
        } else if(this.props.UnsuccessAlert) {
            alertClasses.push(classes.Unsuccess);
        }

        return (
            this.state.show && 
                <div className={alertClasses.join(' ')}>
                    <span className={classes.IconContainer} onClick={this.closeAlertHandler}>
                        <BsXLg className={classes.Icon} />
                    </span>
                </div>
        )
    }
}

export default Alert;
