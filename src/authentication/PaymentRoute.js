import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebaseConfig';

const PaymentRoute = () => {
    const location = useLocation();
    const [user, loading,] = useAuthState(auth);
    // const token = localStorage.getItem("accessToken");
    console.log(user, 'user from payment route');

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    } else {
        return <Outlet />;
    }
};

export default PaymentRoute;