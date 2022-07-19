import classes from './NotificationItem.module.css';

const NotificationItem = props => {

    return (
        <div className={classes.NotificationItem}>
            <p><strong>دعوت کننده</strong><strong><span> : {props.inviterUsername}</span></strong></p>
            <p><strong>عنوان پروژه</strong> <strong><span> : {props.projectName}</span></strong></p>
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