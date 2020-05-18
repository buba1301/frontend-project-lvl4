import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modalInfo',
  initialState: { type: null, id: null, submitState: 'none' },
  reducers: {
    hideModal: () => ({ type: null, id: null, submitState: 'none' }),
    showModal: (state, { payload: { type, id } }) => ({ type, id, submitState: 'none' }),
    modalRequest: (state) => ({ ...state, submitState: 'request' }),
  },
});


const modalInfo = slice.reducer;
const modalActions = slice.actions;

export { modalInfo, modalActions };
