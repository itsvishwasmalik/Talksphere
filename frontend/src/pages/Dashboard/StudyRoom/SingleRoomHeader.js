import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const SingleRoomHeader = () => {
    return (
        <Card sx={{ backgroundColor: "#404040", margin: "15px" }}>
            <CardActionArea>
                <CardContent>
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
                            <Avatar
                                alt="White Devil"
                                src="/static/images/avatar/1.jpg"
                            />
                            <Box sx={{ marginLeft: "10px" }}>
                                <Typography
                                    component={Link}
                                    sx={{ color: "#E5E5E5" }}
                                >
                                    @whitedevil
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography>2 months, 1 week ago</Typography>
                        </Box>
                    </Box>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ padding: "20px" }}
                    >
                        Calling All Java Developers !
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
                                    sx={{ color: "#E5E5E5" }}
                                >
                                    0 Joined
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "#A3A3A3",
                                borderRadius: "10px",
                                paddingLeft: "15px",
                                paddingRight: "15px",
                            }}
                        >
                            <Typography>Java</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default SingleRoomHeader;
