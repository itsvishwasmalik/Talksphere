import PropTypes from "prop-types";
import { createContext } from "react";
import { handleLogin, handleLogout } from "../store/account";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../store/slices/snackbar";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.account);

    axios.defaults.baseURL = "http://localhost:8000/";

    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if (401 === error?.response?.status) {
                dispatch(handleLogout());
            }
            return error;
        }
    );

    if ("user" in state && state.user && "accessToken" in state.user) {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + state.user.accessToken;
    }

    const login = async (username, password) => {
        try {
            const response = await axios.post("/user/login/", {
                username,
                password,
            });
            console.log(response);
            const { data } = response;
            if (response.status === 200 && "access_token" in data) {
                dispatch(
                    handleLogin({
                        user: {
                            id: data.id,
                            username: data.username,
                            email: data.email,
                            isAdmin: data.is_staff,
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token,
                        },
                    })
                );
                dispatch(
                    openSnackbar({
                        open:true,
                        message: 'Logged in successfully !!',
                        variant: 'alert',
                        alert:{
                            severity: 'success',
                        }
                    })
                )
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: response.response.data.message,
                        variant: 'alert',
                        alert:{
                            severity: 'error',
                        }
                    })
                );
            }
        } catch (error) {
            console.log(error);
            dispatch(
                openSnackbar({
                    open: true,
                    message: error.message,
                    variant: 'alert',
                    alert:{
                        severity: 'error',
                    }
                })
            );
            return Promise.reject(error);
        }
    };

    const logout = () => {
        dispatch(handleLogout());
        dispatch(
            openSnackbar({
                open: 'true',
                message: 'See you soon !!!',
                variant: 'alert',
                alert:{
                    severity: 'success',
                }
            })
        )
    };

    const register = async (username, email, password) => {
        try {
            const response = await axios.post("/user/register/", {
                username: username,
                email: email,
                password: password,
            });
            const { data } = response;
            if (response.status === 200 && "access_token" in data) {
                dispatch(
                    handleLogin({
                        user: {
                            id: data.id,
                            username: data.username,
                            email: data.email,
                            isAdmin: data.is_staff,
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token,
                        },
                    })
                );
                dispatch(
                    openSnackbar({
                        open:true,
                        message: 'Signed up successfully !!',
                        variant: 'alert',
                        alert:{
                            severity: 'success',
                        }
                    })
                )
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: response.response.data.message,
                        variant: 'alert',
                        alert:{
                            severity: 'warning',
                        }
                    })
                );
            }
        } catch (error) {
            console.log(error);
            dispatch(
                openSnackbar({
                    open: true,
                    message: error.response.data.message,
                    variant: 'alert',
                    alert:{
                        severity: 'error',
                    }
                })
            );
        }
    };

    const forgotPassword = () => {};
    const resetPassword = () => {};
    const updateProfile = () => {};
    const googleSignIn = () => {};

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                register,
                forgotPassword,
                resetPassword,
                updateProfile,
                googleSignIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthContext;
