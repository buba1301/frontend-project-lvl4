import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'activeChannel',
  initialState: '',
  reducers: {
    getDataActiveChannel: (state, { payload: { currentChannelId } }) => currentChannelId,
  },
});

const activeChannel = slice.reducer;
const activeChannelActions = slice.actions;

export { activeChannel, activeChannelActions };
