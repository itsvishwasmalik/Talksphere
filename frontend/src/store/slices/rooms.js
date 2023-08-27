import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
};

const rooms = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state.rooms = action.payload;
        },
    },
});

export const { setRooms } = rooms.actions;

export default rooms.reducer;
