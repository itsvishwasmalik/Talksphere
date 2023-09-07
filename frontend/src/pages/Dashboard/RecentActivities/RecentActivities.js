import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Activity from "../../Components/Activity";

const RecentAcivities = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);

    const fetchActivities = async () => {
        try{
            setLoading(true);
            const { data } = await axios.get(
                "http://localhost:8000/new/recent_activities/"
            );
            if (data) {
                setActivities(data.activities);
                setLoading(false);
            }
        } catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);
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
                {
                    activities?.slice(0, 5).map((activity, index) => (
                        <Activity key={index} activity={activity} />
                    ))
                }
            </Box>
        </Box>
    );
};

export default RecentAcivities;
