import React from "react";
import { Box, InputAdornment, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTimeDifference, getAvatarColors } from "../../utils";
import { useTheme } from "@emotion/react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Participant = ({participant}) => {
    const theme = useTheme();
    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                m:2,
            }}
        >
            <Avatar
                sx={{
                    backgroundColor: getAvatarColors(participant)
                }}
            >
                <Typography sx={{color:theme.palette.primary.contrastText}}>{participant?.[0].toUpperCase()}</Typography>
            </Avatar>
            <Box sx={{ marginLeft: "10px" }}>
                <Typography sx={{color:theme.palette.primary.contrastText, fontSize:"13px", pl:.5}}>{participant?.toUpperCase()}</Typography>
                <Typography
                    component={Link}
                    sx={{
                        color: theme.palette.secondary.main,
                        textDecoration: "none",
                        fontSize: "15px",
                    }}
                >
                    @{participant}
                </Typography>
            </Box>
        </Box>
    );
} ;

const Message = ({room_message}) => {
    const theme = useTheme();
    return(
    <Box sx = {{ display:'flex', flexDirection:'row', paddingX:5, paddingY:3}}>
        <Box sx={{border: `1px ridge ${getAvatarColors(room_message?.user)}`, marginRight:1}}/>
        <Box sx={{width:'98%',p:1}}>
        
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:'space-between', marginX:2, alignItems:'center'}}>
                {/* Profile header */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Box>
                        <Avatar
                            sx={{
                                backgroundColor: getAvatarColors(
                                    room_message?.user
                                ),
                            }}
                        >
                            {room_message?.user[0].toUpperCase()}
                        </Avatar>
                    </Box>
                    <Box>
                        <Box sx={{ marginLeft: "10px" }}>
                            <Typography
                                component={Link}
                                sx={{
                                    textDecoration: "none",
                                    color: theme.palette.secondary
                                        .main,
                                }}
                            >
                                @{room_message?.user}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{ fontSize: "12px", pl: 2,color: theme.palette.grey.grey500 }}
                            >
                                {getTimeDifference(room_message?.created)} ago
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <DeleteIcon sx ={{ color: theme.palette.grey.grey400 }}  fontSize="small" />
            </Box>
            
            <Box
                sx={{
                    my: 1,
                    display: "flex",
                    // justifyContent: "center",
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "5px",
                    width: '98%',
                    ml:2,
                }}
            >
                <Typography
                    variant="p"
                    sx={{
                        paddingY: 2,
                        paddingX:3,
                        // ml:5,
                        color: theme.palette.grey.grey300,
                        backgroundColor: theme.palette.background.default,
                        borderRadius: "5px",
                        width: '100%',
                    }}
                >
                    {room_message?.body}
                </Typography>
            </Box>
        </Box>
    </Box>
    );
} ;

