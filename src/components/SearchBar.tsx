import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScaledSheet } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  value: string;
  onChange: (text: string) => void;
  onClear?: () => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange, onClear }) => (
  <View style={styles.container}>
    <TextInput
      placeholder="Search events"
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholderTextColor="#999"
      accessible
      accessibilityLabel="Search events"
    />
    {value && (
      <TouchableOpacity onPress={onClear} style={styles.clearButton}>
        <Ionicons name="close-circle" size={RFValue(18)} color="#999" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = ScaledSheet.create({
  container: {
    marginBottom: '12@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: '10@s',
    borderRadius: '10@s',
    fontSize: RFValue(14),
    flex: 1,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    padding: 8,
  },
});

export default SearchBar;
