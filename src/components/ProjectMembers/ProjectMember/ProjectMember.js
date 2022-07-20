import classes from './ProjectMember.module.css';
import FormLoading from '../../Ui/Loader/FormLoading/FormLoading';

const ProjectMember = props => {

    let paragraphClasses = [classes.RoleParagraph];
    let memberRole;
    if(props.memberRole === 'Admin') {
        memberRole = 'مدیر';
        paragraphClasses.push(classes.Admin);
    } else if(props.memberRole === 'User' && props.confirmed === false) {
        memberRole = 'در انتظار تایید کاربر...';
        paragraphClasses.push(classes.UserPending);
    } else if(props.memberRole === 'User' && props.confirmed === true) {
        memberRole = 'کاربر';
        paragraphClasses.push(classes.UserConfirmed);
    }

    let projectMemberClasses = [classes.ProjectMember];
    if(props.profileData.username === props.userName) {
        projectMemberClasses.push(classes.HighliteMember);
    }

    return (
        <div className={projectMemberClasses.join(' ')}>
            <h4>
                {props.userName}
                <span>
                    ({props.userEmail})
                </span>
            </h4>
            <p className={paragraphClasses.join(' ')}>
                {memberRole}
                {(props.loadingDeleteMember && props.deletingMemberMail === props.userEmail) &&     // moshkel ine ke bara tamae list loading miad
                    <div className={classes.Loading}>
                        <FormLoading /> 
                    </div>
                }
            </p>
            {(props.memberRole === 'User' && props.userRoleOfActiveProject === 'Admin') && 
                <button className={classes.DeleteUserBtn} onClick={props.clickedDeleteUserBtn}>
                    حذف
                </button>
            }
        </div>
    );
};

export default ProjectMember;
