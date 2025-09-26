import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoDataAvailable from '../Common/NoDataAvailable';
import { setFocusedData } from '../Slices/dataSlice';
import { useNavigation } from '@react-navigation/native';
const Dashboard = () => {
  let { data, focusedData } = useSelector(state => state.data);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  if (data.length === 0) {
    return <NoDataAvailable text="No Products Added" />;
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
                  {item.ProductName.length > 6
                    ? item.ProductName.slice(0, 6) + '...'
                    : item.ProductName}
                </Text>
              </View>
              {/* Product Quantity */}
              <View style={styles.ProductQuantityContainer}>
                <Text style={styles.ProductHeadingQuantity}>
                  Qty({item.QuantityType})
                </Text>
                <Text style={styles.ProductDataQuantity}>{item.Quantity}</Text>
              </View>
              {/* Product Quality */}
              <View style={styles.ProductQualityContainer}>
                <Text style={styles.ProductHeadingQuality}>Quality</Text>
                <Text style={styles.ProductDataQuality}>{item.Quality}</Text>
              </View>
              {/* Product Price */}
              <View style={styles.ProductPriceContainer}>
                <Text style={styles.ProductHeadingPrice}>Price</Text>
                <Text style={styles.ProductDataPrice}>{item.Price}</Text>
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
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: '2%',
    paddingVertical: '3%',
    justifyContent: 'space-around',
    marginRight: 5,
  },
  ProductNameContainer: {
    width: '25%',
  },
  ProductQuantityContainer: {
    width: '25%',
    justifyContent: 'center',
  },
  ProductQualityContainer: {
    width: '25%',
    alignItems: 'center',
  },
  ProductHeadingName: { textAlign: 'left', color: '#181515e0' },
  ProductDataName: { fontSize: 15, fontWeight: 'bold', textAlign: 'left' },
  ProductHeadingQuantity: { textAlign: 'center', color: '#181515e0' },
  ProductDataQuantity: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ProductHeadingQuality: { textAlign: 'right', color: '#181515e0' },
  ProductDataQuality: {
    fontSize: 15,
    fontWeight: 'bold',
    alignItems: 'flex-start',
  },
  deleteBtn: {
    borderRadius: 50,
    backgroundColor: '#ff0000ff',
    padding: 5,
  },
  ProductButtons: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-start',
    width: '20%',
  },
  ProductPriceContainer: {
    width: '25%',

    alignItems: 'center',
  },
  ProductHeadingPrice: {
    justifyContent: 'center',
  },
  ProductDataPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
