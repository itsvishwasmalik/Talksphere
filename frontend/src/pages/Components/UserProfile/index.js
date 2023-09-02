import { Box } from "@mui/material";
import { useEffect } from "react";
import StudyRoom from "../../Dashboard/StudyRoom/StudyRoom";
import BrowseTopics from "../../Dashboard/BrowseTopics/BrowseTopics";
import RecentAcivities from "../../Dashboard/RecentActivities/RecentActivities";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import UserRooms from "./UserRooms";
import UserActivities from "./UserActivities";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const theme = useTheme();
    const { username } = useParams();
    useEffect(() => {
        document.title = "Home";
    }, []);

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
                <UserRooms username={username} />
            </Box>
            <Box sx={{ margin: "0px 10px 0px 5px", padding: 0, width: "25%" }}>
                <UserActivities username={username} />
            </Box>
        </Box>
    );
};

export default UserProfile;
