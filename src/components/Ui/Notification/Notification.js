import classes from './Notification.module.css';

import { BsFillBellFill } from 'react-icons/bs'

const Notification = props => {

    return (
        <div className={classes.NotificationContainer}>
            <div className={classes.Notification} onClick={props.clickedNotification}>
                <BsFillBellFill />
                {props.count > 0 && 
                    <div className={classes.CounterNotification}>
                        {props.count}
                    </div>
                }
            </div>
        </div>
    );
};

export default Notification;