import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useTheme } from "@emotion/react";
import { getAvatarColors, getTimeDifference } from "../../../utils";
import { useNavigate } from "react-router-dom";

const SingleRoomHeader = ({ room }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const routeChange = () => {
        let path = `/new/get_room/${room?.id}`;
        navigate(path);
    };

    return (
        <Card
            sx={{
                backgroundColor: theme.palette.background.default,
                margin: "15px",
            }}
        >
            <CardActionArea onClick={routeChange}>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "10px",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                sx={{
                                    backgroundColor: getAvatarColors(room?.host),
                                }}
                            >
                                {room?.host?.[0]?.toUpperCase()}
                            </Avatar>
                            <Box sx={{ marginLeft: "10px" }}>
                                <Typography
                                    sx={{
                                        color: theme.palette.primary
                                            .contrastText,
                                        fontSize: "13px",
                                        pl: 0.5,
                                    }}
                                >
                                    {room?.host?.toUpperCase()}
                                </Typography>
                                <Typography
                                    component={Link}
                                    sx={{
                                        color: theme.palette.secondary.main,
                                        textDecoration: "none",
                                        p: 0,
                                        marginTop: "3px",
                                        fontSize: "11px",
                                    }}
                                >
                                    @{room?.host}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: theme.palette.grey.grey300,
                                }}
                            >
                                {getTimeDifference(room?.created)} ago
                            </Typography>
                        </Box>
                    </Box>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                            padding: "20px 0px 20px 20px",
                            color: theme.palette.primary.contrastText,
                        }}
                    >
                        {room?.name}
                    </Typography>
                    <Divider />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "10px",
                            paddingLeft: "25px",
                            paddingRight: "25px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <PeopleAltIcon
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                }}
                            />
                            <Box sx={{ marginLeft: "10px" }}>
                                <Typography
                                    component={Link}
                                    sx={{
                                        color: theme.palette.primary
                                            .contrastText,
                                        fontSize: "12px",
                                    }}
                                >
                                    {room?.participants} Joined
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: "10px",
                                padding: "5px 15px 5px 15px",
                                paddingRight: "15px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: theme.palette.primary.contrastText,
                                }}
                            >
                                {room?.topic}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default SingleRoomHeader;
