import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topics: {},
};

const topics = createSlice({
    name: "topics",
    initialState,
    reducers: {
        getTopics: (state, action) => {
            state.topics = action.payload.topics;
        },
    },
});

export const { getTopics } = topics.actions;

export default topics.reducer;
