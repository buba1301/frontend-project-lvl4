import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'masseges',
  initialState: [],
  reducers: {
    getDataMessages: (state, { payload: { messages } }) => [...state, ...messages],
    addMessagesSuccess: (state, { payload }) => [...state, ...payload],
  },
});

const addMessage = ({ activeChannel, userName, text }) => async () => {
  const data = { attributes: { userName, text } };
  const url = routes.channelMessagesPath(activeChannel);
  await axios.post(url, { data });
};

const messages = slice.reducer;
const messagesActions = slice.actions;

export { messages, messagesActions, addMessage };
