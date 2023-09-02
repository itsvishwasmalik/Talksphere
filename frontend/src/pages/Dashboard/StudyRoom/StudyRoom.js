import { Backdrop, Box, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SingleRoomHeader from "./SingleRoomHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@emotion/react";
import RoomForm from "../../Components/RoomForm";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../../store/slices/rooms";
import Loader from "../../../utils/Loader";

const StudyRoom = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);
    const [loading, setLoading] = useState(false);
    const [openRoomForm, setOpenRoomForm] = useState(false);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/new/rooms/");
            dispatch(setRooms(data.rooms));
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    // console.log("rooms", rooms);

    const handleRoomForm = () => {
        setOpenRoomForm(!openRoomForm);
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <>
            {loading && <Loader />}
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
                        {rooms.length} rooms availalble
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleRoomForm}
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

            <Modal
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                closeAfterTransition
                open={openRoomForm}
                onClose={() => !openRoomForm}
            >
                <RoomForm setOpenRoomForm={setOpenRoomForm} />
            </Modal>
        </>
    );
};

export default StudyRoom;
