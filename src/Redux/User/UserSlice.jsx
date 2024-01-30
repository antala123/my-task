import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        signInStart: (state) =>{
            state.loading = true;
        },
        signInSuccess: (state, action) =>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFail: (state, action) =>{
            state.loading = false;
            state.currentUser = null;
            state.error = action.payload;
        },
        updateStart: (state) =>{
            state.loading = true;
        },
        updateSuccess: (state, action) =>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        updateFail: (state, action) =>{
            state.loading = false;
            state.currentUser = null;
            state.error = action.payload;
        },
        signOutSuccess: (state) =>{
            state.currentUser = null;
        }
    }
})

export const { signInFail, signInStart, signInSuccess, signOutSuccess, updateFail, updateStart, updateSuccess } = userSlice.actions;
export default userSlice.reducer;