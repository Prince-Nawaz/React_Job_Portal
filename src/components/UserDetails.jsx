import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobsActions } from '../store/jobs-slice';
import Card from './UI/Card';
import classes from './UserDetails.module.css';

const GITHUB_USER_REPO_URL = 'https://github.com/__USERNAME__/__PROJECT_NAME';

const UserDetails = (props) => {
    const selectedJobDetails = useSelector(
        (state) => state.jobs
    ).selectedJobDetails;
    const userState = useSelector((state) => state.users);
    const dispatchFn = useDispatch();
    useEffect(() => {
        dispatchFn(jobsActions.getJobApplicationDetails(props.companyId));
    }, [dispatchFn, props.companyId]);
    const applicants = userState.users.filter((user) =>
        selectedJobDetails?.applicantDetails?.includes(user.emailId)
    );
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>
                Applicants Details ({applicants.length})
            </h3>
            {applicants.map((user) => (
                <Card key={user.emailId}>
                    <ul className={classes.List}>
                        <li>
                            <b>User Name: </b> {user['userName']}
                        </li>
                        <li>
                            <b>Email Id: </b> {user['emailId']}
                        </li>
                        <li>
                            <b>First Name: </b> {user['firstName']}
                        </li>
                        <li>
                            <b>Last Name: </b> {user['lastName']}
                        </li>
                        <li>
                            <b>Skills: </b> {user['skills'].join(', ')}
                        </li>
                        <li>
                            <b>Projects & GitHub URL&apos;s</b>:
                            <table className={classes.table}>
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Project URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user['projects'].map((project) => (
                                        <tr key={project}>
                                            <td>{project}</td>
                                            <td>
                                                <a
                                                    href={GITHUB_USER_REPO_URL.replace(
                                                        '__USERNAME__',
                                                        user['githubUserName']
                                                    ).replace(
                                                        '__PROJECT_NAME',
                                                        project
                                                    )}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    {GITHUB_USER_REPO_URL.replace(
                                                        '__USERNAME__',
                                                        user['githubUserName']
                                                    ).replace(
                                                        '__PROJECT_NAME',
                                                        project
                                                    )}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </li>
                        <li>
                            <b>Phone Number: </b> {user['phoneNumber']}
                        </li>
                    </ul>
                </Card>
            ))}
        </div>
    );
};

export default UserDetails;
