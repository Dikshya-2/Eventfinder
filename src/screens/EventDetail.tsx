import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/types';
import { ScaledSheet } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetail'>;

export default function EventDetail({ route }: Props) {
  const { event } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />

      <View style={styles.infoSection}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.category}>{event.category}</Text>
        <Text style={styles.coords}>{`${event.latitude}, ${event.longitude}`}</Text>
        <Text style={styles.info}>{event.info}</Text>
        <Text style={styles.date}>{new Date(event.date).toLocaleString()}</Text>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ticketButton}>
          <Text style={styles.ticketButtonText}>Get Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = ScaledSheet.create({
  container: {
    padding: '16@s',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  image: {
    width: width - 32, // keep dynamic width based on screen width
    height: (width - 32) * 0.6,
    borderRadius: '12@s',
    marginBottom: '16@vs',
    resizeMode: 'cover',
  },

  infoSection: {
    width: '100%',
    marginBottom: '20@vs',
  },

  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: '8@vs',
  },

  category: {
    fontSize: RFValue(18),
    marginBottom: '6@vs',
  },

  coords: {
    fontSize: RFValue(14),
    marginBottom: '6@vs',
    color: '#555',
  },

  info: {
    fontSize: RFValue(14),
    marginBottom: '6@vs',
  },

  date: {
    fontSize: RFValue(14),
    marginBottom: '12@vs',
    fontStyle: 'italic',
    color: '#888',
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '10@s',
  },

  saveButton: {
    backgroundColor: '#6200ee',
    paddingVertical: '14@vs',
    paddingHorizontal: '24@s',
    borderRadius: '20@s',
    flex: 1,
    marginRight: '8@s',
  },

  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: RFValue(16),
  },

  ticketButton: {
    backgroundColor: '#007bff',
    paddingVertical: '14@vs',
    paddingHorizontal: '24@s',
    borderRadius: '20@s',
    flex: 1,
    marginLeft: '8@s',
  },

  ticketButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: RFValue(16),
  },
});
