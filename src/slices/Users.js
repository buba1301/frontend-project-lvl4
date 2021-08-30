import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    getDataUsers: (state, { payload: { users } }) => [...state, ...users],
    addUserSuccess: (state, { payload }) => [...state, ...payload],
  },
});

const addUser =
  ({ activeChannel, userName }) =>
  async () => {
    const data = { attributes: { userName } };
    const url = routes.channelUsersPath(activeChannel);
    const res = await axios.post(url, { data });
  };

const users = slice.reducer;
const usersActions = slice.actions;

export { users, usersActions, addUser };
