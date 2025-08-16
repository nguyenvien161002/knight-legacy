import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";

const publicRoutes: Array<{path: string,component: any, layout?: string}> = [
    {path: '/',component: Home},
    {path: '/pro',component: Profile},
    {path: '/profile',component: Profile, layout: "dashboard"},
]

export{publicRoutes};
