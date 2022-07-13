import classes from './ProjectMembers.module.css';

const ProjectMembers = props => {

    return (
        <div className={classes.ProjectMembers}>
            {props.children}
        </div>
    );
};

export default ProjectMembers;
