import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import BrowseTopics from "../../Dashboard/BrowseTopics/BrowseTopics";
import { useTheme } from "@emotion/react";
import UserRooms from "./UserRooms";
import UserActivities from "./UserActivities";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";


const UserProfile = () => {
    const theme = useTheme();
    const { username } = useParams();
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     document.title = "Home";
    // }, []);

    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post("/new/get_user_details/", {
                username: username,
            });
            setUserDetails(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const rooms = useSelector((state) => state.rooms.rooms);
    console.log('rooms--------->', rooms)
    const userRooms = rooms.filter((room) => room.host === userDetails.username);

    useEffect(() => {
        fetchUserDetails();
    }, [username]);

    return (
        <Box
            sx={{
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "row",
                backgroundColor: theme.palette.background.paper,
                height: "fit-content",
                minHeight: "800px",
            }}
        >
            <Box sx={{ margin: "0px 5px 0px 10px", padding: 0, width: "25%" }}>
                <BrowseTopics />
            </Box>
            <Box sx={{ margin: "0px 5px 0px 5px", padding: 0, width: "50%" }}>
                <UserRooms userRooms={userRooms} userDetails={userDetails} />
            </Box>
            <Box sx={{ margin: "0px 10px 0px 5px", padding: 0, width: "25%" }}>
                <UserActivities userActivities={userDetails?.activities} />
            </Box>
        </Box>
    );
};

export default UserProfile;
