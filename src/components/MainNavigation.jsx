import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { useEffect, useMemo } from 'react';
import Button from './UI/Button';
import { jobsActions } from '../store/jobs-slice';
import jobsMockData from '../../mock_data.json';

function MainNavigation(props) {
    const authState = useSelector((state) => state.auth);
    const dispatchFn = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isEmployerLogin =
        searchParams.get('userType') === 'employer' || authState.isEmployer;

    const jobsData = useMemo(() => jobsMockData, []);
    useEffect(() => {
        dispatchFn(jobsActions.loadJobs(jobsData));
    }, [jobsData, dispatchFn]);

    useEffect(() => {
        if (sessionStorage.getItem('authDetails')) {
            const authDetails = JSON.parse(
                sessionStorage.getItem('authDetails')
            );
            dispatchFn(
                authActions.login({
                    emailId: authDetails.emailId,
                    isEmployer: authDetails.isEmployer,
                    isLoggedIn: authDetails.isLoggedIn,
                })
            );
        }
    }, [dispatchFn]);

    const onLogoutHandler = () => {
        dispatchFn(authActions.logout());
        navigate('/');
        sessionStorage.removeItem('authDetails');
    };

    return (
        <header className={classes.header} id={props.theme}>
            <h2>
                JobPortal{' '}
                <sub>{isEmployerLogin ? ' Employer' : ' Freelancer'}</sub>
            </h2>

            <ul className={classes.nav}>
                {!authState.isLoggedIn && (
                    <>
                        <li>
                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/auth?mode=login'
                                className={({ isActive }) =>
                                    isActive && !isEmployerLogin
                                        ? classes.active
                                        : undefined
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/auth?mode=login&userType=employer'
                                className={({ isActive }) =>
                                    isActive && isEmployerLogin
                                        ? classes.active
                                        : undefined
                                }
                            >
                                Employer LogIn
                            </NavLink>
                        </li>
                    </>
                )}
                {authState.isLoggedIn && (
                    <>
                        {authState.isEmployer && (
                            <li>
                                <NavLink
                                    to='jobs/create-new'
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                >
                                    Post New Job
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink
                                to='/jobs'
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                            >
                                {authState.isEmployer
                                    ? 'Your Job Posts'
                                    : 'Jobs'}
                            </NavLink>
                        </li>
                        {!authState.isEmployer && (
                            <>
                                <li>
                                    <NavLink
                                        to='jobs/applied-jobs'
                                        className={({ isActive }) =>
                                            isActive
                                                ? classes.active
                                                : undefined
                                        }
                                    >
                                        Applied Jobs
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/user-profile'
                                        className={({ isActive }) =>
                                            isActive
                                                ? classes.active
                                                : undefined
                                        }
                                    >
                                        My Profile
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </>
                )}
            </ul>
            <ul className={classes.nav}>
                <li className={classes.switchBtn}>{props.children}</li>
                {authState.isLoggedIn && (
                    <li>
                        <Button onClick={onLogoutHandler}>Logout</Button>
                    </li>
                )}
            </ul>
        </header>
    );
}

export default MainNavigation;
