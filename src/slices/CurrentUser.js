import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentUser',
  initialState: '',
  reducers: {
    setCurrentUser: (state, { payload }) => {
      console.log('reducers', payload);

      return payload;
    },
  },
});

const currentUser = slice.reducer;
const currentUserActions = slice.actions;

export { currentUser, currentUserActions };
