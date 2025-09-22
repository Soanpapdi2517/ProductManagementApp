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
            <Text style={styles.ProductLabelInput}>
              Product Price
            </Text>
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
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  uploadImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadImage: {
    width: '100%',
    height: 200, // Fixed height instead of percentage
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  uploadImageText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1e1e1ecc',
  },
  parentAllTextcontainerCol: {
    justifyContent: 'flex-start',
    padding: '2%',
    paddingBottom: 10, // Increased bottom padding for better scrolling
  },
  ProductNameContainer: {
    width: '100%',
    gap: 10,
  },
  ProductInputContainer: {
    backgroundColor: '#dadada',
    color: '#000000ff',
    borderRadius: 12,
    paddingHorizontal: 4,
    width: '100%',
    height: 50,
    fontSize: 17,
  },
  ProductLabelInput: {
    width: '100%',
  },
  onInputFocus: {
    borderWidth: 2,
    borderColor: '#565656ff',
  },
  dropdown: {
    fontSize: 17,
    borderColor: '#565656ff',
    backgroundColor: '#dadada',
  },
  dropdownContainer: {
    borderColor: '#565656ff',
  },
  dropdownText: {
    fontSize: 17,
    color: '#000000',
  },
  dropdownItem: {
    fontSize: 17,
    color: '#000000',
  },
  saveAndCancelButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  actionButtons: {
    flexDirection: 'row',
    borderRadius: 20,
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
    elevation: 10,
  },
  btntext: {
    fontSize: 20,
    fontWeight: 500,
  },
});
