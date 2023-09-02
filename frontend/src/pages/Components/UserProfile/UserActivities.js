import { Avatar, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { getAvatarColors, getTimeDifference } from "../../../utils";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Activity from "../Activity";

const UserAcivities = ({ username }) => {
    const theme = useTheme();

    const [activities, setActivities] = useState([]);

    const fetchActivities = async () => {
        const { data } = await axios.get("/new/recent_activities/");
        if (data) {
            setActivities(
                data.activities.filter((activity) => activity.name === username)
            );
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);
    return (
        <Box
            sx={{
                marginTop: 2,
                backgroundColor: theme.palette.background.default,
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
                    backgroundColor: theme.palette.primary.main,
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
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
                            color: theme.palette.primary.contrastText,
                            pl: 2,
                        }}
                    >
                        RECENT ACTIVITIES
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ pt: 1, pb: 2, paddingX: 3 }}>
                {activities?.map((activity, index) => (
                    <Activity key={index} activity={activity} />
                ))}
            </Box>
        </Box>
    );
};

export default UserAcivities;
