import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth-slice';
import Button from './UI/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from './UI/Card';
import UserProfile from './UserProfile';

function AuthForm() {
    const [searchParams] = useSearchParams();
    const authState = useSelector((state) => state.auth);
    const dispatchFn = useDispatch();
    const navigate = useNavigate();

    const isLogin =
        searchParams.get('mode') === 'login' ||
        searchParams.get('mode') === null;
    const isEmployerLogin =
        JSON.parse(sessionStorage.getItem('authDetails'))?.isEmployer ||
        searchParams.get('userType') === 'employer';

    const formik = useFormik({
        initialValues: {
            emailId: '',
            password: '',
        },
        validationSchema: Yup.object({
            emailId: Yup.string()
                .required('Email Id is required')
                .email('Email Id should be valid.'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password should be minimum of 6 characters'),
        }),
        onSubmit(values) {
            dispatchFn(
                authActions.login({
                    isEmployer: isEmployerLogin,
                    emailId: values.emailId,
                })
            );
            formik.setSubmitting(false);
            formik.resetForm();
            sessionStorage.setItem(
                'authDetails',
                JSON.stringify({
                    isLoggedIn: true,
                    isEmployer: isEmployerLogin,
                    emailId: values.emailId,
                })
            );
            navigate('/jobs');
        },
    });

    let headerContent;
    let isFreelancerSignUp = false;
    if (isEmployerLogin && isLogin) {
        headerContent = 'LogIn as an Employer';
    } else if (isEmployerLogin && !isLogin) {
        headerContent = 'SignUp as an Employer';
    } else if (!isEmployerLogin && isLogin) {
        headerContent = 'LogIn as a Freelancer';
    } else {
        isFreelancerSignUp = true;
        headerContent = 'SignUp as a Freelancer';
    }

    return (
        <>
            {!isFreelancerSignUp && (
                <Card>
                    <form
                        method='post'
                        className={classes.form}
                        onSubmit={formik.handleSubmit}
                    >
                        {authState.isLoggedIn}
                        <h1>{headerContent}</h1>
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
                        <div className={classes.actions}>
                            <Link
                                to={`?mode=${
                                    isLogin ? 'signup' : 'login'
                                }&userType=${
                                    isEmployerLogin ? 'employer' : 'user'
                                }`}
                            >
                                {isLogin ? 'SignUp' : 'LogIn'}
                            </Link>
                            <Button
                                type='submit'
                                disabled={
                                    formik.isSubmitting ||
                                    !(formik.dirty && formik.isValid)
                                }
                            >
                                {isLogin ? 'LogIn' : 'SignUp'}
                            </Button>
                        </div>
                    </form>
                </Card>
            )}
            {isFreelancerSignUp && (
                <UserProfile heading={headerContent} signUp />
            )}
        </>
    );
}

export default AuthForm;
