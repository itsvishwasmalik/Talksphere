import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import registerbg from "../../assets/registerbg.png";
import background from "../../assets/bg.png";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const openSignIn = () => {
        let path = `/login`;
        navigate(path);
    };

    const { register } = useAuth();

    const handleSignUp = async () => {
        console.log(username, email, password);
        try {
            setLoading(true);
            await register(username, email, password);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                bgcolor: theme.palette.background.paper,
                position: 'relative',
                width: '100vw',
                overflow: 'auto',
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    backgroundImage: `url(${registerbg})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: '450px',
                    minWidth: "620px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingX: 12,
                        pt:6,
                        pb:25,

                    }}
                >
                    <Grid container='true' spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="Username"
                                autoFocus
                                value={username}
                                onChange={handleUsernameChange}
                                sx={{
                                    "& .MuiInputLabel-root": {
                                        color: theme.palette.primary.contrastText,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: theme.palette.primary.contrastText,
                                            bgColor:theme.palette.background.default,
                                        },
                                        "&:hover fieldset": {
                                            borderColor: theme.palette.primary.contrastText,
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: theme.palette.primary.contrastText,
                                        },
                                    },
                                    "& .MuiInputBase-input":  {
                                        background: theme.palette.background.default,
                                    },
                                    borderRadius: 1,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={handleEmailChange}
                                sx={{
                                    "& .MuiInputLabel-root": {
                                        color: theme.palette.primary.contrastText,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: theme.palette.primary.contrastText,
                                            bgColor:theme.palette.background.default,
                                        },
                                        "&:hover fieldset": {
                                            borderColor: theme.palette.primary.contrastText,
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: theme.palette.primary.contrastText,
                                        },
                                    },
                                    "& .MuiInputBase-input":  {
                                        background: theme.palette.background.default,
                                    },
                                    borderRadius: 1,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handlePasswordChange}
                                sx={{
                                    "& .MuiInputLabel-root": {
                                        color: theme.palette.primary.contrastText,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: theme.palette.primary.contrastText,
                                            bgColor:theme.palette.background.default,
                                        },
                                        "&:hover fieldset": {
                                            borderColor: theme.palette.primary.contrastText,
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: theme.palette.primary.contrastText,
                                        },
                                    },
                                    "& .MuiInputBase-input":  {
                                        background: theme.palette.background.default,
                                    },
                                    borderRadius: 1,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <LoadingButton
                        loading={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSignUp}
                        sx={{ mt: 3, mx: 0, mb: 2, background: theme.palette.secondary.main, color:theme.palette.s}}
                    >
                        SIGN UP
                    </LoadingButton>
                    <Grid container='true' justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={openSignIn}  variant="body2" underline="hover" sx={{color: theme.palette.secondary.main}} >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default SignUp;
