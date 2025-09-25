import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../Slices/dataSlice';
import NoDataAvailable from '../Common/NoDataAvailable';
const CreateOrEditProducts = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.data);
  if (data.length === 0) {
    return <NoDataAvailable text="No Products Added"/>;
  }
  const handleOnDeleteData = id => {
    const afterDeleteProducts = data.filter(item => item.id !== id);
    dispatch(setData(afterDeleteProducts));
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.ProductContainer}>
        <FlatList
          bounces={true}
          showsVerticalScrollIndicator={true}
          style={{ borderRadius: 15 }}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Pressable style={[styles.SingleItem]}>
              {/* For Product details */}
              <View style={styles.ProductDetails}>
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
                    Qty
                    <Text style={{ fontSize: 12, fontStyle: 'italic' }}>
                      ({item.QuantityType})
                    </Text>
                  </Text>

                  <Text style={styles.ProductDataQuantity}>
                    {item.Quantity}
                  </Text>
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
              </View>
              <View style={styles.ProductButtons}>
                <Pressable
                  style={({ pressed }) => [
                    styles.deleteBtn,
                    pressed && { backgroundColor: '#c70e3fff' },
                  ]}
                  onPress={() => {
                    handleOnDeleteData(item.id);
                  }}
                >
                  <MaterialIcons name="delete" size={20} />
                </Pressable>
              </View>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 5 }}></View>}
        />
      </View>
    </View>
  );
};

export default CreateOrEditProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  text: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  ProductContainer: {
    paddingVertical: '1%',
    paddingHorizontal: '2%',
    borderRadius: 20,
  },
  SingleItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#b9b9b98d',
    paddingHorizontal: '1%',
  },
  ProductDetails: {
    borderRadius: 12,
    width: '90%',
    flexDirection: 'row',
    paddingHorizontal: '2%',
    paddingVertical: '3%',
    justifyContent: 'space-around',
    marginRight: 5,
  },
  ProductNameContainer: {
    width: '22.5%',
  },
  ProductQuantityContainer: {
    justifyContent: 'center',
    width: '22.5%',
  },
  ProductQualityContainer: {
    alignItems: 'center',
    width: '22.5%',
  },
  ProductHeadingName: { textAlign: 'left', color: '#181515e0' },
  ProductDataName: { fontSize: 17, fontWeight: 'bold', textAlign: 'left' },
  ProductHeadingQuantity: { textAlign: 'center', color: '#181515e0' },
  ProductDataQuantity: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ProductHeadingQuality: { textAlign: 'right', color: '#181515e0' },
  ProductDataQuality: {
    fontSize: 17,
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
    width: '22.5%',

    alignItems: 'center',
  },
  ProductHeadingPrice: {
    justifyContent: 'center',
  },
  ProductDataPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
