/* eslint-disable arrow-body-style */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { channelsActions } from './Channels';

const slice = createSlice({
  name: 'masseges',
  initialState: [],
  reducers: {
    getDataMessages: (state, { payload: { messages } }) => [
      ...state,
      ...messages,
    ],
    addMessagesSuccess: (state, { payload }) => [...state, ...payload],
    removeMessageSuccess: (state, { payload: { id } }) => {
      return state.filter((message) => message.id !== id);
    },
  },
  extraReducers: {
    [channelsActions.removeChannelSuccess]: (state, { payload: { id } }) => {
      return state.filter(({ channelId }) => channelId !== id);
    },
  },
});

const addMessage =
  ({ activeChannel, userName, message, date, avatar }) =>
  async () => {
    const data = { attributes: { userName, message, date, avatar } };
    const url = routes.channelMessagesPath(activeChannel);
    await axios.post(url, { data });
  };

const removeMessage =
  ({ id }) =>
  async (dispatch) => {
    try {
      const url = routes.messagePath(id);
      console.log('Remove message', url);

      await axios.delete(url);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

const messages = slice.reducer;
const messagesActions = slice.actions;

export { messages, messagesActions, addMessage, removeMessage };
