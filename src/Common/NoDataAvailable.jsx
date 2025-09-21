import { StyleSheet, Text, View } from 'react-native';

const NoDataAvailable = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Products Added!!</Text>
    </View>
  );
};

export default NoDataAvailable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
