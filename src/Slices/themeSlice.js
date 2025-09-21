import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    setDarkMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
