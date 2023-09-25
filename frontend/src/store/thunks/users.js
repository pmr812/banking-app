import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios';

// Get all the users from the API
export const getUsers = createAsyncThunk('users/getUsers', async () => {
    try {
        const res = await axios.get(`/users`);
        return res.data.users;
    } catch (err) {
        console.lerr({ error: err.message });
    }
});