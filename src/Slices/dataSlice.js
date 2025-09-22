import { dummyData } from '../Data/dummyData';
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  data: dummyData,
  focusedData: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setData: (state, value) => {
      state.data = value.payload;
    },
    setFocusedData: (state, value) => {
      state.focusedData = value.payload;
    },
  },
});

export const { setData, setFocusedData } = dataSlice.actions;
export default dataSlice.reducer;
