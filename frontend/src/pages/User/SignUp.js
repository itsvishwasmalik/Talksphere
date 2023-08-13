import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: "secondary.main",
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant="h5">Sign up</Typography>

                <Grid container spacing={2}>
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
                    sx={{ mt: 3, mx: 0, mb: 2 }}
                >
                    Sign Up
                </LoadingButton>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2" underline="hover">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SignUp;
