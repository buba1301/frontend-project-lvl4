/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { modalActions } from './Modal';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    getDataChannels: (state, { payload: { channels } }) => [...state, ...channels],
    addChannelSuccess: (state, { payload }) => [...state, ...payload],
    renameChannelSuccess: (state, { payload: { id, attributes } }) => {
      const filterChannel = state.filter((channel) => channel.id !== id);
      return [...filterChannel, attributes];
    },
    removeChannelSuccess: (state, { payload: { id } }) => state.filter((channel) => channel.id !== id),
  },
});

const addChannel =
  ({ name }) =>
  async (dispatch) => {
    dispatch(modalActions.modalRequest());
    try {
      const data = { attributes: { name } };
      const url = routes.channelsPath();
      await axios.post(url, { data });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

const renameChannel =
  ({ name, currentId }) =>
  async (dispatch) => {
    dispatch(modalActions.modalRequest());
    try {
      const data = { attributes: { name } };
      const url = routes.channelPath(currentId);
      await axios.patch(url, { data });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

const removeChannel =
  ({ id }) =>
  async (dispatch) => {
    dispatch(modalActions.modalRequest());
    try {
      const url = routes.channelPath(id);
      await axios.delete(url);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

const channels = slice.reducer;
const channelsActions = slice.actions;

export { channels, channelsActions, addChannel, renameChannel, removeChannel };
