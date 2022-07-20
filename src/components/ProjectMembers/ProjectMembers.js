import classes from './ProjectMembers.module.css';
import FormLoading from '../Ui/Loader/FormLoading/FormLoading';

const ProjectMembers = props => {

    return (
        <div className={classes.ProjectMembers}>
            {props.children}
            {props.loadingGetMembers &&
                <div className={classes.LoadingMembers}>
                    <FormLoading />
                </div>
            }
        </div>
    );
};

export default ProjectMembers;
