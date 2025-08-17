import Home from "../pages/Home/Home"
import Profile from "../pages/Profile/Profile"
import User from "../pages/User/User"
import Attack from "../pages/Attack/Attack"
import SaleKnight from "../pages/Saleknight/Saleknight"
import Wedding from "../pages/Wedding/Wedding"

const publicRoutes: Array<{ path: string; component: any; layout?: string }> = [
  { path: "/", component: Home },
  { path: "/pro", component: Profile },
  { path: "/profile", component: Profile, layout: "dashboard" },
  { path: "/user", component: User, layout: "dashboard" },
  { path: "/attack", component: Attack, layout: "dashboard" },
  { path: "/sale", component: SaleKnight, layout: "dashboard" },
  { path: "/wedding", component: Wedding, layout: "dashboard" },
]

export { publicRoutes }
