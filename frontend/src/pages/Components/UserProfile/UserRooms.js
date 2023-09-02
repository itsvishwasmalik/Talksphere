import { Box, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import SingleRoomHeader from "../../Dashboard/StudyRoom/SingleRoomHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@emotion/react";
import RoomForm from "../../Components/RoomForm";
import Avatar from "@mui/material/Avatar";
import Loader from "../../../utils/Loader";
import { getAvatarColors } from "../../../utils";

const UserRooms = ({ username }) => {
    const [userRooms, setUserRooms] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const theme = useTheme();
    // const rooms = useSelector((state) => state.rooms.rooms);
    // console.log("rooms", rooms);
    const [loading, setLoading] = useState(false);
    const [openRoomForm, setOpenRoomForm] = useState(false);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/new/rooms/");
            setUserRooms(data.rooms.filter((room) => room.host === username));
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post("/new/get_user_details/", {
                username: username,
            });
            setUserDetails(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    console.log("userDetails", userDetails);

    useEffect(() => {
        fetchRooms();
        fetchUserDetails();
    }, []);

    return (
        <>
            {loading && <Loader />}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 3,
                }}
            >
                <Avatar
                    sx={{
                        backgroundColor: getAvatarColors(userDetails.username),
                        height: "150px",
                        width: "150px",
                        paddingBottom: 1,
                        marginBottom: 1,
                    }}
                >
                    <Typography sx={{ fontSize: "75px", pt: 1 }}>
                        {userDetails.username?.[0].toUpperCase()}
                    </Typography>
                </Avatar>
                <Typography
                    sx={{
                        color: theme.palette.primary.contrastText,
                        fontSize: "13px",
                        paddingY: 1,
                    }}
                >
                    {userDetails.username?.toUpperCase()}
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.secondary.main,
                        textDecoration: "none",
                        fontSize: "15px",
                    }}
                >
                    {userDetails.email}
                </Typography>
            </Box>

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
                <Box>
                    <Typography
                        variant="p"
                        noWrap
                        sx={{ paddingLeft: 2, color: "#FAFAFA" }}
                    >
                        STUDY ROOMS BY {userDetails.username?.toUpperCase()}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            color: "#A3A3A3",
                            fontSize: "12px",
                        }}
                    >
                        {userRooms.length} rooms availalble
                    </Typography>
                </Box>
            </Box>
            <Box>
                {userRooms?.map((room, index) => (
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

export default UserRooms;
