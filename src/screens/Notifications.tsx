import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const sampleNotifications = [
  { id: '1', title: 'Welcome', message: 'Thanks for using the app!' },
  { id: '2', title: 'Event Loaded', message: 'You have 11 new events.' },
  // Add more notifications here or fetch from storage/server
];

const Notifications = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={sampleNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No notifications yet</Text>}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  notificationItem: { marginBottom: 16, padding: 12, backgroundColor: '#eee', borderRadius: 8 },
  title: { fontWeight: 'bold', fontSize: 16 },
  message: { fontSize: 14, marginTop: 4 },
});
