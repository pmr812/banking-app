import { createSlice } from '@reduxjs/toolkit';
import { getUser } from "../thunks/user";

const initialState = {
    user: null,
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [getUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getUser.fulfilled]: (state, action) => {
            state.status = 'successful';

            state.user = action.payload;
        },
        [getUser.rejected]: (state, action) => {
            state.status = 'failed';

            state.error = action.error.message;
        }
    }
});

export default userSlice.reducer;