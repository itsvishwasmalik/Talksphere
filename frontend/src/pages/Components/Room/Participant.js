import React from "react";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@emotion/react";
import { getAvatarColors } from "../../../utils";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Participant = ({ participant }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const handleUserProfile = () => {
        let path = `/user/${participant}`;
        navigate(path);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                m: 2,
            }}
        >
            <Avatar
                sx={{
                    backgroundColor: getAvatarColors(participant),
                }}
            >
                <Typography sx={{ color: theme.palette.primary.contrastText }}>
                    {participant?.[0].toUpperCase()}
                </Typography>
            </Avatar>
            <Box sx={{ marginLeft: "10px" }}>
                <Typography
                    sx={{
                        color: theme.palette.primary.contrastText,
                        fontSize: "13px",
                        pl: 0.5,
                    }}
                >
                    {participant?.toUpperCase()}
                </Typography>
                <Typography
                    component={Button}
                    sx={{
                        color: theme.palette.secondary.main,
                        textDecoration: "none",
                        fontSize: "12px",
                        p: 0,
                    }}
                    onclick={handleUserProfile}
                >
                    @{participant}
                </Typography>
            </Box>
        </Box>
    );
};

export default Participant;
