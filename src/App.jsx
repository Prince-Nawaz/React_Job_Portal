import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import JobsPage from './pages/Jobs';
import AuthenticationPage from './pages/Authenticate';
import HomePage from './pages/Home';
import CreateJobPostPage from './pages/CreateJobPost';
import AppliedJobsPage from './pages/AppliedJobs';
import UserPage from './pages/User';

const App = () => {
    const router = createBrowserRouter([
        {
            path: '',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: 'auth',
                    element: <AuthenticationPage />,
                },
                {
                    path: 'user-profile',
                    element: <UserPage />,
                },
                {
                    path: 'jobs',
                    children: [
                        {
                            index: true,
                            element: <JobsPage />,
                        },
                        {
                            path: 'create-new',
                            element: <CreateJobPostPage />,
                        },
                        {
                            path: 'applied-jobs',
                            element: <AppliedJobsPage />,
                        },
                        {
                            path: ':companyId/user-detail',
                            element: <UserPage />,
                        },
                    ],
                },
            ],
        },
    ]);
    return <RouterProvider router={router}></RouterProvider>;
};

export default App;
