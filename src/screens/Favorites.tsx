import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import EventCard from '../components/EventCard';
import { getFavorites } from '../utils/storage';
import { fetchEvents } from '../Service/eventservice';
import { Eventt } from '../Model/Eventt';
import { ScaledSheet } from 'react-native-size-matters';

export default function Favorites({ navigation }: any) {
  const [favoriteEvents, setFavoriteEvents] = useState<Eventt[]>([]);

  useEffect(() => {
    loadFavoriteEvents();
  }, []);

  const loadFavoriteEvents = async () => {
    const allEvents = await fetchEvents();
    const favoriteIds = await getFavorites();
    const favorites = allEvents.filter(event => favoriteIds.includes(event.id));
    setFavoriteEvents(favorites);
  };

  return (
    <View style={styles.container}>
      {favoriteEvents.length === 0 ? (
        <Text>No saved events.</Text>
      ) : (
        <FlatList
          data={favoriteEvents}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={() => navigation.navigate('EventDetail', { event: item })}
              isSaved={true}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '16@s',
    paddingTop: '50@vs',
    backgroundColor: '#fff',
  },
});
