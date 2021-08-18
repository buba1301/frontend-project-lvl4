/* eslint-disable arrow-body-style */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { channelsActions } from './Channels';

const slice = createSlice({
  name: 'masseges',
  initialState: [],
  reducers: {
    getDataMessages: (state, { payload: { messages } }) => [...state, ...messages],
    addMessagesSuccess: (state, { payload }) => [...state, ...payload],
  },
  extraReducers: {
    [channelsActions.removeChannelSuccess]: (state, { payload: { id } }) => {
      return state.filter(({ channelId }) => channelId !== id);
    },
  },
});

const addMessage =
  ({ activeChannel, userName, message, date }) =>
  async () => {
    const data = { attributes: { userName, message, date } };
    const url = routes.channelMessagesPath(activeChannel);
    await axios.post(url, { data });
  };

const messages = slice.reducer;
const messagesActions = slice.actions;

export { messages, messagesActions, addMessage };
