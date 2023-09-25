import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/users';
import userReducer from './slices/user';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
  },
});
