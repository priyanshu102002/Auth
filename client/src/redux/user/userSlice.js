import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: false,
    isLoading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.isLoading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;