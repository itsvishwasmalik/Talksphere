import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAvatarColors, getTimeDifference } from "../../../utils";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import useAuth from "../../../hooks/useAuth";

const Message = ({ room_message, handleMessageDelete }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useAuth();
    const handleUserProfile = () => {
        let path = `/user/${room_message?.user}`;
        navigate(path);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection:
                    user.username === room_message?.user
                        ? "row-reverse"
                        : "row",
                paddingX: 5,
                paddingY: 3,
            }}
        >
            <Box
                sx={{
                    border: `1px ridge ${getAvatarColors(room_message?.user)}`,
                    marginRight: 1,
                }}
            />
            <Box sx={{ width: "85%", p: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginX: 2,
                        alignItems: "center",
                    }}
                >
                    {/* Profile header */}
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
                                        room_message?.user
                                    ),
                                }}
                            >
                                {room_message?.user[0].toUpperCase()}
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
                                    @{room_message?.user}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        pl: 2,
                                        color: theme.palette.grey.grey500,
                                    }}
                                >
                                    {getTimeDifference(room_message?.created)}{" "}
                                    ago
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    {user.username === room_message?.user && (
                        <IconButton
                            sx={{ color: theme.palette.grey.grey400 }}
                            size="small"
                            aria-label="delete"
                            onClick={() =>
                                handleMessageDelete(room_message?.id)
                            }
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>

                <Box
                    sx={{
                        my: 1,
                        display: "flex",
                        // justifyContent: "center",
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "5px",
                        width: "98%",
                        ml: 2,
                    }}
                >
                    <Typography
                        variant="p"
                        sx={{
                            paddingY: 2,
                            paddingX: 3,
                            // ml:5,
                            color: theme.palette.grey.grey300,
                            backgroundColor: theme.palette.background.default,
                            borderRadius: "5px",
                            width: "100%",
                        }}
                    >
                        {room_message?.body}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Message;
