import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredRooms: [],
};

const filteredRooms = createSlice({
    name: "filteredRooms",
    initialState,
    reducers: {
        setFilteredRooms: (state, action) => {
            state.filteredRooms = action.payload;
        },
    },
});

export const { setFilteredRooms } = filteredRooms.actions;

export default filteredRooms.reducer;