const Room = () => {
    const [roomData, setRoomData] = useState([]);
    const [inputText, setInputText] = useState('');
    
    const theme = useTheme();
    const { roomId } = useParams();
    console.log('room_id---->',roomId);

    const fetchRoom = async () => {
        const { data } = await axios.get(
            `http://localhost:8000/new/get_room/${roomId}`
        );
        if (data) {
            console.log('room_data---->',data);
            setRoomData(data);
        }
    }

    useEffect(() => {
        fetchRoom();
    }, []);

    const navigate = useNavigate(); 
    const homeRouteChange = () =>{ 
        let path = `/home`; 
        navigate(path);
    }

    const handleSendClick = async () => {
        try {
        const response = await axios.post( `http://localhost:8000/new/get_room/${roomId}/`, {
            // user: 'whitedevil',
            room: roomData.room,
            body: inputText,
        });

        console.log('API response:', response.data);
        } catch (error) {
        console.error('Error sending message:', error);
        }
    };

    const handleTextChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <>
        {roomData &&
        <Box sx = {{backgroundColor: theme.palette.background.paper, paddingX:5, paddingY: 3, display:'flex', flexDirection:'row'}}>
            
            {/* Chat Description */}
                <Box sx = {{ backgroundColor: theme.palette.background.default,width:'75%', pb:1}}>
                    <Box sx ={{ display: 'flex', flexDirection: 'row', backgroundColor: theme.palette.primary.main, p:1.5, width:'auto'}}>
                        <ArrowBackIosIcon fontSize="small" onClick={homeRouteChange} sx={{ ml:1, color: theme.palette.primary.contrastText}} />
                        <Typography sx={{ ml:1, color: theme.palette.primary.contrastText}}>STUDY ROOM</Typography>
                    </Box>

                    <Box sx={{m:2,mt:1, p:2}}>
                        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <Typography 
                                variant="h5"
                                component="div"
                                sx={{ color: theme.palette.secondary.main, }}
                            >{roomData?.room?.name}</Typography>
                            <Typography sx={{ fontSize: "13px", p: 2, color: theme.palette.grey.grey500 }}>
                            {getTimeDifference(roomData?.room?.created)} ago
                            </Typography>
                        </Box>
                        <Typography sx={{fontSize: "13px", color:theme.palette.grey.grey500, mb:"5px"}}>HOSTED BY</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                sx={{
                                    backgroundColor: getAvatarColors(roomData?.room?.host)
                                }}
                            >
                                {roomData?.room?.host?.[0].toUpperCase()}
                            </Avatar>
                            <Box sx={{ marginLeft: "10px" }}>
                                <Typography sx={{color:theme.palette.primary.contrastText, fontSize:"13px", pl:.5}}>{roomData?.room?.host?.toUpperCase()}</Typography>
                                <Typography
                                    component={Link}
                                    sx={{
                                        color: theme.palette.secondary.main,
                                        textDecoration: "none",
                                        fontSize: "15px",
                                    }}
                                >
                                    @{roomData?.room?.host}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography sx={{paddingY:2, color:theme.palette.grey.grey400, fontSize:'14px'}}>{roomData?.room?.description}</Typography>
                        <Box
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                width: "fit-content",
                                borderRadius: "10px",
                                padding: "5px 15px 5px 15px",
                                paddingRight: "15px",
                            }}
                        >
                            <Typography sx={{ fontSize: "12px", color: theme.palette.primary.contrastText  }}>
                                {roomData?.room?.topic}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Message Component */}
                
                    <Box sx={{backgroundColor: theme.palette.background.paper, m:4, p:2, display:'flex',flexDirection:"column",justifyContent:'space-between'}}>

                        <Box sx={{height: '400px', overflowY: "auto",overflowX:'hidden','&::-webkit-scrollbar': {
                                        width: '0.4em'
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: theme.palette.background.default,
                                        outline: `1px solid ${theme.palette.background.default}`,
                                    }}
                                }>
                            {roomData?.room_messages?.map((room_message, index) => (
                                <Message room_message={room_message} />
                            ))}
                        </Box>
                        {/* Message Input */}

                        <Box container style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '98%' }}>
                                <TextField id="outlined-required" label="Write your message here.." fullWidth onChange={handleTextChange} />
                            </Box>
                            <Box sx={{ pl: 1 }}>
                                <Fab color="primary" aria-label="add" onClick={handleSendClick}>
                                <SendIcon />
                                </Fab>
                            </Box>
                        </Box>
                    </Box>
                </Box>


                <Box sx = {{ backgroundColor: theme.palette.background.default,width:'20%', pb:1, ml: 2}}>
                    <Box sx ={{ display: 'flex', flexDirection: 'row', backgroundColor: theme.palette.primary.main, p:1.5, width:'auto'}}>
                        <Typography sx={{ ml:1, color: theme.palette.primary.contrastText}}>PARTICIPANTS</Typography>
                        <Typography sx={{ ml:1, color: theme.palette.secondary.main}}> ({roomData?.room?.participants?.length} Joined)</Typography>
                    </Box>
                    <Box>
                    {roomData?.participants?.map((participant) =>
                        <Participant participant={participant}/>
                    )}
                    </Box>
                </Box>
            </Box>
        }
        </>
    );
};

export default Room;
