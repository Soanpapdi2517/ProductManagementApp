import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setData: (state, value) => {
       (state.data = value.payload);
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
