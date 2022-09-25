import Home from '../pages/Home';
import BookDetail from '../pages/BookDetail';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import Category from '../pages/Category';
// import Register from '../pages/Register';

export const publicRoutes = [
    { path: "/", name: "Home", Component: Home },
    { path: "/book/:id", name: "BookDetail", Component: BookDetail },
    { path: "/login", name: "Login", Component: Login },
    { path: "/cart", name: "Cart", Component: Cart },
    { path: "/category/:query", name: "Category", Component: Category },
]