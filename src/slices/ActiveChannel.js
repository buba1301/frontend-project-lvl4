import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'activeChannel',
  initialState: '',
  reducers: {
    setActiveChannel: (state, { payload }) => payload,
  },
});

const activeChannel = slice.reducer;
const activeChannelActions = slice.actions;

export { activeChannel, activeChannelActions };
