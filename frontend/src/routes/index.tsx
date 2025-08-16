import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";

const publicRoutes: Array<{path: string,component: any, layout?: string}> = [
    {path: '/',component: Home},
    {path: '/profile',component: Profile},
]

export{publicRoutes};
