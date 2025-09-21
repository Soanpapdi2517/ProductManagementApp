import { combineReducers } from '@reduxjs/toolkit';
import dataSlice from '../Slices/dataSlice';
import themeSlice from '../Slices/themeSlice';
const rootReducer = combineReducers({
  data: dataSlice,
  theme: themeSlice,
});

export default rootReducer;
