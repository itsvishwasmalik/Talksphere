import { Box } from "@mui/material";
import { useEffect } from "react";
import StudyRoom from "./StudyRoom/StudyRoom";
import BrowseTopics from "./BrowseTopics/BrowseTopics";
import RecentAcivities from "./RecentActivities/RecentActivities";
import { useTheme } from "@emotion/react";

const Home = () => {
    const theme = useTheme();
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
            }}
        >
            <Box sx={{ margin: "0px 5px 0px 10px", padding: 0, width: "25%" }}>
                <BrowseTopics />
            </Box>
            <Box sx={{ margin: "0px 5px 0px 5px", padding: 0, width: "50%" }}>
                <StudyRoom />
            </Box>
            <Box sx={{ margin: "0px 10px 0px 5px", padding: 0, width: "25%" }}>
                <RecentAcivities />
            </Box>
        </Box>
    );
};

export default Home;
