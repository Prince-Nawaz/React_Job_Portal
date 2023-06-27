import { Link } from 'react-router-dom';
import classes from './Welcome.module.css';
import Card from './UI/Card';

const Welcome = () => {
    return (
        <div className={classes.container}>
            <Card>
                <div>Welcome To Job Portal</div>
                <Link to='/auth'>Login / SignUp</Link>
            </Card>
        </div>
    );
};

export default Welcome;
