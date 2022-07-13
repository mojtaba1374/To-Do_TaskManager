import classes from './NotificationItem.module.css';

const NotificationItem = props => {

    return (
        <div className={classes.NotificationItem}>
            <p>دعوت کننده <strong><span>{props.inviterUsername}</span></strong></p>
            <p>عنوان پروژه <strong><span>{props.projectName}</span></strong></p>
            <button className={classes.ConfirmedBtn} onClick={props.clickedConfirmed}>
                تایید
            </button>
            <button className={classes.RejectedBtn} onClick={props.clickedRejected}>
                رد کردن
            </button>
        </div>
    );
};

export default NotificationItem;