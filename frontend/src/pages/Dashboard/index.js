import { Box } from "@mui/material";
import { useEffect } from "react";
import StudyRoom from "./StudyRoom/StudyRoom";

const Home = () => {
    useEffect(() => {
        document.title = "Home";
    }, []);

    return (
        <Box sx={{ margin: 0, padding: 0 }}>
            <StudyRoom />
        </Box>
    );
};

export default Home;
