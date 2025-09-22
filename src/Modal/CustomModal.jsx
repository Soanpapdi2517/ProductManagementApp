import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

const CustomAlert = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose} // handles back button on Android
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>Delete Product</Text>
          <Text style={styles.message}>
            Are you sure you want to delete this product?
          </Text>

          <View style={styles.buttons}>
            <Pressable style={[styles.btn, styles.cancel]} onPress={onClose}>
              <Text style={styles.btnText}>No</Text>
            </Pressable>
            <Pressable
              style={[styles.btn, styles.confirm]}
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              <Text style={styles.btnText}>Yes</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default CustomAlert;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btn: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancel: {
    backgroundColor: '#ccc',
  },
  confirm: {
    backgroundColor: '#e53935',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
