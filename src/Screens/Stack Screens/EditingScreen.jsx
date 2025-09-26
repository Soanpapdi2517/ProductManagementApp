import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';

const EditingScreen = () => {
  const { focusedData } = useSelector(state => state.data);
  const [dropDownOpenQuantityType, setdropDownOpenQuantityType] =
    useState(false);
  const [currentQuantityTypeValue, setCurrentQuantityTypeValue] = useState('');
  const [quantityTypeItems, setQuantityTypeItems] = useState([
    { label: 'inKgs', value: 'inKgs' },
    { label: 'inGms', value: 'inGms' },
    { label: 'inPcs', value: 'inPcs' },
    { label: 'inMtrs', value: 'inMtrs' },
    { label: 'inCms', value: 'inCms' },
    { label: 'inOunces', value: 'inOunces' },
  ]);
  // )
  // Quantity Type Data DropDown (
  const [dropDownOpenQuality, setdropDownOpenQuality] = useState(false);
  const [currenValueQuality, setcurrenValueQuality] = useState(null);
  const [itemsQuality, setItemsQuality] = useState([
    { label: 'Rotten', value: 'Rotten' },
    { label: 'Bad', value: 'Bad' },
    { label: 'Good', value: 'Good' },
    { label: 'Fresh', value: 'Fresh' },
    { label: 'Premium', value: 'Premium' },
  ]);

  const [inputOnFocus, setInputOnFocus] = useState(null)
  const [newProductData, setNewProductData] = useState({
    id: focusedData.id,
    image: focusedData.image,
    ProductName: null,
    Quality: null,
    Quantity: null,
    Price: null
  })
  const handleOnChangeValue = ()=> {

  }
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
      <View style={styles.parentAllTextcontainerCol}>
        {/* container for 4 things */}
        {/* Quality and Product name container */}
        <View style={{ gap: 10 }}>
          {/* ProductName Container */}
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Product Name</Text>
            <TextInput
              onChangeText={value => handleOnChangeValue('ProductName', value)}
              style={[
                styles.ProductInputContainer,
                inputOnFocus === 'product_name' && styles.onInputFocus,
              ]}
              onFocus={() => setInputOnFocus('product_name')}
              onBlur={() => setInputOnFocus('')}
              value={
                newProductData.ProductName ? newProductData.ProductName : ''
              }
              placeholder="Enter the Product's Name"
              placeholderTextColor={'#000000ff'}
            />
          </View>
          {/* product Quality Container */}
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Product Quality</Text>
            <DropDownPicker
              open={dropDownOpenQuality}
              value={currenValueQuality}
              items={itemsQuality}
              setOpen={!dropDownOpenQuantityType && setdropDownOpenQuality}
              setValue={setcurrenValueQuality}
              setItems={setItemsQuality}
              placeholder="Select Quality"
              zIndex={2000} // Higher z-index for quality dropdown
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              labelStyle={styles.dropdownItem}
              listMode="SCROLLVIEW" // Fix VirtualizedList nesting warning
            />
          </View>
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Product's Quantity</Text>
            <TextInput
              keyboardType="numeric"
              style={[
                styles.ProductInputContainer,
                inputOnFocus === 'product_Quantity' && styles.onInputFocus,
              ]}
              value={newProductData.Quantity ? newProductData.Quantity : ''}
              onChangeText={value => handleOnChangeValue('Quantity', value)}
              onFocus={() => setInputOnFocus('product_Quantity')}
              onBlur={() => setInputOnFocus('')}
              placeholder="Enter the Product's Quantity"
              placeholderTextColor={'#000000ff'}
            />
          </View>

          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Quantity Type</Text>
            <DropDownPicker
              open={dropDownOpenQuantityType}
              value={currentQuantityTypeValue}
              items={quantityTypeItems}
              setOpen={!dropDownOpenQuality && setdropDownOpenQuantityType}
              setValue={setCurrentQuantityTypeValue}
              setItems={setQuantityTypeItems}
              placeholder="Select Quantity Type"
              zIndex={1000} // Lower z-index for quantity type dropdown
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              labelStyle={styles.dropdownItem}
              listMode="SCROLLVIEW" // Fix VirtualizedList nesting warning
            />
          </View>
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>
              Product Price
              {'/' + currentQuantityTypeValue.slice(2, -1)}
            </Text>
            <TextInput
              keyboardType="numeric"
              style={[
                styles.ProductInputContainer,
                inputOnFocus === 'product_price' && styles.onInputFocus,
              ]}
              onFocus={() => setInputOnFocus('product_price')}
              onBlur={() => setInputOnFocus('')}
              value={newProductData.Price ? newProductData.Price : ''}
              onChangeText={value => handleOnChangeValue('Price', value)}
              placeholder="Enter the Product's Price"
              placeholderTextColor={'#000000ff'}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditingScreen;

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
