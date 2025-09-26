import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const ProductDetail = () => {
  const { focusedData } = useSelector(state => state.data);
  console.log('focused Data in product detail', focusedData);
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      <Image
        style={styles.uploadImage}
        source={{ uri: focusedData.image && focusedData.image }}
      />

      {/* Container of all fields */}
      <View style={styles.parentAllTextcontainerCol}>
        {/* container for 4 things */}
        {/* Quality and Product name container */}
        <View style={{ gap: 10 }}>
          {/* ProductName Container */}
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Product Name</Text>
            <Text style={[styles.ProductInputContainer]}>
              {focusedData.ProductName}
            </Text>
          </View>
          {/* product Quality Container */}
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Product Quality</Text>
            <Text style={styles.ProductLabelInput}>{focusedData.Quality}</Text>
          </View>
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Product's Quantity</Text>
            <Text style={[styles.ProductInputContainer]}>
              {focusedData.Quantity}
            </Text>
          </View>

          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Quantity Type</Text>
            <Text>{focusedData.QuantityType}</Text>
          </View>
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Product Price</Text>
            <Text>{focusedData.Price}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    padding: '2%',
    borderRadius: 20,
  },
  uploadImage: {
    width: '100%',
    height: 200, // Fixed height instead of percentage
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 10,
  },
});
