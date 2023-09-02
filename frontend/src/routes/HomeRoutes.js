import Home from "../pages/Dashboard";
import SearchBar from "../components/SearchBar";
import User from "../pages/User";
import NotFound from "../utils/NotFound";
import AuthGuard from "./route-guards/AuthGuard";
import Room from "../pages/Components/Room";
import UserProfile from "../pages/Components/UserProfile";

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
            <SearchBar />
            <Room />
        </AuthGuard>
    ),
    // children: [
    //     {
    //         path: "getroom",
    //         element: <Home />,
    //     },
    // ],
};

const UserRoute = {
    path: "/user",
    element: (
        <AuthGuard>
            <SearchBar />
            <User />
        </AuthGuard>
    ),
};

const UserProfileRoute = {
    path: "/user/:username",
    element: (
        <AuthGuard>
            <SearchBar />
            <UserProfile />
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

const HomeRoutes = [
    HomeRoute,
    RoomRoute,
    UserRoute,
    NotFoundRoute,
    UserProfileRoute,
];

export default HomeRoutes;
