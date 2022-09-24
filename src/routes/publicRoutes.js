import Home from '../pages/Home';
import BookDetail from '../pages/BookDetail';
import Login from '../pages/Login';

export const publicRoutes = [
    { path: "/", name: "Home", Component: Home },
    { path: "/book/:id", name: "BookDetail", Component: BookDetail },
    { path: "/login", name: "Login", Component: Login },
]