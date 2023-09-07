import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import registerbg from "../../assets/registerbg.png";
import background from "../../assets/bg.png";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const navigate = useNavigate();
    const openSignUp = () => {
        let path = `/register`;
        navigate(path);
    };

    const handleSignIn = async (email, password) => {
        try {
            setLoading(true);
            await login(email, password);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const theme = useTheme();

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
            <Container component="main" maxWidth="xs"     
                sx={{
                    backgroundImage: `url(${registerbg})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: '450px',
                    minWidth: "620px",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: 4,
                        paddingX: 4,
                        paddingBottom: 14,
                        marginX:10  
                    }}
                >
                    <Box
                        component="form"
                        noValidate
                        sx={{
                            mt: 1,
                            pb:4
                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="secondary" />}
                            label="Remember me"
                        />
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                background: theme.palette.secondary.main,
                                color:theme.palette.secondary.contrastText,
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSignIn(email, password);
                            }}
                        >
                            SIGN IN
                        </LoadingButton>
                        <Grid container='true' justifyContent='flex-end'>
                            <Grid item>
                                <Link onClick={openSignUp} variant="body2" sx={{color: theme.palette.secondary.main}}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default SignIn;
