import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const CreateOrEditProducts = () => {
  const [ProductsData, setProductsData] = useState([
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
  ]);
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

    setDataEditing(prev => ({ ...prev, [field]: processedValue }));
  };

  const handleOnSubmitData = () => {
    const NewProductsData = ProductsData.map(item =>
      item.id === dataEditing.id
        ? {
            ...item,
            ProductName: dataEditing.productName,
            Quantity: dataEditing.productQuantity,
            Quality: dataEditing.productQuality,
          }
        : item,
    );
    setProductsData(NewProductsData);
    setDataEditing({
      id: null,
      productName: null,
      productQuantity: null,
      productQuality: null,
    });
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.ProductContainer}>
        <FlatList
          data={ProductsData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.SingleItem}>
              {/* For Product details */}
              <View style={styles.ProductDetails}>
                {/* Product Name */}
                <View style={styles.ProductNameContainer}>
                  <Text style={styles.ProductHeadingName}>Product</Text>
                  {EditOpen.id === item.id && EditOpen.onWhichClicked ? (
                    <TextInput
                      style={styles.ProductDataName}
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
                      style={styles.ProductDataQuantity}
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
                      style={styles.ProductDataQuality}
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
                  onPress={() => {}}
                >
                  <MaterialIcons name="delete" size={20} />
                </Pressable>
              </View>
            </View>
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
  },
  text: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
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
  SingleItem: {
    width: '100%',
    backgroundColor: '#dadada',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  ProductDetails: {
    borderRadius: 10,
    backgroundColor: '#dadada95',
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
  ProductDataName: { fontSize: 18, fontWeight: 'bold', textAlign: 'left' },
  ProductHeadingQuantity: { textAlign: 'center', color: '#181515e0' },
  ProductDataQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ProductHeadingQuality: { textAlign: 'right', color: '#181515e0' },
  ProductDataQuality: {
    fontSize: 18,
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
    width: "20%"
  },
});
