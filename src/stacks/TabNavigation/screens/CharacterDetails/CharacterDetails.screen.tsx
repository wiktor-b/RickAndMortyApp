import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CharacterDetailsCard} from '../../../../components/CharacterDetailsCard';
import {useAtom} from 'jotai';
import {favoritesAtom, type Character} from '../../../../store/favorites';

type RouteParams = {
  characterId: number;
};

const CharacterDetailsScreen = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const navigation = useNavigation();
  const route = useRoute();
  const {characterId} = route.params as RouteParams;

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${characterId}`,
        );
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [characterId]);

  const isFavorite = favorites.some(fav => fav.id === characterId);

  const toggleFavorite = (selectedCharacter: Character) => {
    setFavorites(prev =>
      prev.some(fav => fav.id === selectedCharacter.id)
        ? prev.filter(fav => fav.id !== selectedCharacter.id)
        : [...prev, selectedCharacter],
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../../assets/Nav.png')}
        style={styles.navImage}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>
          {'<- Go back to Characters List'}
        </Text>
      </TouchableOpacity>
      {character && (
        <FlatList
          data={[character]}
          renderItem={({item}) => (
            <CharacterDetailsCard
              character={item}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.cardContainer}
        />
      )}
      <Image
        source={require('../../../../../assets/Footer.png')}
        style={styles.footerImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButtonText: {
    fontSize: 12,
    color: '#59695C',
  },
  cardContainer: {
    padding: 16,
  },
  navImage: {
    width: '100%',
    height: 80,
  },
  footerImage: {
    width: '100%',
    height: 140,
  },
});

export default CharacterDetailsScreen;
