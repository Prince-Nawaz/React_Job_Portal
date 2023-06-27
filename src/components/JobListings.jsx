import classes from './JobListings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Button from './UI/Button';
import { jobsActions } from '../store/jobs-slice';
import { Link } from 'react-router-dom';
import Card from './UI/Card';
import { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

const JobListings = () => {
    const jobs = useSelector((state) => state.jobs).jobs;
    const authDetails = useSelector((state) => state.auth);
    const dispatchFn = useDispatch();
    const [filterTags, setFilterTags] = useState([]);

    const authState = useSelector((state) => state.auth);
    if (jobs.length === 0) {
        return (
            <div className={classes.message}>
                <p>
                    Looks like there isn&apos;t any openings right now. Please
                    try after sometime.
                </p>
            </div>
        );
    }

    const onApplyHandler = (companyId) => {
        dispatchFn(
            jobsActions.applyJob({ companyId, emailId: authDetails.emailId })
        );
    };
    const onWithdrawHandler = (companyId) => {
        dispatchFn(
            jobsActions.withdrawJob({
                companyId,
                emailId: authDetails.emailId,
            })
        );
    };

    let filteredJobs = jobs;

    if (filterTags.length > 0) {
        filteredJobs = jobs.filter((job) => {
            return job.tags
                .map((e) => e.trim())
                .some(
                    (tag) =>
                        filterTags.includes(tag) ||
                        filterTags.includes(job.salary)
                );
        });
    }

    return (
        <div className={classes.container}>
            <Card>
                <div>
                    <h2>
                        Search jobs based on skill set/ min. salary per hour
                    </h2>
                    <TagsInput
                        value={filterTags}
                        onChange={setFilterTags}
                        name='skills'
                        placeHolder='Ex: Angular, React, $50, $65....'
                    />
                    <em>press enter to add new filter attribute.</em>
                </div>
            </Card>
            <h3>List of Jobs ({filteredJobs.length})</h3>
            <ul className={classes.list}>
                {filteredJobs.map((job) => (
                    <li key={job.companyId}>
                        <article className={classes.item}>
                            <h4>Company Name: {job?.companyName}</h4>
                            <p>
                                <b>Description:</b> {job?.description}
                            </p>
                            <p>
                                <b>Requirements:</b> {job?.requirements}
                            </p>
                            <p>
                                <b>Tags:</b> {job?.tags.join(', ')}
                            </p>
                            <p>
                                <b>Salary/hour:</b> {job?.salary}
                            </p>
                            <p>
                                <b>Contact:</b> {job?.phoneNumber}
                            </p>
                            {!authState.isEmployer && (
                                <>
                                    <Button
                                        onClick={onApplyHandler.bind(
                                            this,
                                            job?.companyId
                                        )}
                                        disabled={job?.applied}
                                    >
                                        {job?.applied ? 'Applied' : 'Apply'}
                                    </Button>{' '}
                                    |{' '}
                                    <Button
                                        onClick={onWithdrawHandler.bind(
                                            this,
                                            job?.companyId
                                        )}
                                        disabled={!job?.applied}
                                        secondary
                                    >
                                        Withdraw
                                    </Button>
                                </>
                            )}
                            {authState.isEmployer && job?.applied && (
                                <Link
                                    to={`/jobs/${job?.companyId}/user-detail`}
                                >
                                    Applications({job?.applicantDetails.length})
                                </Link>
                            )}
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobListings;
