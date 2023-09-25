import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios';

// Get user data from the API
export const getUser = createAsyncThunk('user/getUser', async (arg) => {
    try {
        const res = await axios.get(`/user/${arg.userId}`, { params: arg.params || {} });
        return res.data;
    } catch (err) {
        console.err({ error: err.message });
    }
});