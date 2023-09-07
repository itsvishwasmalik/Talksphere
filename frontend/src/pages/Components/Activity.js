import React from "react";
import { useTheme } from "@emotion/react";
import { getAvatarColors, getTimeDifference } from "../../utils";
import { Box, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Activity = ({ activity }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const handleUserProfile = () => {
        let path = `/user/${activity.name}`;
        navigate(path);
    };
    const handleRoom = () => {
        let path = `/new/get_room/${activity.room_id}`;
        navigate(path);
    };
    return (
        <Box
            sx={{
                border: 1,
                borderRadius: "5px",
                borderColor: theme.palette.grey[600],
                borderLeftColor: getAvatarColors(activity.name),
                borderLeftWidth: "5px",
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
                            component={Button}
                            sx={{
                                textDecoration: "none",
                                color: theme.palette.secondary.main,
                                p: 0,
                                fontSize: "14px",
                            }}
                            onClick={handleUserProfile}
                        >
                            @{activity.name}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "12px",
                                pl: 2,
                                color: theme.palette.grey.grey300,
                            }}
                        >
                            {getTimeDifference(activity.created)} ago
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 1,
                }}
            >
                <Typography sx={{ color: theme.palette.grey.grey300 }}>
                    Replied to post &nbsp;
                </Typography>
                <Button sx={{ p: 0, fontSize: "13px" }} onClick={handleRoom}>
                    <Typography sx={{ color: theme.palette.secondary.main }}>
                        "{activity.room}"
                    </Typography>
                </Button>
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

export default Activity;
