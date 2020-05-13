import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    getDataChannels: (state, { payload: { channels } }) => [...state, ...channels],
    addChannelSuccess: (state, { payload }) => [...state, ...payload],
    renameChannelSuccess: (state, { payload: { id, attributes } }) => {
      console.log('CHANNELS SLICE', id, attributes);
      const filterChannel = state.filter((channel) => channel.id !== id);
      return [...filterChannel, attributes];
    },
    removeChannelSuccess: (state, { payload: { id } }) => {
      console.log('CHANNELS SLICE', id);
      return state.filter((channel) => channel.id !== id);
    },
  },
});

const addChannel = ({ name }) => async () => {
  const data = { attributes: { name } };
  const url = routes.channelsPath();
  await axios.post(url, { data });
};

const renameChannel = ({ name, id }) => async () => {
  const data = { attributes: { name } };
  const url = routes.channelPath(id);
  await axios.patch(url, { data });
};

const removeChannel = ({ id }) => async () => {
  const url = routes.channelPath(id);
  await axios.delete(url);
};

const channels = slice.reducer;
const channelsActions = slice.actions;

export {
  channels, channelsActions, addChannel, renameChannel, removeChannel,
};
