import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LimitedProducts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Limited Products</Text>
    </View>
  );
};

export default LimitedProducts;

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
