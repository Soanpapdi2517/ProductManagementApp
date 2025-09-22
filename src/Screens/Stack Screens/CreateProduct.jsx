import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { resumeDownload, RNFS } from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import Upload from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import { setFocusedData } from '../../Slices/dataSlice';
const CreateProduct = () => {
  const { data } = useSelector(state => state.data);
  const [quantityData, setQuantityData] = useState({
    dropDownOpen: false,
    value: null,
    items: [
      { label: 'inKgs', value: 'inKgs' },
      { label: 'inGms', value: 'inGms' },
      { label: 'inPcs', value: 'inPcs' },
      { label: 'inMtrs', value: 'inMtrs' },
      { label: 'inCms', value: 'inCms' },
      { label: 'inOunces', value: 'inOunces' },
    ],
  });

  // Quantity Type Data DropDown (
  const [dropDownOpenQuantityType, setdropDownOpenQuantityType] =
    useState(false);
  const [currentQuantityTypeValue, setCurrentQuantityTypeValue] = useState('');
  console.log(currentQuantityTypeValue.slice(2, -1));
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
  // )

  const [inputOnFocus, setInputOnFocus] = useState('');
  const [newProductData, setNewProductData] = useState({
    id: data.length + 1,
    image: null,
    productName: null,
    Quality: null,
    Quantity: null,
    QuantityType: null,
    Price: null,
  });

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1, maxHeight: 300, maxWidth: 300 },
      response => {
        if (!response.didCancel && !response.errorCode) {
          const uri = response.assets[0].uri;
          console.log('picked image', uri);
          saveImage(uri);
        }
      },
    );
  };
  const saveImage = async uri => {
    try {
      const fileName = `product_${Date.now()}.jpg`;
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.copyFile(uri, destPath);
      // Will call create image function
      setNewProductData(prev => ({ ...prev, image: uri }));
      console.log(newProductData);
    } catch (error) {
      console.log('Error while saving the image', error);
    }
  };

  // handle on Change

  const handleOnChangeValue = (field, value) => {
    if (field === 'Quantity' || field === 'Price') {
      value = value === '' ? 0 : Number(value);
    }
    setNewProductData(prev => ({
      ...prev,
      [field]: value,
      Quality: currenValueQuality,
      QuantityType: currentQuantityTypeValue,
    }));
    setFocusedData(newProductData);
    console.log(newProductData);
  };
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      {newProductData.image ? (
        <Image
          style={styles.uploadImage}
          source={{ uri: newProductData.image }}
        />
      ) : (
        <Pressable
          style={({ pressed }) => [
            styles.uploadImage,
            pressed
              ? { backgroundColor: '#bebbbbff' }
              : { backgroundColor: '#dad9d9ff' },
          ]}
          onPress={() => {
            pickImage();
            console.log('clicked');
          }}
        >
          <View style={styles.uploadImageContainer}>
            <Upload name="upload" size={100} color="#767676ff" />
            <Text style={styles.uploadImageText}>Select Image</Text>
          </View>
        </Pressable>
      )}
      {/* Container of all fields */}
      <View style={styles.parentAllTextcontainerCol}>
        {/* container for 4 things */}
        {/* Quality and Product name container */}
        <View style={{ gap: 10 }}>
          {/* ProductName Container */}
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Product Name</Text>
            <TextInput
              onChangeText={value => handleOnChangeValue('productName', value)}
              style={[
                styles.ProductInputContainer,
                inputOnFocus === 'product_name' && styles.onInputFocus,
              ]}
              onFocus={() => setInputOnFocus('product_name')}
              onBlur={() => setInputOnFocus('')}
              value={
                newProductData.productName ? newProductData.productName : ''
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
              setOpen={setdropDownOpenQuality}
              setValue={setcurrenValueQuality}
              setItems={setItemsQuality}
              placeholder="Select Quality"
              zIndex={2000} // Higher z-index for quality dropdown
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>
              Product's Quantity {'in ' + currentQuantityTypeValue.slice(2, -1)}
              s
            </Text>
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
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Quantity Type</Text>
            <DropDownPicker
              open={dropDownOpenQuantityType}
              value={currentQuantityTypeValue}
              items={quantityTypeItems}
              setOpen={setdropDownOpenQuantityType}
              setValue={setCurrentQuantityTypeValue}
              setItems={setQuantityTypeItems}
              placeholder="Select Quantity Type"
              zIndex={1000} // Lower z-index for quantity type dropdown
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
        </View>

        <View style={styles.saveAndCancelButtons}>
          <Pressable style={[styles.actionButtons, { backgroundColor: 'red' }]}>
            <Text style={styles.btntext}>Cancel</Text>
          </Pressable>
          <View style={{ width: '15%' }}></View>
          <Pressable
            style={[styles.actionButtons, { backgroundColor: 'green' }]}
          >
            <Text style={styles.btntext}>Save</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateProduct;

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
    fontSize: 40,
    borderColor: '#565656ff',
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
  },
  btntext: {
    fontSize: 20,
    fontWeight: 500,
  },
});
