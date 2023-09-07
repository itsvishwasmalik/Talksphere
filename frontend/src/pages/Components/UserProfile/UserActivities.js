import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import Activity from "../Activity";

const UserAcivities = ({ userActivities }) => {
    // console.log(username);
    const theme = useTheme();
    // const rooms = useSelector((state) => state.rooms.rooms);
    // console.log(rooms);


    return (
        <Box
            sx={{
                marginTop: 2,
                backgroundColor: theme.palette.background.default,
                borderRadius: "5px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px",
                    backgroundColor: theme.palette.primary.main,
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignContent: "center",
                        width: "100%",
                        borderRadius: "5px",
                    }}
                >
                    <Typography
                        variant="p"
                        noWrap
                        sx={{
                            color: theme.palette.primary.contrastText,
                            pl: 2,
                        }}
                    >
                        RECENT ACTIVITIES
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ pt: 1, pb: 2, paddingX: 3 }}>
                {userActivities?.slice(0,5).map((activity, index) => (
                    <Activity key={index} activity={activity} />
                ))}
            </Box>
        </Box>
    );
};

export default UserAcivities;
