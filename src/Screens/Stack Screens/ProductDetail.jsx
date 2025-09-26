import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const ProductDetail = () => {
  const { focusedData } = useSelector(state => state.data);
  const { ProductName, image, Price, Quality, QuantityType, Quantity } =
    focusedData;
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      <Image style={styles.uploadImage} source={{ uri: image }} />

      {/* Container of all fields */}
      <View
        style={[
          styles.parentAllTextcontainerRow,
          {
            backgroundColor:
              Quantity > 40 ? '#27f107ff' : Quantity > 15 ? '#e5f107ff' : '#rgba(244, 3, 3, 0.67)',
          },
        ]}
      >
        {/* container for 4 things */}
        {/* Quality and Product name container */}
        {/* ProductName and Price Container */}
        <View style={styles.productNameAndQualityContainerRow}>
          {/* ProductName Container*/}
          <View style={styles.ProductDetailcontainer}>
            <Text style={styles.mainTitle}>Product Name</Text>
            <Text style={styles.mainData}>{ProductName}</Text>
          </View>
          {/* Price Container */}
          <View style={styles.ProductDetailcontainer}>
            {/* {Quantity Container} */}
            <View style={styles.ProductDetailcontainer}>
              <Text style={styles.mainTitle}>Quality</Text>
              <Text style={styles.mainData}>{Quality}</Text>
            </View>
          </View>
        </View>
        {/* ProductQuality and Quantity Container */}
        <View style={styles.productQualityAndQuantityContainerRow}>
          {/* Price Container */}
          <View style={[styles.ProductDetailcontainer]}>
            <Text style={styles.mainTitle}>
              Price<Text style={styles.sideTitle}>/{QuantityType}</Text>
            </Text>
            <Text style={styles.mainData}>{Price}</Text>
          </View>
          <View style={[styles.ProductDetailcontainer]}>
            <Text style={styles.mainTitle}>
              Qty{' '}
              <Text style={styles.sideTitle}>
                in {QuantityType.slice(2, -1)}
              </Text>
            </Text>
            <Text style={styles.mainData}>{Price}</Text>
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
  parentAllTextcontainerRow: {
    paddingVertical: '1%',
    paddingHorizontal: '4%',
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '5%',
    alignItems: 'center',
    borderRadius: 14,
  },
  productNameAndQualityContainerRow: {
    alignItems: 'center',
    width: '50%',
  },
  productQualityAndQuantityContainerRow: {
    alignItems: 'center',
    width: '45%',
  },
  mainTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sideTitle: {
    fontSize: 8,
    fontStyle: 'italic',
    fontWeight: 400,
  },
  mainData: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ProductDetailcontainer: {
    height: '40%',
    justifyContent: 'center',
  },
});
