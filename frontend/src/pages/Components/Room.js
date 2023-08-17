import React from "react";
import { Box, InputAdornment, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTimeDifference, getAvatarColors } from "../../utils";
import { useTheme } from "@emotion/react";

const Room = ({ activity, room, room_messages, paricipants }) => {
    const theme = useTheme();
    return (
        <Box>
            {/* Chat Description */}
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
                    <Typography>{room.description}</Typography>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: "10px",
                            padding: "5px 15px 5px 15px",
                            paddingRight: "15px",
                        }}
                    >
                        <Typography sx={{ fontSize: "12px" }}>
                            {room.topic}
                        </Typography>
                    </Box>
                </Box>

                {/* Message Component */}
                <Box>
                    <Box>
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Box>
                                    <Avatar
                                        sx={{
                                            backgroundColor: getAvatarColors(
                                                activity.name
                                            ),
                                        }}
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
                                                color: theme.palette.secondary
                                                    .main,
                                            }}
                                        >
                                            @{activity.name}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{ fontSize: "12px", pl: 2 }}
                                        >
                                            {getTimeDifference(
                                                activity.created
                                            )}{" "}
                                            ago
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <DeleteIcon />
                        </Box>
                        <Box></Box>
                    </Box>

                    <FormControl fullWidth sx={{ m: 1 }}>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            }
                            label="Amount"
                        />
                        <SendIcon />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
};

export default Room;
