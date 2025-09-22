import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import NoDataAvailable from '../Common/NoDataAvailable';
const Dashboard = () => {
  const insets = useSafeAreaInsets();
  let { data } = useSelector(state => state.data);
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
            <View
              style={[
                styles.ProductDetails,
                {
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
            </View>
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
