import { useSelector } from 'react-redux';
import classes from './JobListings.module.css';
import { Link } from 'react-router-dom';
import Card from './UI/Card';

const JobsAppliedList = () => {
    const jobs = useSelector((state) => state.jobs).jobs;
    const appliedJobs = jobs.filter((job) => job.applied);
    let content = (
        <ul className={classes.list}>
            {appliedJobs.map((job) => (
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
                            <b>Contact:</b> {job?.phoneNumber}
                        </p>
                    </article>
                </li>
            ))}
        </ul>
    );
    if (appliedJobs.length === 0) {
        content = (
            <Card>
                <div className={classes.message}>
                    <p>
                        You haven&apos;t applied to any jobs yet. Please go
                        through
                        <Link to='/jobs' className={classes.link}>
                            {' '}
                            Jobs Page{' '}
                        </Link>{' '}
                        and apply some.
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <div className={classes.container}>
            <h3>List of Applied Jobs ({appliedJobs.length})</h3>
            {content}
        </div>
    );
};

export default JobsAppliedList;
