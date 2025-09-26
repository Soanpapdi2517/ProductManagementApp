import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RNFS from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import Upload from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomAlert from '../../Modal/CustomModal';
import { useNavigation } from '@react-navigation/native';
import { addProduct } from '../../Slices/dataSlice';
const CreateProduct = () => {
  let { data } = useSelector(state => state.data);
  console.log(typeof data);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // Quantity Type Data DropDown (
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
  // )
  // modal open close useState
  const [Modal, setModal] = useState({
    modalState: false,
    modalFor: null,
  });
  const [inputOnFocus, setInputOnFocus] = useState('');
  // Generate unique ID
  const generateUniqueId = () => {
    const existingIds = data.map(item => item.id);
    let newId = 1;
    while (existingIds?.includes(newId)) {
      newId++;
    }
    return newId;
  };

  const [newProductData, setNewProductData] = useState({
    id: generateUniqueId(),
    image: null,
    ProductName: null,
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
          saveImage(uri);
        }
      },
    );
  };
  const saveImage = async uri => {
    try {
      const fileName = `product_${Date.now()}.jpg`;
      const imagesDir = `${RNFS.DocumentDirectoryPath}/images`;
      const destPath = `${imagesDir}/${fileName}`;

      // Ensure images directory exists
      const dirExists = await RNFS.exists(imagesDir);
      if (!dirExists) {
        await RNFS.mkdir(imagesDir);
      }

      await RNFS.copyFile(uri, destPath);
      // Will call create image function
      setNewProductData(prev => ({ ...prev, image: `file://${destPath}` }));
    } catch (error) {
      console.log('Error while saving the image', error);
    }
  };
  // handle on Cancel button yes
  const handleOnCancelBtn = () => {
    setNewProductData({
      id: generateUniqueId(),
      image: null,
      ProductName: null,
      Quality: null,
      Quantity: null,
      QuantityType: null,
      Price: null,
    });
    setCurrentQuantityTypeValue('');
    setcurrenValueQuality('');
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
  };
  // handle on submit
  const handleOnSubmitData = () => {
    const { image, Quality, Quantity, QuantityType, ProductName, Price } =
      newProductData;
    if (
      !image ||
      !Quality ||
      !Quantity ||
      !QuantityType ||
      !ProductName ||
      !Price
    ) {
      return setModal({ modalState: true, modalFor: 'save' });
    } else {
      dispatch(addProduct(newProductData));
      navigation.goBack();
    }
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
