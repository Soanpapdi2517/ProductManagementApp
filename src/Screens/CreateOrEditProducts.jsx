import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setFocusedData } from '../Slices/dataSlice';
import NoDataAvailable from '../Common/NoDataAvailable';
import { useNavigation } from '@react-navigation/native';
// Swipeable Item Component
const SwipeableItem = ({ item, onDelete, onEdit }) => {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
      startX.value = translateX.value;
    })
    .onUpdate(event => {
      'worklet';
      // Constrain the movement - only allow left swipe, no right swipe beyond 0
      const newValue = startX.value + event.translationX;
      if (newValue <= 0 && newValue >= -120) {
        translateX.value = newValue;
      }
    })
    .onEnd(event => {
      'worklet';
      const shouldOpen = event.translationX < -50;

      if (shouldOpen) {
        translateX.value = withSpring(-120);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const blurStyle = useAnimatedStyle(() => {
    'worklet';
    const opacity = interpolate(translateX.value, [0,-120], [1,0.6]);
    return {
      opacity,
    };
  });

  const actionButtonsStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleCancel = () => {
    translateX.value = withSpring(0);
  };

  const handleEdit = () => {
    translateX.value = withSpring(-120);
    if (onEdit) {
      onEdit(item);
    }
  };

  return (
    <View style={styles.swipeableContainer}>
      {/* Action Buttons (behind the item) */}
      <Animated.View style={[styles.actionButtons, actionButtonsStyle]}>
        <Pressable style={({pressed})=>[styles.editBtn, pressed && {backgroundColor: "green"}]} onPress={handleEdit}>
          <MaterialIcons name="edit" size={25} color="white" />
        </Pressable>
        <Pressable style={({pressed})=>[styles.cancelBtn, pressed && {backgroundColor: "red"}]} onPress={handleCancel}>
          <MaterialIcons name="close" size={25} color="white" />
        </Pressable>
      </Animated.View>

      {/* Main Item Content */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.SingleItem, animatedStyle]}>
          <Animated.View style={[styles.itemContent, blurStyle]}>
            {/* For Product details */}
            <Pressable onPress={handleCancel} style={styles.ProductDetails}>
              {/* Product Name */}
              <View style={styles.ProductNameContainer}>
                <Text style={styles.ProductHeadingName}>Product</Text>
                <Text style={styles.ProductDataName}>
                  {item.ProductName.length > 6
                    ? item.ProductName.slice(0, 6) + '...'
                    : item.ProductName}
                </Text>
              </View>
              {/* Product Quantity */}
              <View style={styles.ProductQuantityContainer}>
                <Text style={styles.ProductHeadingQuantity}>
                  Qty
                  <Text style={{ fontSize: 12, fontStyle: 'italic' }}>
                    ({item.QuantityType})
                  </Text>
                </Text>
                <Text style={styles.ProductDataQuantity}>{item.Quantity}</Text>
              </View>
              {/* Product Quality */}
              <View style={styles.ProductQualityContainer}>
                <Text style={styles.ProductHeadingQuality}>Quality</Text>
                <Text style={styles.ProductDataQuality}>{item.Quality}</Text>
              </View>
              {/* Product Price */}
              <View style={styles.ProductPriceContainer}>
                <Text style={styles.ProductHeadingPrice}>Price</Text>
                <Text style={styles.ProductDataPrice}>{item.Price}</Text>
              </View>
            </Pressable>
            <View style={styles.ProductButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.deleteBtn,
                  pressed && { backgroundColor: '#c70e3fff' },
                ]}
                onPress={() => onDelete(item.id)}
              >
                <MaterialIcons name="delete" size={20} />
              </Pressable>
            </View>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const CreateOrEditProducts = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.data);
  const navigation = useNavigation();
  if (data.length === 0) {
    return <NoDataAvailable text="No Products Added" />;
  }

  const handleOnDeleteData = id => {
    const afterDeleteProducts = data.filter(item => item.id !== id);
    dispatch(setData(afterDeleteProducts));
  };

  const handleOnEditData = item => {
    dispatch(setFocusedData(item));
    navigation.navigate('Edit Details');
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.ProductContainer}>
        <FlatList
          bounces={true}
          showsVerticalScrollIndicator={true}
          style={{ borderRadius: 15 }}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <SwipeableItem
              item={item}
              onDelete={handleOnDeleteData}
              onEdit={handleOnEditData}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 5 }}></View>}
        />
      </View>
    </View>
  );
};

export default CreateOrEditProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  swipeableContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  actionButtons: {
    position: 'absolute',
    right: -120, // Start hidden off-screen
    top: 0,
    bottom: 0,
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 5,
  },
  editBtn: {
    backgroundColor: '#1dbe23ff',
    borderRadius: 50,
    padding: 10,
  },
  cancelBtn: {
    backgroundColor: '#ff3737ff',
    padding: 10,
    borderRadius: 50,
  },
  actionText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  SingleItem: {
    width: '100%',
    backgroundColor: '#b9b9b98d',
    borderRadius: 10,
    position: 'relative',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: '1%',
    height: 80, // Match the container height
  },
  ProductDetails: {
    borderRadius: 12,
    width: '90%',
    flexDirection: 'row',
    paddingHorizontal: '2%',
    paddingVertical: '3%',
    justifyContent: 'space-around',
    marginRight: 5,
  },
  ProductNameContainer: {
    width: '22.5%',
  },
  ProductQuantityContainer: {
    justifyContent: 'center',
    width: '22.5%',
  },
  ProductQualityContainer: {
    alignItems: 'center',
    width: '22.5%',
  },
  ProductHeadingName: { textAlign: 'left', color: '#181515e0' },
  ProductDataName: { fontSize: 15, fontWeight: 'bold', textAlign: 'left' },
  ProductHeadingQuantity: { textAlign: 'center', color: '#181515e0' },
  ProductDataQuantity: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ProductHeadingQuality: { textAlign: 'right', color: '#181515e0' },
  ProductDataQuality: {
    fontSize: 15,
    fontWeight: 'bold',
    alignItems: 'flex-start',
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
  ProductPriceContainer: {
    width: '22.5%',

    alignItems: 'center',
  },
  ProductHeadingPrice: {
    justifyContent: 'center',
  },
  ProductDataPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
