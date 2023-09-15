import { Box } from "@mui/material";
import { useEffect } from "react";
import StudyRoom from "./StudyRoom/StudyRoom";
import BrowseTopics from "./BrowseTopics/BrowseTopics";
import RecentAcivities from "./RecentActivities/RecentActivities";
import { useTheme } from "@emotion/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../store/slices/rooms";
import { useState } from "react";
import { setFilteredRooms } from "../../store/slices/filteredRooms";

const Home = () => {
    const theme = useTheme();
    useEffect(() => {
        document.title = "Home";
    }, []);
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);
    const filteredRooms = useSelector((state)=>state.filteredRooms.filteredRooms)
    const [loading, setLoading] = useState(false);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/new/rooms/");
            dispatch(setRooms(data.rooms));
            dispatch(setFilteredRooms(data.rooms));
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // const fetchFilteredRooms = async () => {
    //     try {
    //         setLoading(true);
    //         const { data } = await axios.get("/new/rooms/");
    //         dispatch(setFilteredRooms(data.filteredRooms));
    //         setLoading(false);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     fetchFilteredRooms();
    // }, []);

    return (
        <Box
            sx={{
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "row",
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <Box sx={{ margin: "0px 5px 0px 10px", padding: 0, width: "25%" }}>
                <BrowseTopics />
            </Box>
            <Box sx={{ margin: "0px 5px 0px 5px", padding: 0, width: "50%" }}>
                <StudyRoom />
            </Box>
            <Box sx={{ margin: "0px 10px 0px 5px", padding: 0, width: "25%" }}>
                <RecentAcivities />
            </Box>
        </Box>
    );
};

export default Home;
