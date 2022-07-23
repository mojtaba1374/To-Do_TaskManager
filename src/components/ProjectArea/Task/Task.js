import classes from './Task.module.css';

import { FaRegCalendarAlt } from 'react-icons/fa';

const Task = props => {

    const progressStyle = {
        width: `${props.task.percentage}%`
    };

    let startDate;
    let dueDate;
    if(props.task['start_date']) {
        startDate = new Date(props.task.start_date).toLocaleDateString('fa-IR')
    } else {
        startDate = '--/--/--';
    }

    if(props.task['due_date']) {
        dueDate = new Date(props.task.due_date).toLocaleDateString('fa-IR')
    } else {
        dueDate = '--/--/--';
    }

    
    return (
        <div className={classes.Task} onClick={props.clickedTask}>
            <p>{props.task.title}</p>
            <div className={classes.TaskInfo} 
                 style={{visibility: !(props.task['start_date'] || props.task['due_date']) && 'hidden'}}>
                <div className={classes.TaskDeadline}>
                    <span><FaRegCalendarAlt /></span>
                    {startDate}
                    {' تا '}
                    {dueDate}
                </div>
            </div>
            <div className={classes.ProgressPercent} style={progressStyle}>
                
            </div>
        </div>
    );
}

export default Task;