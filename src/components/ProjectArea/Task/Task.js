import classes from './Task.module.css';

import { FaRegCalendarAlt } from 'react-icons/fa';

const Task = props => {

    const progressStyle = {
        width: `${props.task.percentage}%`
    };
    
    return (
        <div className={classes.Task} onClick={props.clickedTask}>
            <p>{props.task.title}</p>
            <div className={classes.TaskInfo}>
                <div className={classes.TaskDeadline}>
                    <span><FaRegCalendarAlt /></span>
                    از 2 تیر تا 10 تیر  
                </div>
            </div>
            <div className={classes.ProgressPercent} style={progressStyle}>
                
            </div>
        </div>
    );
}

export default Task;