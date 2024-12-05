// components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BrandHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.brandName}>YönetimKolay</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff', // or your brand color
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f5f5f5'
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF', // or your brand color
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});