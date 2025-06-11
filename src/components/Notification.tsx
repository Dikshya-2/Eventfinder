// src/components/Notification.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title?: string;
  message?: string;
};

const Notification: React.FC<Props> = ({ title, message }) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: 16,
    zIndex: 1000,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    color: '#fff',
    fontSize: 14,
  },
});
