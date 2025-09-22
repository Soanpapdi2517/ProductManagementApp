import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../Slices/dataSlice';
import NoDataAvailable from '../Common/NoDataAvailable';
import DoublePressable from '../CustomButtons/onDoublePress';
const CreateOrEditProducts = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.data);
  const [ProductsData, setProductsData] = useState(data);
  const [EditOpen, setEditOpen] = useState({ id: null, onWhichClicked: false });
  const [dataEditing, setDataEditing] = useState({
    id: null,
    productName: null,
    productQuantity: null,
    productQuality: null,
  });
  const handleOnChangeData = (field, value) => {
    let processedValue = value;
    // Convert quantity to number
    if (field === 'productQuantity') {
      processedValue = value === '' ? 0 : Number(value);
    }
    if (field === 'productQuantity' && value === '0') {
    }
    setDataEditing(prev => ({ ...prev, [field]: processedValue }));
  };

  const handleOnSubmitData = () => {
    if (
      !dataEditing.productName ||
      !dataEditing.productQuality ||
      !dataEditing.productQuantity
    ) {
      return <Alert>Product Details cannot be Empty</Alert>;
    }
    const NewProductsData = ProductsData.map(item =>
      item.id === dataEditing.id
        ? {
            ...item,
            ProductName: dataEditing.productName,
            Quantity:
              dataEditing.productQuantity === 0
                ? 1
                : dataEditing.productQuantity,
            Quality: dataEditing.productQuality,
          }
        : item,
    );
    setProductsData(NewProductsData);
    dispatch(setData(NewProductsData));
    setDataEditing({
      id: null,
      productName: null,
      productQuantity: null,
      productQuality: null,
    });
  };

  const handleOnDeleteData = id => {
    const afterDeleteProducts = ProductsData.filter(item => item.id !== id);
    setProductsData(afterDeleteProducts);
    dispatch(setData(afterDeleteProducts));
    console.log(data);
  };

  if (data.length === 0) {
    return <NoDataAvailable />;
  }
  return (
    <View style={[styles.container]}>
      <View style={styles.ProductContainer}>
        <FlatList
          style={{ borderRadius: 15 }}
          data={ProductsData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onLongPress={() => {
                setEditOpen({ id: item.id, onWhichClicked: true });
                setDataEditing({
                  id: item.id,
                  productName: item.ProductName,
                  productQuality: item.Quality,
                  productQuantity: item.Quantity,
                });
              }}
              
              style={[styles.SingleItem]}
            >
              {/* For Product details */}
              <View style={styles.ProductDetails}>
                {/* Product Name */}
                <View style={styles.ProductNameContainer}>
                  <Text style={styles.ProductHeadingName}>Product</Text>
                  {EditOpen.id === item.id && EditOpen.onWhichClicked ? (
                    <TextInput
                      style={[styles.ProductDataName, { color: '#000000' }]}
                      value={dataEditing.productName}
                      onChangeText={value =>
                        handleOnChangeData('productName', value)
                      }
                    />
                  ) : (
                    <Text style={styles.ProductDataName}>
                      {item.ProductName.length > 6
                        ? item.ProductName.slice(0, 6) + '...'
                        : item.ProductName}
                    </Text>
                  )}
                </View>
                {/* Product Quantity */}
                <View style={styles.ProductQuantityContainer}>
                  <Text style={styles.ProductHeadingQuantity}>
                    Quantity({item.QuantityType})
                  </Text>
                  {EditOpen.id === item.id && EditOpen.onWhichClicked ? (
                    <TextInput
                      keyboardType="numeric"
                      style={[styles.ProductDataQuantity, { color: '#000000' }]}
                      value={
                        dataEditing.productQuantity !== null
                          ? dataEditing.productQuantity.toString()
                          : ''
                      }
                      onChangeText={value =>
                        handleOnChangeData('productQuantity', value)
                      }
                    />
                  ) : (
                    <Text style={styles.ProductDataQuantity}>
                      {item.Quantity}
                    </Text>
                  )}
                </View>
                {/* Product Quality */}
                <View style={styles.ProductQualityContainer}>
                  <Text style={styles.ProductHeadingQuality}>Quality</Text>
                  {EditOpen.id === item.id && EditOpen.onWhichClicked ? (
                    <TextInput
                      style={[styles.ProductDataQuality, { color: '#00000' }]}
                      value={dataEditing.productQuality}
                      onChangeText={value =>
                        handleOnChangeData('productQuality', value)
                      }
                    />
                  ) : (
                    <Text style={styles.ProductDataQuality}>
                      {item.Quality}
                    </Text>
                  )}
                </View>
              </View>
              {/* For edit and delete button */}
              {/* For edit and delete button */}
              <View style={styles.ProductButtons}>
                {/* Edit Button */}
                {EditOpen.id === item.id && EditOpen.onWhichClicked ? (
                  <Pressable
                    onPress={() => {
                      setEditOpen({ id: item.id, onWhichClicked: false });
                      handleOnSubmitData();
                    }}
                    style={({ pressed }) => [
                      styles.editBtn,
                      pressed && { backgroundColor: '#11c20eff' },
                    ]}
                  >
                    <Feather name="check" size={25} color="#000000c2" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      setEditOpen({ id: item.id, onWhichClicked: true });
                      setDataEditing({
                        id: item.id,
                        productName: item.ProductName,
                        productQuality: item.Quality,
                        productQuantity: item.Quantity,
                      });
                    }}
                    style={({ pressed }) => [
                      styles.editBtn,
                      pressed && { backgroundColor: '#11c20eff' },
                    ]}
                  >
                    <AntDesign name="edit" size={20} color="#000000c2" />
                  </Pressable>
                )}

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
          ItemSeparatorComponent={() => <View style={{ height: 2 }}></View>}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#b9b9b98d',
  },
  ProductDetails: {
    borderRadius: 12,
    width: '80%',
    flexDirection: 'row',
    paddingHorizontal: '2%',
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
    alignItems: 'flex-start',
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

  editBtn: {
    borderRadius: 50,
    backgroundColor: '#0fe80bff',
    padding: 5,
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
});
