import asyncStorage from '@react-native-async-storage/async-storage';

export const createData = data => {
  return async dispatch => {
    try {
      asyncStorage.setItem('data', JSON.stringify(data));
      dispatch(setData(data));
    } catch (error) {
      console.log('Error while storing data', error);
    }
  };
};
