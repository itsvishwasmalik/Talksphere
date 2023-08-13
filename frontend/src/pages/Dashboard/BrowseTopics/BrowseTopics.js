import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";

const Topic = ({ topic }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                py: 2,
            }}
        >
            <Typography variant="p" noWrap sx={{ paddingLeft: 2, width: 100 }}>
                {topic.name}
            </Typography>
            <Box>
                <Typography
                    noWrap
                    sx={{
                        backgroundColor: theme.palette.secondary.main,
                        textAlign: "center",
                        borderRadius: "5px",
                        px: 2,
                    }}
                >
                    {topic.count}
                </Typography>
            </Box>
        </Box>
    );
};

const BrowseTopics = () => {
    const theme = useTheme();

    const [topics, setTopics] = useState(null);

    const fetchTopics = async () => {
        const { data } = await axios.get(
            "http://localhost:8000/new/browse_topics/"
        );
        if (data) {
            setTopics(data.topics);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    return (
        <Box
            sx={{
                mt: 2,
                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                backgroundColor: theme.palette.background.default,
                borderRadius: "5px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    p: 1,
                    mx: -2,
                    mb: 1,
                    borderRadius: "5px",
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Typography
                    variant="p"
                    noWrap
                    sx={{ paddingLeft: 2, color: "#FAFAFA" }}
                >
                    BROWSE TOPICS
                </Typography>
            </Box>

            {topics?.map((topic, index) => (
                <Topic key={index} topic={topic} />
            ))}

            <Box
                sx={{
                    pt: 2,
                }}
            >
                <Typography
                    variant="p"
                    noWrap
                    sx={{
                        color: "#FAFAFA",
                        pl: 2,
                    }}
                >
                    more...
                </Typography>
            </Box>
        </Box>
    );
};

export default BrowseTopics;
