import { Box } from "@mui/material";
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        document.title = "Home";
    }, []);

    return (
        <Box sx={{ margin: 0, padding: 0 }}>
           Hello
        </Box>
    );
};

export default Home;
