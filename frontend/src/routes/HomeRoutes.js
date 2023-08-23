import Home from "../pages/Dashboard";
import SearchBar from "../components/SearchBar";
import User from "../pages/User";
import NotFound from "../utils/NotFound";
import AuthGuard from "./route-guards/AuthGuard";
import Room from "../pages/Components/Room";

const HomeRoute = {
    path: "/",
    element: (
        <AuthGuard>
            <SearchBar />
            <Home />
        </AuthGuard>
    ),
    children: [
        {
            path: "home",
            element: <Home />,
        },
    ],
};

const RoomRoute = {
    path: "/new/get_room/:roomId",
    element: (
        <AuthGuard>
            <SearchBar/>
            <Room />
        </AuthGuard>
    ),
    // children: [
    //     {
    //         path: "getroom",
    //         element: <Home />,
    //     },
    // ],
}

const UserRoute = {
    path: "/user",
    element: (
        <AuthGuard>
            <SearchBar />
            <User />
        </AuthGuard>
    ),
};

const NotFoundRoute = {
    path: "*",
    element: (
        <AuthGuard>
            <SearchBar />
            <NotFound />
        </AuthGuard>
    ),
};

const HomeRoutes = [HomeRoute, RoomRoute, UserRoute, NotFoundRoute];

export default HomeRoutes;
