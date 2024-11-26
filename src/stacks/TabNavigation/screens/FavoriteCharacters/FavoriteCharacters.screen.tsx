import React, {useState, useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useAtom} from 'jotai';
import {CharacterCard} from '../../../../components/CharacterCard';
import {SearchBar} from '../../../../components/SearchBar';
import {favoritesAtom, type Character} from '../../../../store/favorites';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavigationProp} from '../../../../stacks/Main/Main.routes';
import {styles} from './FavoriteCharacters.styled';

const EmptyListComponent = () => (
  <Text style={styles.emptyText}>No favorite characters found</Text>
);

const ItemSeparator = () => <View style={styles.separator} />;

const FavoriteCharactersScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const navigation = useNavigation<MainStackNavigationProp>();

  const toggleFavorite = useCallback(
    (character: Character) => {
      setFavorites(prev => prev.filter(fav => fav.id !== character.id));
    },
    [setFavorites],
  );

  const filteredFavorites = favorites.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = useCallback(
    ({item}: {item: Character}) => (
      <CharacterCard
        character={item}
        onPress={() =>
          navigation.navigate('CharacterDetailsStack', {
            screen: 'CharacterDetailsScreen',
            params: {characterId: item.id},
          })
        }
        isFavorite={true}
        onToggleFavorite={toggleFavorite}
      />
    ),
    [navigation, toggleFavorite],
  );

  const keyExtractor = useCallback((item: Character) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />
      <FlatList
        data={filteredFavorites}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={EmptyListComponent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default FavoriteCharactersScreen;
