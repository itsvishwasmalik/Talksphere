import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    action: false,
    open: false,
    message: "Room archived",
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
    },
    variant: "default",
    alert: {
        variant: "filled",
        severity: "success",
    },
    transition: "Fade",
    close: true,
    actionButton: false,
};

const snackbar = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        openSnackbar: (state, action) => {
            const {
                open,
                message,
                anchorOrigin,
                variant,
                alert,
                transition,
                close,
                actionButton,
            } = action.payload;

            state.action = !state.action;
            state.open = open || initialState.open;
            state.message = message || initialState.message;
            state.anchorOrigin = anchorOrigin || initialState.anchorOrigin;
            state.variant = variant || initialState.variant;
            state.alert = {
                color: alert?.color || initialState.alert.color,
                variant: alert?.variant || initialState.alert.variant,
                severity: alert?.severity || initialState.alert.severity,
            };
            state.transition = transition || initialState.transition;
            state.close = close === false ? close : initialState.close;
            state.actionButton = actionButton || initialState.actionButton;
        },
        closeSnackbar: (state) => {
            state.open = false;
        },
    },
});

export default snackbar.reducer;

export const { closeSnackbar, openSnackbar } = snackbar.actions;
