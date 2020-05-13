import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modalInfo',
  initialState: { type: null, item: null },
  reducers: {
    hideModal: () => ({ type: null, id: null }),
    showModal: (state, { payload: { type, id } }) => ({ type, id }),
  },
});


const modalInfo = slice.reducer;
const modalActions = slice.actions;

export { modalInfo, modalActions };
