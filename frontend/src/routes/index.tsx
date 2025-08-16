import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import User from "../pages/User/User";
const publicRoutes: Array<{path: string,component: any, layout?: string}> = [
    {path: '/',component: Home},
    {path: '/pro',component: Profile},
    {path: '/profile',component: Profile, layout: "dashboard"},
    {path: '/user',component: User, layout: "dashboard"},
]

export{publicRoutes};
