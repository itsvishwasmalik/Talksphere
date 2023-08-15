import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
    getAvatarColors,
    getTimeDifference,
} from "../../utils/getTimeDifference";

const Room = ({ room, room_messages, paricipants }) => {
    return (
        <Box>
            {/* Chat Component */}
            <Box>
                <Box>
                    <ArrowBackIosIcon />
                    <Typography>Study Room</Typography>
                </Box>

                <Box>
                    <Box>
                        <Typography>{room.name}</Typography>
                        <Typography sx={{ fontSize: "12px", pl: 2 }}>
                            {getTimeDifference(room.created)} ago
                        </Typography>
                    </Box>
                    <Typography>Hosted By</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{
                                backgroundColor: getAvatarColors(room.host),
                            }}
                        >
                            {room.host[0].toUpperCase()}
                        </Avatar>
                        <Box sx={{ marginLeft: "10px" }}>
                            <Typography
                                component={Link}
                                sx={{
                                    color: theme.palette.secondary.main,
                                    textDecoration: "none",
                                }}
                            >
                                @{room.host}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Participants Component */}
            <Box></Box>
        </Box>
    );
};

export default Room;
