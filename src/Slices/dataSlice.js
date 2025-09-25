import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  data: [],
  focusedData: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setData: (state, value) => {
      state.data.push(value.payload)
    },
    setFocusedData: (state, value) => {
      state.focusedData = value.payload;
    },
  },
});

export const { setData, setFocusedData, updateData } = dataSlice.actions;
export default dataSlice.reducer;
