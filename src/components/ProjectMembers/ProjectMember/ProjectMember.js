import classes from './ProjectMember.module.css';

const ProjectMember = props => {

    return (
        <div className={classes.ProjectMember}>
            <h4>
                {props.userName}
                <span>
                    ({props.userEmail})
                </span>
            </h4>
            <p>
                {props.memberRole}
            </p>
        </div>
    );
};

export default ProjectMember;
