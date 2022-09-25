import MyOrder from "../components/MySection/MyOrder";
import Profile from "../components/MySection/Profile";


export const privateRoutes = [
    { name: "Profile", Component: Profile },
    { path: "profile", name: "Profile", Component: Profile },
    { path: "orders", name: "Orders", Component: MyOrder },
]