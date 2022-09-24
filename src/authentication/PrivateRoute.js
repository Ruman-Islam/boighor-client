import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebaseConfig';

const PrivateRoute = () => {
    const location = useLocation();
    const [user, loading,] = useAuthState(auth);

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    } else {
        return <Outlet />;
    }
};

export default PrivateRoute;