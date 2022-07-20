import classes from './NotificationItem.module.css';

import FormLoading from '../../Ui/Loader/FormLoading/FormLoading';

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
            {((props.loadingConfirmedInvite || props.loadingInconfirmedInvite) && +props.invitationProjectId === +props.projectId ) &&
                <div className={classes.Loader}>
                    <FormLoading />
                </div>
            }
        </div>
    );
};

export default NotificationItem;