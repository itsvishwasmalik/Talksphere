import { Avatar, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { getAvatarColors, getTimeDifference } from "../../../utils";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import axios from "axios";

const Activity = ({ activity }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                border: 1,
                borderRadius: "5px",
                borderColor: theme.palette.grey[600],
                p: 2,
                my: 3,
                color: "white",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Box>
                    <Avatar
                        sx={{ backgroundColor: getAvatarColors(activity.name) }}
                    >
                        {activity.name[0].toUpperCase()}
                    </Avatar>
                </Box>
                <Box>
                    <Box sx={{ marginLeft: "10px" }}>
                        <Typography
                            component={Link}
                            sx={{
                                textDecoration: "none",
                                color: theme.palette.secondary.main,
                            }}
                        >
                            @{activity.name}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "12px", pl: 2 }}>
                            {getTimeDifference(activity.created)} ago
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    my: 1,
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "5px",
                }}
            >
                <Typography
                    variant="p"
                    noWrap
                    sx={{
                        p: 1,
                        color: "#FAFAFA",
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    {activity.message}
                </Typography>
            </Box>
        </Box>
    );
};

const RecentAcivities = () => {
    const theme = useTheme();

    const [activities, setActivities] = useState([]);

    const fetchActivities = async () => {
        const { data } = await axios.get(
            "http://localhost:8000/new/recent_activities/"
        );
        if (data) {
            setActivities(data.activities);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);
    return (
        <Box
            sx={{
                marginTop: "15px",
                backgroundColor: theme.palette.background.default,
                p: 2,
                borderRadius: "5px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px",
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "5px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignContent: "center",
                        width: "100%",
                        borderRadius: "5px",
                    }}
                >
                    <Typography
                        variant="p"
                        noWrap
                        sx={{
                            color: "#FAFAFA",
                        }}
                    >
                        RECENT ACTIVITIES
                    </Typography>
                </Box>
            </Box>
            {activities?.map((activity, index) => (
                <Activity key={index} activity={activity} />
            ))}
        </Box>
    );
};

export default RecentAcivities;
