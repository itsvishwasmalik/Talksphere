import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { getTimeDifference, getAvatarColors } from "../../../utils";
import UpdateIcon from "@mui/icons-material/Update";
import Message from "./Message";
import Participant from "./Participant";
import Modal from "@mui/material/Modal";
import UpdateRoomForm from "../UpdateRoomForm";
import chatBg from "../../../assets/chat_bg.jpg";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../store/slices/snackbar";

const Room = () => {
    const [roomData, setRoomData] = useState([]);
    const [inputText, setInputText] = useState("");
    const [openUpdateRoomForm, setOpenUpdateRoomForm] = useState(false);
    const [roomDetailsText, setRoomDetailsText] = useState({
        topic: "",
        name: "",
        description: "",
    });

    const { user } = useAuth();
    const theme = useTheme();
    const { roomId } = useParams();
    const dispatch = useDispatch();
    const sendRef = useRef(null);

    useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.key === 'Enter') {
            sendRef.current.click();
          }
        };
        document.addEventListener('keydown', handleKeyPress)
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, []);

    const handleMessageDelete = async (id) => {
        try {
            await axios.post(`/new/delete_message/${id}/`);
            setRoomData((roomData) => {
                return {
                    ...roomData,
                    room_messages: roomData?.room_messages.filter(
                        (room_message) => room_message.id !== id
                    ),
                };
            });
            dispatch(
                openSnackbar({
                    open:'true',
                    message: "Message deleted successfully!",
                    variant: 'alert',
                    alert:{
                        severity: 'info',
                    }
                }),
            )
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    const fetchRoom = async () => {
        const { data } = await axios.get(`/new/get_room/${roomId}`);
        if (data) {
            setRoomData(data);
        }
    };

    useEffect(() => {
        fetchRoom();
    }, []);

    const navigate = useNavigate();
    const homeRouteChange = () => {
        let path = `/home`;
        navigate(path);
    };

    const handleSendClick = async () => {
        try {
            const { data } = await axios.post(`/new/get_room/${roomId}/`, {
                body: inputText,
            });

            setRoomData((roomData) => {
                return {
                    ...roomData,
                    room_messages: [data.message, ...roomData?.room_messages],
                    participants: !roomData?.participants.includes(
                        data.message.user
                    )
                        ? [data.message.user, ...roomData.participants]
                        : roomData.participants,
                };
            });

            setInputText("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleTextChange = (event) => {
        setInputText(event.target.value);
    };

    const deleteRoom = async () => {
        try {
            const response = await axios.post(`/new/delete_room/${roomId}/`);
            homeRouteChange();
            dispatch(
                openSnackbar({
                    open:'true',
                    message: "Room deleted successfully!",
                    variant: 'alert',
                    alert:{
                        severity: 'success',
                    }
                }),
            )
        } catch (error) {
            dispatch(
                openSnackbar({
                    open:'true',
                    message: "Error deleting room!",
                    variant: 'alert',
                    alert:{
                        severity: 'error',
                    }
                }),
            )
            console.error("Error deleting room:", error);
        }
    };

    const handleUserProfile = () => {
        let path = `/user/${roomData?.room?.host}`;
        navigate(path);
    };

    const handleUpdateRoomForm = () => {
        setOpenUpdateRoomForm(!openUpdateRoomForm);
    };

    const handleRoomForm = async () => {
        try {
            const { data } = await axios.post(
                `/new/update_room/${roomId}/`,
                roomDetailsText
            );
            roomData.room.name = data.name;
            roomData.room.topic = data.topic;
            roomData.room.description = data.description;
            setOpenUpdateRoomForm(!openUpdateRoomForm);
            dispatch(
                openSnackbar({
                    open:'true',
                    message: "Room details updated successfully!",
                    variant: 'alert',
                    alert:{
                        severity: 'success',
                    }
                }),
            )
        } catch (err) {
            dispatch(
                openSnackbar({
                    open:'true',
                    message: "Error updating room details!",
                    variant: 'alert',
                    alert:{
                        severity: 'error',
                    }
                }),
            )
            console.log(err);
        }
    };

    return (
        <>
            {roomData && (
                <Box
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        paddingX: 5,
                        paddingY: 3,
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    {/* Chat Description */}
                    <Box
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            width: "75%",
                            pb: 1,
                            borderRadius: "5px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                backgroundColor: theme.palette.primary.main,
                                alignItems: "center",
                                p: 1.5,
                                width: "auto",
                                borderTopLeftRadius: "5px",
                                borderTopRightRadius: "5px",
                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <ArrowBackIosIcon
                                    fontSize="small"
                                    onClick={homeRouteChange}
                                    sx={{
                                        ml: 1,
                                        color: theme.palette.primary
                                            .contrastText,
                                    }}
                                />
                                <Typography
                                    sx={{
                                        ml: 1,
                                        color: theme.palette.primary
                                            .contrastText,
                                    }}
                                >
                                    STUDY ROOM
                                </Typography>
                            </Box>
                            {user.username === roomData?.room?.host && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <IconButton onClick={handleUpdateRoomForm}>
                                        <UpdateIcon
                                            sx={{
                                                color: theme.palette.primary
                                                    .contrastText,
                                                paddingX: 1,
                                            }}
                                            fontSize="small"
                                        />
                                    </IconButton>
                                    <IconButton onClick={deleteRoom}>
                                        <DeleteIcon
                                            sx={{
                                                color: theme.palette.primary
                                                    .contrastText,
                                                paddingX: 1,
                                            }}
                                            fontSize="small"
                                        />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ m: 2, mt: 1, p: 2 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{ color: theme.palette.secondary.main }}
                                >
                                    {roomData?.room?.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "13px",
                                        p: 2,
                                        color: theme.palette.grey.grey500,
                                    }}
                                >
                                    {getTimeDifference(roomData?.room?.created)}{" "}
                                    ago
                                </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "13px",
                                    color: theme.palette.grey.grey500,
                                    mb: "5px",
                                }}
                            >
                                HOSTED BY
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        backgroundColor: getAvatarColors(
                                            roomData?.room?.host
                                        ),
                                    }}
                                >
                                    {roomData?.room?.host?.[0].toUpperCase()}
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
                                        {roomData?.room?.host?.toUpperCase()}
                                    </Typography>
                                    <Typography
                                        component={Button}
                                        sx={{
                                            color: theme.palette.secondary.main,
                                            textDecoration: "none",
                                            p: 0,
                                            fontSize: "12px",
                                        }}
                                        onClick={handleUserProfile}
                                    >
                                        @{roomData?.room?.host}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography
                                sx={{
                                    paddingY: 2,
                                    color: theme.palette.grey.grey400,
                                    fontSize: "14px",
                                }}
                            >
                                {roomData?.room?.description}
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    width: "fit-content",
                                    borderRadius: "10px",
                                    padding: "5px 15px 5px 15px",
                                    paddingRight: "15px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        color: theme.palette.primary
                                            .contrastText,
                                    }}
                                >
                                    {roomData?.room?.topic}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Message Component */}

                        <Box
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                backgroundImage: `url(${chatBg})`,
                                m: 4,
                                p: 0,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                borderRadius: "5px",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "400px",
                                    overflowY: "auto",
                                    overflowX: "hidden",
                                    "&::-webkit-scrollbar": {
                                        width: "0.4em",
                                    },
                                    "&::-webkit-scrollbar-track": {
                                        boxShadow:
                                            "inset 0 0 6px rgba(0,0,0,0.00)",
                                        webkitBoxShadow:
                                            "inset 0 0 6px rgba(0,0,0,0.00)",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor:
                                            theme.palette.primary.main,
                                        outline: `1px solid ${theme.palette.primary.main}`,
                                        borderRadius: "5px",
                                    },
                                }}
                            >
                                {roomData?.room_messages?.map(
                                    (room_message, index) => (
                                        <Message
                                            key={index}
                                            room_message={room_message}
                                            handleMessageDelete={
                                                handleMessageDelete
                                            }
                                        />
                                    )
                                )}
                            </Box>
                            {/* Message Input */}

                            <Box
                                container='true'
                                style={{
                                    padding: "20px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    backgroundColor:
                                        theme.palette.background.paper,
                                    borderTopLeftRadius: "10px",
                                    borderTopRightRadius: "10px",
                                }}
                            >
                                <Box sx={{ width: "98%" }}>
                                    <TextField
                                        id="outlined-required"
                                        label="Write your message here.."
                                        fullWidth
                                        onChange={handleTextChange}
                                        value={inputText}
                                        sx={{
                                            borderColor:
                                                theme.palette.primary
                                                    .contrastText,
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        pl: 1,
                                    }}
                                >
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        onClick={handleSendClick}
                                        ref={sendRef}
                                    >
                                        <SendIcon />
                                    </Fab>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            width: "20%",
                            pb: 1,
                            ml: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                backgroundColor: theme.palette.primary.main,
                                p: 1.5,
                                width: "auto",
                                borderTopLeftRadius: "5px",
                                borderTopRightRadius: "5px",
                            }}
                        >
                            <Typography
                                sx={{
                                    ml: 1,
                                    color: theme.palette.primary.contrastText,
                                    p: 0.8,
                                }}
                            >
                                PARTICIPANTS
                            </Typography>
                            <Typography
                                sx={{
                                    color: theme.palette.secondary.main,
                                    p: 0.8,
                                }}
                            >
                                ({roomData?.room?.participants?.length} Joined)
                            </Typography>
                        </Box>
                        <Box>
                            {roomData?.participants?.map(
                                (participant, index) => (
                                    <Participant
                                        key={index}
                                        participant={participant}
                                    />
                                )
                            )}
                        </Box>
                    </Box>
                    <Modal
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        closeAfterTransition
                        open={openUpdateRoomForm}
                        onClose={() => !openUpdateRoomForm}
                    >
                        <Box>
                            <UpdateRoomForm
                                handleRoomForm={handleRoomForm}
                                setRoomDetailsText={setRoomDetailsText}
                                setOpenUpdateRoomForm={setOpenUpdateRoomForm}
                            />
                        </Box>
                    </Modal>
                </Box>
            )}
        </>
    );
};

export default Room;
