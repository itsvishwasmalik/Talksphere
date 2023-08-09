import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SingleRoomHeader from "./SingleRoomHeader";

const StudyRoom = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "35px",
                    marginTop: "15px",
                    backgroundColor: "#262626",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{ p: 1, color: "#FAFAFA" }}
                    >
                        STUDY ROOM
                    </Typography>
                    <Typography sx={{ paddingLeft: 1, color: "#A3A3A3" }}>
                        8 rooms availalble
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ backgroundColor: "#737373" }}
                >
                    Create Room
                </Button>
            </Box>
            <Box>
                <SingleRoomHeader />
            </Box>
        </>
    );
};

export default StudyRoom;
