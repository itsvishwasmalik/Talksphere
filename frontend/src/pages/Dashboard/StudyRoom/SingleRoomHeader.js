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

const SingleRoomHeader = ({ room }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                backgroundColor: theme.palette.background.default,
                margin: "15px",
            }}
        >
            <CardActionArea>
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
                        <Box>
                            <Typography sx={{ fontSize: "12px" }}>
                                {getTimeDifference(room.created)} ago
                            </Typography>
                        </Box>
                    </Box>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ padding: "10px 0px 10px 20px" }}
                    >
                        {room.name}
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
                            <PeopleAltIcon />
                            <Box sx={{ marginLeft: "10px" }}>
                                <Typography
                                    component={Link}
                                    sx={{ color: "#E5E5E5", fontSize: "12px" }}
                                >
                                    {room.participants} Joined
                                </Typography>
                            </Box>
                        </Box>
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
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default SingleRoomHeader;
