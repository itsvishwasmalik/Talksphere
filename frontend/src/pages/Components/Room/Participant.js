import React from "react";
import { Box,Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { getAvatarColors } from "../../../utils";

const Participant = ({participant}) => {
    const theme = useTheme();
    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                m:2,
            }}
        >
            <Avatar
                sx={{
                    backgroundColor: getAvatarColors(participant)
                }}
            >
                <Typography sx={{color:theme.palette.primary.contrastText}}>{participant?.[0].toUpperCase()}</Typography>
            </Avatar>
            <Box sx={{ marginLeft: "10px" }}>
                <Typography sx={{color:theme.palette.primary.contrastText, fontSize:"13px", pl:.5}}>{participant?.toUpperCase()}</Typography>
                <Typography
                    component={Link}
                    sx={{
                        color: theme.palette.secondary.main,
                        textDecoration: "none",
                        fontSize: "15px",
                    }}
                >
                    @{participant}
                </Typography>
            </Box>
        </Box>
    );
} ;

export default Participant;