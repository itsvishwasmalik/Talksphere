import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@emotion/react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../store/slices/rooms";
import { setFilteredRooms } from "../../store/slices/filteredRooms";
import { openSnackbar } from "../../store/slices/snackbar";

const RoomForm = ({ setOpenRoomForm }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);
    const filteredRooms = useSelector((state)=>state.filteredRooms.filteredRooms);
    const [inputText, setInputText] = useState({
        topic: "",
        name: "",
        description: "",
    });

    const handleClose = () => setOpenRoomForm(false);

    const handleRoomForm = async () => {
        try {
            if (inputText.topic === "" || inputText.name === "") {
                setOpenRoomForm(false);
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Topic and Name are required',
                        variant: 'alert',
                        alert: {
                            severity: 'error',
                        }
                    })
                )
            }
            else{
                const response = await axios.post("/new/create_room/", inputText);
                if (response.data) {
                    const data = response.data;
                    dispatch(setRooms([data, ...rooms]));
                    dispatch(setFilteredRooms([data, ...filteredRooms]));
                    setOpenRoomForm(false);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: "Room Created Successfully",
                            variant: 'alert',
                            alert:{
                                severity: 'success',
                            }
                        })
                    );
                }
            }
            
        } catch (err) {
            setOpenRoomForm(false);
            dispatch(
                openSnackbar({
                    open: true,
                    message: err.error,
                    variant: 'alert',
                    alert: {
                        severity: 'error',
                    }
                })
            )
            console.log(err);
        }
    };

    return (
        <Box
            sx={{
                bgcolor: theme.palette.background.default,
                width: 600,
                height: 500,
            }}
        >
            <Box>
                <Box
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        p: 2,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <ArrowBackIcon
                        onClick={handleClose}
                        sx={{
                            ml: 1,
                            color: theme.palette.primary.contrastText,
                            fontSize: "18px",
                        }}
                    />
                    <Typography
                        variant="p"
                        sx={{
                            color: theme.palette.primary.contrastText,
                            pl: 1.5,
                            alignSelf: "center",
                        }}
                    >
                        CREATE ROOM
                    </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Box sx={{ paddingY: 2 }}>
                        <TextField
                            id="outlined-search"
                            label="Enter a Topic*"
                            type="search"
                            fullWidth
                            value={inputText.topic}
                            onChange={(event) => {
                                setInputText((prevInputText) => ({
                                    ...prevInputText,
                                    topic: event.target.value,
                                }));
                            }}
                        />
                    </Box>
                    <Box sx={{ paddingY: 2 }}>
                        <TextField
                            id="outlined-search"
                            label="Room Name*"
                            type="search"
                            fullWidth
                            value={inputText.name}
                            onChange={(event) => {
                                setInputText((prevInputText) => ({
                                    ...prevInputText,
                                    name: event.target.value,
                                }));
                            }}
                        />
                    </Box>
                    <Box sx={{ paddingY: 2 }}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Room Description"
                            multiline
                            fullWidth
                            rows={5}
                            value={inputText.description}
                            onChange={(event) => {
                                setInputText((prevInputText) => ({
                                    ...prevInputText,
                                    description: event.target.value,
                                }));
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Button
                        autoFocus
                        variant="contained"
                        type="submit"
                        onClick={handleRoomForm}
                        // ref={(buttonRef) => (this.buttonRef = buttonRef)}
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            ":hover": {
                                backgroundColor: theme.palette.secondary.light,
                            },
                            marginX: 2,
                            color: theme.palette.secondary.contrastText,
                        }}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            ":hover": {
                                backgroundColor: theme.palette.primary.light,
                            },
                        }}
                    >
                        <Typography sx={{ fontSize: "12px" }}>
                            Cancel
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default RoomForm;
