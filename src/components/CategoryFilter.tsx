import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const categories = ['All', 'Music', 'Sports', 'Culture', 'Other'];

interface Props {
  selected: string;
  onSelect: (category: string) => void;
}

const screenWidth = Dimensions.get('window').width;
const isTablet = screenWidth >= 768;

const CategoryFilter: React.FC<Props> = ({ selected, onSelect }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.container}
    accessibilityLabel="Event category filter"
  >
    {categories.map(cat => (
      <TouchableOpacity
        key={cat}
        style={[styles.button, selected === cat && styles.selected]}
        onPress={() => onSelect(cat)}
        accessible
        accessibilityLabel={cat}
      >
        <Text style={selected === cat ? styles.selectedText : styles.text}>{cat}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 12 },
  button: {
    backgroundColor: '#eee',
    paddingVertical: isTablet ? 12 : 8,
    paddingHorizontal: isTablet ? 24 : 16,
    borderRadius: 20,
    marginRight: isTablet ? 16 : 10,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: isTablet ? 44 : 36,
  },
  selected: { backgroundColor: '#6200ee' },
  text: { color: '#333', fontSize: isTablet ? 18 : 14 },
  selectedText: { color: '#fff', fontSize: isTablet ? 18 : 14 },
});

export default CategoryFilter;
