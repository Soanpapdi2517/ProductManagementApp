import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RNFS } from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import Upload from 'react-native-vector-icons/Feather';
const CreateProduct = () => {
  const { data } = useSelector(state => state.data);
  const [OldData, setOldData] = useState(data);
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

  console.log(newProductData.image);
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
      const fileName = `product_${Date.now}.jpg`;
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.copyFile(uri, destPath);
      // Will call create image function
    } catch (error) {
      console.log('Error while saving the image', error);
    }
  };

  // handle on Change

  const handleOnChangeValue = (field, value) => {
    
  }
  return (
    <View style={styles.container}>
      {newProductData.image ? (
        <Image
          style={styles.uploadImage}
          source={{ uri: newProductData.image }}
        />
      ) : (
        <Pressable
          style={[styles.uploadImage, { backgroundColor: '#bcbbbbff' }]}
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
            <TextInput
              style={[
                styles.ProductInputContainer,
                inputOnFocus === 'product_quality' && styles.onInputFocus,
              ]}
              onFocus={() => setInputOnFocus('product_quality')}
              onBlur={() => setInputOnFocus('')}
              value={newProductData.Quality ? newProductData.Quality : ''}
              placeholder="Product's Quality"
              placeholderTextColor={'#000000ff'}
            />
          </View>
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Product's Quantity</Text>
            <TextInput
              style={[
                styles.ProductInputContainer,
                inputOnFocus === 'product_Quantity' && styles.onInputFocus,
              ]}
              value={
                newProductData.productName ? newProductData.productName : ''
              }
              onFocus={() => setInputOnFocus('product_Quantity')}
              onBlur={() => setInputOnFocus('')}
              placeholder="Enter the Product's Quantity"
              placeholderTextColor={'#000000ff'}
            />
          </View>
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Product Name</Text>
            <TextInput
              style={[
                styles.ProductInputContainer,
                inputOnFocus === 'product_price' && styles.onInputFocus,
              ]}
              onFocus={() => setInputOnFocus('product_price')}
              onBlur={() => setInputOnFocus('')}
              value={newProductData.Price ? newProductData.Price : ''}
              placeholder="Enter the Product's Price"
              placeholderTextColor={'#000000ff'}
            />
          </View>
          <View style={styles.ProductNameContainer}>
            <Text style={styles.ProductLabelInput}>Quantity Type</Text>
            <TextInput
              style={[
                styles.ProductInputContainer,
                inputOnFocus === 'product_quantity_type' && styles.onInputFocus,
              ]}
              onFocus={() => setInputOnFocus('product_quantity_type')}
              onBlur={() => setInputOnFocus('')}
              value={
                newProductData.QuantityType ? newProductData.QuantityType : ''
              }
              placeholder="Enter Product's Quantity Type"
              placeholderTextColor={'#000000ff'}
            />
          </View>
          {/* Quantity and Price Container */}
        </View>
        {/* options for Quantity Type */}
      </View>
    </View>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    padding: '4%',
    flex: 1,
    borderRadius: 12,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    height: '40%',
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
});
