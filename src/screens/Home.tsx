// src/screens/Home.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Button } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import EventCard from '../components/EventCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import Notification from '../components/Notification';

import { getFavorites, saveFavorites } from '../utils/storage';
import { fetchEvents } from '../Service/eventservice';
import { showLocalNotification } from '../Service/notificationService';

import { Eventt } from '../Model/Eventt';

export default function Home({ navigation }: any) {
  const [events, setEvents] = useState<Eventt[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Eventt[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  // In-app banner state
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerMessage, setBannerMessage] = useState('');

  const filterEvents = useCallback(() => {
    let filtered = [...events];
    if (category !== 'All') {
      filtered = filtered.filter(e => e.category === category);
    }
    if (search) {
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredEvents(filtered);
  }, [events, category, search]);

  useEffect(() => {
    loadEvents();
    loadFavorites();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [filterEvents]);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
      showLocalNotification('Events Loaded', `${data.length} events found.`);

      // Show in-app banner
      setBannerTitle('Events Loaded');
      setBannerMessage(`${data.length} events found.`);
      setBannerVisible(true);
      setTimeout(() => setBannerVisible(false), 3000);
    } catch (error) {
      console.error('Error loading events:', error);
      showLocalNotification('Error', 'Failed to load events.');

      // Show error banner
      setBannerTitle('Error');
      setBannerMessage('Failed to load events.');
      setBannerVisible(true);
      setTimeout(() => setBannerVisible(false), 3000);
    }
  };

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const toggleFavorite = async (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  return (
    <View style={styles.container}>
      {bannerVisible && (
        <Notification title={bannerTitle} message={bannerMessage} />
      )}

      <CategoryFilter selected={category} onSelect={setCategory} />
      <SearchBar value={search} onChange={setSearch} />
      <Button
        title="View Favorites"
        onPress={() => navigation.navigate('Favorites')}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('EventDetail', { event: item })}
            onSave={() => toggleFavorite(item.id)}
            isSaved={favorites.includes(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  flatListContent: {
    paddingBottom: 100,
  },
});
