import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from "../thunks/users";

const initialState = {
    users: [],
    status: 'idle',
    error: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getUsers.fulfilled]: (state, action) => {
            state.status = 'successful';

            state.users = state.users = action.payload;
        },
        [getUsers.rejected]: (state, action) => {
            state.status = 'failed';

            state.error = action.error.message;
        }
    }
});

export default usersSlice.reducer;