import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomAlert from '../../Modal/CustomModal';
import { addProduct, setData } from '../../Slices/dataSlice';
import { useNavigation } from '@react-navigation/native';

const EditingScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  let { focusedData, data } = useSelector(state => state.data);
  const [newProductData, setNewProductData] = useState({
    id: focusedData.id,
    image: focusedData.image,
    ProductName: focusedData.ProductName,
    Quality: focusedData.Quality,
    Quantity: focusedData.Quantity,
    Price: focusedData.Price,
    QuantityType: focusedData.QuantityType,
  });
  const { ProductName, Quality, Quantity, Price, QuantityType } =
    newProductData;
  const [dropDownOpenQuantityType, setdropDownOpenQuantityType] =
    useState(false);
  const [currentQuantityTypeValue, setCurrentQuantityTypeValue] = useState(
    `${QuantityType}`,
  );
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
  const [currenValueQuality, setcurrenValueQuality] = useState(Quality);
  const [itemsQuality, setItemsQuality] = useState([
    { label: 'Rotten', value: 'Rotten' },
    { label: 'Bad', value: 'Bad' },
    { label: 'Good', value: 'Good' },
    { label: 'Fresh', value: 'Fresh' },
    { label: 'Premium', value: 'Premium' },
  ]);

  const [inputOnFocus, setInputOnFocus] = useState(null);

  const [Modal, setModal] = useState({
    modalState: false,
    modalFor: null,
  });
  const handleOnChangeValue = (field, value) => {
    if(field === "Quantity" || field === "Price"){
      value = Number(value);
    }
    setNewProductData(prev => ({ ...prev, [field]: value, QuantityType: currentQuantityTypeValue, Quality: currenValueQuality }));
  };
  const handleOnSubmitData = () => {
    if (!ProductName || !currenValueQuality || !Quantity || !Price || !currentQuantityTypeValue) {
      return setModal({ modalState: true, modalFor: 'save' });
    }

    data = data.map(item => item.id === focusedData.id ? newProductData : item)
    dispatch(setData(data));
    navigation.goBack()
  };
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
              value={ProductName ? ProductName : ''}
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
              value={Quantity.toString() ? Quantity.toString() : ''}
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
              value={Price.toString() ? Price.toString() : ''}
              onChangeText={value => handleOnChangeValue('Price', value)}
              placeholder="Enter the Product's Price"
              placeholderTextColor={'#000000ff'}
            />
          </View>
        </View>

        <View style={styles.saveAndCancelButtons}>
          <Pressable
            onPress={() => {
              setModal({ modalState: true, modalFor: 'cancel' });
            }}
            style={({ pressed }) => [
              styles.actionButtons,
              pressed
                ? { backgroundColor: 'red' }
                : { backgroundColor: '#ec3838ff' },
            ]}
          >
            <Text style={styles.btntext}>Cancel</Text>
          </Pressable>
          <View style={{ width: '15%' }}></View>
          <Pressable
            onPress={() => {
              handleOnSubmitData();
            }}
            style={({ pressed }) => [
              styles.actionButtons,
              pressed
                ? { backgroundColor: '#01ac01ff' }
                : { backgroundColor: '#07e707ff' },
            ]}
          >
            <Text style={styles.btntext}>Save</Text>
          </Pressable>
        </View>
        {Modal.modalState && Modal.modalFor === 'cancel' && (
          <CustomAlert
            title="Are You Sure?"
            message="You don't want to create the Product"
            onClose={() => setModal(false)}
            cancelBtnText="No"
            onConfirm={() => {
              handleOnCancelBtn();
            }}
          />
        )}
        {Modal.modalState && Modal.modalFor === 'save' && (
          <CustomAlert
            title="Input Fields are Empty!!"
            message="Fill Fields Correctly"
            onClose={() => setModal(false)}
            onConfirm={() => {
              setModal({ modalState: false });
            }}
          />
        )}
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
    elevation: 10,
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
