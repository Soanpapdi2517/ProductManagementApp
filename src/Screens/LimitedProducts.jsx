import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DummyLimitedProducts = [
  {
    id: 1,
    ProductName: 'Aalo',
    Quantity: 50,
    Quality: 'Good',
    QuantityType: 'inKgs',
  },
  {
    id: 2,
    ProductName: 'Tomato',
    Quantity: 30,
    Quality: 'Fresh',
    QuantityType: 'inKgs',
  },
  {
    id: 3,
    ProductName: 'Onion',
    Quantity: 40,
    Quality: 'Premium',
    QuantityType: 'inKgs',
  },
  {
    id: 4,
    ProductName: 'Potato',
    Quantity: 60,
    Quality: 'Good',
    QuantityType: 'inKgs',
  },
  {
    id: 5,
    ProductName: 'Carrot',
    Quantity: 25,
    Quality: 'Fresh',
    QuantityType: 'inKgs',
  },
  {
    id: 6,
    ProductName: 'Cabbage',
    Quantity: 20,
    Quality: 'Good',
    QuantityType: 'inKgs',
  },
  {
    id: 7,
    ProductName: 'Spinach',
    Quantity: 15,
    Quality: 'Fresh',
    QuantityType: 'inKgs',
  },
  {
    id: 8,
    ProductName: 'Capsicum',
    Quantity: 10,
    Quality: 'Premium',
    QuantityType: 'inKgs',
  },
  {
    id: 9,
    ProductName: 'Cauliflower',
    Quantity: 18,
    Quality: 'Good',
    QuantityType: 'inKgs',
  },
  {
    id: 10,
    ProductName: 'Brinjal',
    Quantity: 22,
    Quality: 'Fresh',
    QuantityType: 'inKgs',
  },
  {
    id: 11,
    ProductName: 'Cucumber',
    Quantity: 12,
    Quality: 'Premium',
    QuantityType: 'inKgs',
  },
  {
    id: 12,
    ProductName: 'Pumpkin',
    Quantity: 35,
    Quality: 'Good',
    QuantityType: 'inKgs',
  },
  {
    id: 13,
    ProductName: 'Radish',
    Quantity: 15,
    Quality: 'Fresh',
    QuantityType: 'inKgs',
  },
  {
    id: 14,
    ProductName: 'Beetroot',
    Quantity: 20,
    Quality: 'Premium',
    QuantityType: 'inKgs',
  },
  {
    id: 15,
    ProductName: 'Garlic',
    Quantity: 8,
    Quality: 'Good',
    QuantityType: 'inKgs',
  },
  {
    id: 16,
    ProductName: 'Ginger',
    Quantity: 5,
    Quality: 'Fresh',
    QuantityType: 'inKgs',
  },
  {
    id: 17,
    ProductName: 'Lemon',
    Quantity: 10,
    Quality: 'Premium',
    QuantityType: 'inKgs',
  },
  {
    id: 18,
    ProductName: 'Apple',
    Quantity: 25,
    Quality: 'Fresh',
    QuantityType: 'inKgs',
  },
  {
    id: 19,
    ProductName: 'Banana',
    Quantity: 30,
    Quality: 'Good',
    QuantityType: 'inKgs',
  },
  {
    id: 20,
    ProductName: 'Mango',
    Quantity: 40,
    Quality: 'Premium',
    QuantityType: 'inKgs',
  },
  // Example of a pieces-based product
  {
    id: 21,
    ProductName: 'Kurkure',
    Quantity: 50,
    Quality: 'Fresh',
    QuantityType: 'inPcs',
  },
  {
    id: 22,
    ProductName: 'Cold Drink Bottle',
    Quantity: 24,
    Quality: 'Premium',
    QuantityType: 'inPcs',
  },
  {
    id: 23,
    ProductName: 'Chocolate',
    Quantity: 100,
    Quality: 'Good',
    QuantityType: 'inPcs',
  },
];

const LimitedProducts = () => {
  const trueLimitedProducts = DummyLimitedProducts.filter(
    item => item.Quantity < 20,
  );

  const handleOnDelete = id => {
    return (trueLimitedProducts = trueLimitedProducts.filter(
      item => item.id !== id,
    ));
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.ProductContainer}>
        <FlatList
          data={trueLimitedProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.ProductDetails}>
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

export default LimitedProducts;

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
    borderRadius: 10,
    backgroundColor: '#fe0000be',
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
