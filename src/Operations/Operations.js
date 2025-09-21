import asyncStorage from '@react-native-async-storage/async-storage';
import { setData } from '../Slices/dataSlice';



export const createData = data => {
  return async dispatch => {
    try {
      await asyncStorage.setItem('data', JSON.stringify(data));
      dispatch(setData(data));
    } catch (error) {
      console.log('Error while storing data', error);
    }
  };
};

export const setDataAfterDelete = afterDeleteData => {
  return async dispatch => {
    try {
      await asyncStorage.setItem('data', JSON.stringify(afterDeleteData));
      dispatch(setData(afterDeleteData));
    } catch (error) {
      console.log('Error on setting deleted data', error);
    }
  };
};
