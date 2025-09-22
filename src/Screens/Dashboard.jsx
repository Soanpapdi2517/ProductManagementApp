import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import NoDataAvailable from '../Common/NoDataAvailable';
import { setFocusedData } from '../Slices/dataSlice';
import { useNavigation } from '@react-navigation/native';
const Dashboard = () => {
  let { data, focusedData } = useSelector(state => state.data);
  console.log('came back to dashboard', focusedData);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  if (data.length === 0) {
    return <NoDataAvailable />;
  }
  return (
    <View style={[styles.container]}>
      <View style={styles.ProductContainer}>
        <FlatList
          bounces={true}
          showsVerticalScrollIndicator={true}
          style={{ borderRadius: 15 }}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                dispatch(setFocusedData(item));
                console.log(focusedData);
                navigation.navigate('Product Details');
              }}
              style={({ pressed }) => [
                styles.ProductDetails,
                {
                  backgroundColor:
                    item.Quantity > 40
                      ? '#27f107ff'
                      : item.Quantity > 15
                      ? '#e5f107ff'
                      : 'rgba(244, 3, 3, 0.67)',

                  borderRadius: 12,
                },
                pressed && {
                  backgroundColor:
                    item.Quantity > 40
                      ? 'green'
                      : item.Quantity > 15
                      ? 'yellow'
                      : 'red',

                  borderRadius: 12,
                },
              ]}
            >
              {/* Product Name */}
              <View style={styles.ProductNameContainer}>
                <Text style={styles.ProductHeadingName}>Product</Text>
                <Text style={styles.ProductDataName}>
                  {item.ProductName.length > 7
                    ? item.ProductName.slice(0, 7) + '...'
                    : item.ProductName}
                </Text>
              </View>
              {/* Product Quantity */}
              <View style={styles.ProductQuantityContainer}>
                <Text style={styles.ProductHeadingQuantity}>
                  Quantity({item.QuantityType})
                </Text>
                <Text style={styles.ProductDataQuantity}>{item.Quantity}</Text>
              </View>
              {/* Product Quality */}
              <View style={styles.ProductQualityContainer}>
                <Text style={styles.ProductHeadingQuality}>Quality</Text>
                <Text style={styles.ProductDataQuality}>{item.Quality}</Text>
              </View>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 2 }}></View>}
        />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  ProductContainer: {
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    borderRadius: 20,
  },
  ProductDetails: {
    borderRadius: 12,
    backgroundColor: '#dadada',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    justifyContent: 'space-between',
  },
  ProductNameContainer: {
    width: '30%',
  },
  ProductQuantityContainer: {
    justifyContent: 'flex-start',
    marginRight: '5%',
  },
  ProductQualityContainer: {
    width: '30%',
  },
  ProductHeadingName: { textAlign: 'left', color: '#000000e0' },
  ProductDataName: { fontSize: 18, fontWeight: 'bold', textAlign: 'left' },
  ProductHeadingQuantity: { textAlign: 'center', color: '#000000e0' },
  ProductDataQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ProductHeadingQuality: { textAlign: 'right', color: '#000000' },
  ProductDataQuality: { fontSize: 18, fontWeight: 'bold', textAlign: 'right' },
});
