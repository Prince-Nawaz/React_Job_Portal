import { useFormik } from 'formik';
import Card from './UI/Card';
import classes from './UserProfile.module.css';
import Button from './UI/Button';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { userActions } from '../store/user-slice';
import { useEffect, useState } from 'react';

const GITHUB_REPO_URL = `https://api.github.com/users/__USERNAME__/repos`;

const UserProfile = (props) => {
    const navigate = useNavigate();
    const dispatchFn = useDispatch();
    const [githubProjects, setGithubProjects] = useState([]);
    const [url, setUrl] = useState('');
    const [githubError, setGitHubError] = useState(null);

    const userDetails = useSelector((state) => state.users).users[0];
    useEffect(() => {
        if (!props.signUp) {
            Object.keys(formik.initialValues).forEach((field) => {
                if (Array.isArray(userDetails[field])) {
                    const value = userDetails[field].join(', ');
                    formik.setFieldValue(field, value);
                } else {
                    formik.setFieldValue(field, userDetails[field]);
                }
            });
            setUrl(
                GITHUB_REPO_URL.replace(
                    '__USERNAME__',
                    userDetails['githubUserName']
                )
            );
        }
    }, [props.signUp, userDetails]);

    const formik = useFormik({
        initialValues: {
            userName: '',
            emailId: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            skills: '',
            githubUserName: '',
            projects: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('User Name is required.'),
            emailId: Yup.string()
                .required('Email Id is required.')
                .email('Email Id should be valid.'),
            password: Yup.string().concat(
                props.signUp
                    ? Yup.string().required('Password is required')
                    : null
            ),
            confirmPassword: Yup.string()
                .when('password', (password, schema) => {
                    if (password && props.signUp)
                        return schema.required('Confirm Password is required');
                })
                .oneOf([Yup.ref('password')], 'Passwords must match'),
            firstName: Yup.string().required('First Name is required.'),
            lastName: Yup.string().required('Last Name is required.'),
            skills: Yup.string().required('Skills are required.'),
            githubUserName: Yup.string(),
            projects: Yup.string().required('Projects are required.'),
            phoneNumber: Yup.string()
                .required('Phone Number is required.')
                .matches(
                    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    'Phone number is not valid'
                ),
        }),
        onSubmit(values, formik) {
            if (props.signUp) {
                dispatchFn(
                    authActions.login({
                        isEmployer: false,
                        emailId: values.emailId,
                    })
                );
                dispatchFn(userActions.addUserDetails(values));
            } else {
                dispatchFn(userActions.updateUserDetails(values));
            }
            formik.setSubmitting(false);
            formik.resetForm();
            sessionStorage.setItem(
                'authDetails',
                JSON.stringify({
                    isLoggedIn: true,
                    isEmployer: false,
                    emailId: values.emailId,
                })
            );
            navigate('/jobs');
        },
    });

    useEffect(() => {
        if (url) {
            setGitHubError(null);
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            'Please check the github username provided.'
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    setGithubProjects(data);
                    formik.setFieldValue(
                        'projects',
                        data.map((data) => data.name).join(', ')
                    );
                })
                .catch((error) => setGitHubError(error));
        }
    }, [url, setGithubProjects]);
    // console.log(formik);
    return (
        <div className={classes.container}>
            <h3>{props.heading || 'My Profile'}</h3>
            <Card>
                <form
                    method='post'
                    className={classes.form}
                    onSubmit={formik.handleSubmit}
                >
                    <div className={classes.field}>
                        <label htmlFor='userName'>User Name</label>
                        <input
                            id='userName'
                            type='userName'
                            name='userName'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                        />
                        <div className={classes.error}>
                            {formik.errors.userName &&
                                formik.touched.userName &&
                                formik.errors.userName}
                        </div>
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='emailId'>Email</label>
                        <input
                            id='emailId'
                            type='emailId'
                            name='emailId'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.emailId}
                        />
                        <div className={classes.error}>
                            {formik.errors.emailId &&
                                formik.touched.emailId &&
                                formik.errors.emailId}
                        </div>
                    </div>
                    {props.signUp && (
                        <>
                            <div className={classes.field}>
                                <label htmlFor='password'>Password</label>
                                <input
                                    id='password'
                                    type='password'
                                    name='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                <div className={classes.error}>
                                    {formik.errors.password &&
                                        formik.touched.password &&
                                        formik.errors.password}
                                </div>
                            </div>
                            <div className={classes.field}>
                                <label htmlFor='confirmPassword'>
                                    Confirm Password
                                </label>
                                <input
                                    id='confirmPassword'
                                    type='password'
                                    name='confirmPassword'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                />
                                <div className={classes.error}>
                                    {formik.errors.confirmPassword &&
                                        formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword}
                                </div>
                            </div>
                        </>
                    )}
                    <div className={classes.field}>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            id='firstName'
                            type='firstName'
                            name='firstName'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                        />
                        <div className={classes.error}>
                            {formik.errors.firstName &&
                                formik.touched.firstName &&
                                formik.errors.firstName}
                        </div>
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            id='lastName'
                            type='lastName'
                            name='lastName'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                        />
                        <div className={classes.error}>
                            {formik.errors.lastName &&
                                formik.touched.lastName &&
                                formik.errors.lastName}
                        </div>
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <input
                            id='phoneNumber'
                            type='phoneNumber'
                            name='phoneNumber'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                        />
                        <div className={classes.error}>
                            {formik.errors.phoneNumber &&
                                formik.touched.phoneNumber &&
                                formik.errors.phoneNumber}
                        </div>
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='skills'>Skills</label>
                        <input
                            id='skills'
                            type='skills'
                            name='skills'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.skills}
                        />
                        <div className={classes.error}>
                            {formik.errors.skills &&
                                formik.touched.skills &&
                                formik.errors.skills}
                        </div>
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='projects'>Projects</label>
                        <input
                            id='projects'
                            type='projects'
                            name='projects'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.projects}
                        />
                        <div className={classes.error}>
                            {formik.errors.projects &&
                                formik.touched.projects &&
                                formik.errors.projects}
                        </div>
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='githubUserName'>Github UserName</label>
                        <input
                            id='githubUserName'
                            type='githubUserName'
                            name='githubUserName'
                            onChange={formik.handleChange}
                            onBlur={(event) => {
                                formik.handleBlur(event);
                                setUrl(
                                    `https://api.github.com/users/${event.target.value}/repos`
                                );
                            }}
                            value={formik.values.githubUserName}
                        />
                        <div>
                            <p>
                                Github URL Preview: <b>{url}</b>
                            </p>
                            <p className={classes.error}>
                                {githubError?.message}
                            </p>
                        </div>
                        <div className={classes.error}>
                            {formik.errors.githubUserName &&
                                formik.touched.githubUserName &&
                                formik.errors.githubUserName}
                        </div>
                        {!githubError && (
                            <table className={classes.table}>
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Project URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {githubProjects.map((project) => (
                                        <tr key={project.name}>
                                            <td>{project.name}</td>
                                            <td>
                                                <a
                                                    href={project.html_url}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    {project.html_url}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className={classes.actions}>
                        <Button
                            type='submit'
                            disabled={
                                formik.isSubmitting ||
                                !(formik.dirty && formik.isValid) ||
                                githubError
                            }
                        >
                            {props.signUp ? 'SignUp' : 'Update'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default UserProfile;
