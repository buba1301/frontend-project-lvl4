import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
// import routes from '../routes';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    getDataChannels: (state, { payload: { channels } }) => [...state, ...channels],
  },
});

const channels = slice.reducer;
const channelsActions = slice.actions;

export { channels, channelsActions };
