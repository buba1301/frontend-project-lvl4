import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { channelsActions } from './Channels';

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
});

const addUser =
  ({ activeChannel, userName }) =>
  async () => {
    const data = { attributes: { userName } };
    const url = routes.channelMessagesPath(activeChannel);
    await axios.post(url, { data });
  };

const users = slice.reducer;
const usersActions = slice.actions;

export { users, usersActions, addUser };
