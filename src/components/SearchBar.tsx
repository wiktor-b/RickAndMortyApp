import React from 'react';
import {View, TextInput, StyleSheet, Text, Pressable} from 'react-native';
import {Search, X} from 'lucide-react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
};

export const SearchBar = ({value, onChangeText, onClear}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
      <View style={styles.searchContainer}>
        <Search size={20} color="#162C1B" />
        <TextInput
          style={styles.searchBar}
          placeholder="Search the characters"
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 && (
          <Pressable
            onPress={onClear}
            style={({pressed}) => [
              styles.clearButton,
              pressed && styles.clearButtonPressed,
            ]}>
            <X size={20} color="#000" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    gap: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#224229',
    gap: 8,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 500,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#59695C',
  },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonPressed: {
    backgroundColor: '#DAE4DC',
  },
});
