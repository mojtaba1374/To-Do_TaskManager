import classes from './NotificationMenu.module.css';

import { BsArrowLeftSquare } from 'react-icons/bs';

const NotificationMenu = props => {

    return (
        <div className={classes.NotificationContainer}>
            {props.children}
            <div className={classes.CloseArrow} onClick={props.clickedCloseNotification}>
                <BsArrowLeftSquare />
            </div>
        </div>
    );
};

export default NotificationMenu;