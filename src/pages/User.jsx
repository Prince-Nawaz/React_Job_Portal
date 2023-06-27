import { useParams } from 'react-router-dom';
import UserDetails from '../components/UserDetails';
import UserProfile from '../components/UserProfile';

const UserPage = () => {
    const params = useParams();
    const companyId = params?.companyId;
    if (companyId) {
        return <UserDetails companyId={companyId} />;
    }

    return <UserProfile />;
};

export default UserPage;
