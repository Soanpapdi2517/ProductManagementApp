import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CreateOrEditProducts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Or Edit Products</Text>
    </View>
  );
};

export default CreateOrEditProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
});
