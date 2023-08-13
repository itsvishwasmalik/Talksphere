import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SingleRoomHeader from "./SingleRoomHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@emotion/react";

const StudyRoom = () => {
    const theme = useTheme();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/new/rooms/");
            setRooms(data.rooms);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 3,
                    mx: 2,
                    borderRadius: "5px",
                    marginTop: "15px",
                    backgroundColor: theme.palette.background.default,
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
                        variant="p"
                        noWrap
                        sx={{ paddingLeft: 2, color: "#FAFAFA" }}
                    >
                        STUDY ROOM
                    </Typography>
                    <Typography
                        sx={{
                            paddingLeft: 2,
                            paddingTop: 1,
                            color: "#A3A3A3",
                            fontSize: "12px",
                        }}
                    >
                        8 rooms availalble
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: theme.palette.secondary.dark,
                        ":hover": {
                            backgroundColor: theme.palette.secondary.light,
                        },
                    }}
                >
                    Create Room
                </Button>
            </Box>
            <Box>
                {rooms?.map((room, index) => (
                    <SingleRoomHeader key={index} room={room} />
                ))}
            </Box>
        </>
    );
};

export default StudyRoom;
