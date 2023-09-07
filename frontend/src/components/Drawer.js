import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { Box, Divider, IconButton } from "@mui/material";
import MUIDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const drawerWidth = 240;

const Drawer = ({ open, onClose }) => {
    const drawerRef = React.useRef(null);
    const getParent = () => drawerRef.current?.parentElement;
    const {user} = useAuth();
    
    return (
        <MUIDrawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ref={drawerRef}
            ModalProps={{
                container: getParent(),
                disablePortal: true,
                BackdropProps: {
                    sx: {
                        position: "absolute",
                    },
                },
            }}
            sx={{
                position: "relative",
                whiteSpace: "nowrap",
                width: drawerWidth,
                transition: (theme) =>
                    theme.transitions.create("width", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
            }}
            onKeyDown={onClose}
        >
            <Box display="flex" justifyContent="space-between">
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        p: 2,
                    }}
                >
                    TALKSPHERE
                </Typography>
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="close drawer"
                    sx={{ mr: 2 }}
                    onClick={onClose}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
            <Divider />
            <List><MainListItems user={user} /></List>
        </MUIDrawer>
    );
};

export default Drawer;

export const MainListItems = ({user}) => {
    return(
    <Box>
        <Link to={`/home`} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
        </Link>
        <Link to={`/user/${user.username}`} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
            </ListItem>
        </Link>
    </Box>
)};
