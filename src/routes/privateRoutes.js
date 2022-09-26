import MyOrder from "../components/MySection/MyOrder";
import Profile from "../components/MySection/Profile";
import Report from "../components/MySection/Report";


export const privateRoutes = [
    { name: "Profile", Component: Profile },
    { path: "profile", name: "Profile", Component: Profile },
    { path: "orders", name: "Orders", Component: MyOrder },
    { path: "report", name: "Report", Component: Report },
]