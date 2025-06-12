// import React from 'react';
// import { Text, Image, TouchableOpacity, View, Linking, Alert } from 'react-native';
// import { Eventt } from '../Model/Eventt';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { ScaledSheet } from 'react-native-size-matters';

// interface Props {
//   event: Eventt;
//   onPress: () => void;
//   onSave?: () => void;
//   isSaved?: boolean;
// }

// const EventCard: React.FC<Props> = ({ event, onPress, onSave, isSaved }) => {
//   const { latitude, longitude, name, location } = event;

//   // Function to open maps app at the event location
//   const openMaps = () => {
//     const url = `geo:${latitude},${longitude}?q=${encodeURIComponent(location || name)}`;
//     Linking.openURL(url).catch(() => {
//       Alert.alert('Failed to open maps');
//     });
//   };

//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <Image source={{ uri: event.imageUrl }} style={styles.image} />

//       <View style={styles.infoContainer}>
//         <Text style={styles.title}>{event.name}</Text>
//         <Text style={styles.date}>📅 {event.date}</Text>

//        <TouchableOpacity onPress={openMaps}>
//           <Text style={styles.location}>📍 {location}</Text>
//         </TouchableOpacity>
//       </View>

//       {onSave && (
//         <TouchableOpacity onPress={onSave} style={styles.heart}>
//             <Text style={styles.heartText}>{isSaved ? '❤️' : '🤍'}</Text>
//         </TouchableOpacity>
//       )}
//     </TouchableOpacity>
//   );
// };

// export default EventCard;

// const styles = ScaledSheet.create({
//   card: {
//     backgroundColor: '#f9f9f9',
//     flexDirection: 'row',
//     padding: '12@s',
//     borderRadius: '10@s',
//     marginBottom: '16@vs',
//     position: 'relative',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100@s',
//     height: '100@s',
//     borderRadius: '8@s',
//     marginRight: '12@s',
//   },
//   infoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: RFValue(16),
//     fontWeight: 'bold',
//   },
//   date: {
//     color: '#666',
//     marginTop: '4@vs',
//     fontSize: RFValue(12),
//   },
//   location: {
//     color: '#0066cc',
//     marginTop: '4@vs',
//     textDecorationLine: 'underline',
//     fontSize: RFValue(12),
//   },
//   heart: {
//     position: 'absolute',
//     top: '88@s',
//     right: '8@s',
//   },
//   heartText: {
//     fontSize: RFValue(20),
//     color: '#ff0000',
//   },
// });
import React, { useEffect, useState } from 'react';
import { Text, Image, TouchableOpacity, View, Linking, Alert, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';
import { Eventt } from '../Model/Eventt';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScaledSheet } from 'react-native-size-matters';

interface Props {
  event: Eventt;
  onPress: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

const EventCard: React.FC<Props> = ({ event, onPress, onSave, isSaved }) => {
  const { latitude, longitude, name, location } = event;

  const [_userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  // Request permission on Android and get current location
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission denied', 'Location permission is required to calculate distance.');
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {return;}

      Geolocation.getCurrentPosition(
        position => {
          const { latitude: userLat, longitude: userLon } = position.coords;
          setUserLocation({ latitude: userLat, longitude: userLon });

          // Calculate distance in meters
          const dist = getDistance(
            { latitude: userLat, longitude: userLon },
            { latitude, longitude }
          );
          setDistance(dist);
        },
        error => {
          console.error(error);
          Alert.alert('Error', 'Unable to get your location.');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    getLocation();
  }, [latitude, longitude]);

  // Function to open maps app at the event location
  const openMaps = () => {
    const url = `geo:${latitude},${longitude}?q=${encodeURIComponent(location || name)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Failed to open maps');
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.date}>📅 {event.date}</Text>

        <TouchableOpacity onPress={openMaps}>
          <Text style={styles.location}>📍 {location}</Text>
        </TouchableOpacity>

        {distance !== null && (
          <Text style={styles.distance}>
            🛣️ {(distance / 1000).toFixed(2)} km away
          </Text>
        )}
      </View>

      {onSave && (
        <TouchableOpacity onPress={onSave} style={styles.heart}>
          <Text style={styles.heartText}>{isSaved ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = ScaledSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    padding: '12@s',
    borderRadius: '10@s',
    marginBottom: '16@vs',
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    width: '100@s',
    height: '100@s',
    borderRadius: '8@s',
    marginRight: '12@s',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  date: {
    color: '#666',
    marginTop: '4@vs',
    fontSize: RFValue(12),
  },
  location: {
    color: '#0066cc',
    marginTop: '4@vs',
    textDecorationLine: 'underline',
    fontSize: RFValue(12),
  },
  distance: {
    marginTop: '4@vs',
    fontSize: RFValue(12),
    color: '#444',
  },
  heart: {
    position: 'absolute',
    top: '88@s',
    right: '8@s',
  },
  heartText: {
    fontSize: RFValue(20),
    color: '#ff0000',
  },
});

