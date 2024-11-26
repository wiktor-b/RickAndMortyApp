import React, {useState, useCallback, useRef} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import {useInfiniteQuery, useQueryClient} from 'react-query';
import {useAtom} from 'jotai';
import {CharacterCard} from '../../../../components/CharacterCard';
import {SearchBar} from '../../../../components/SearchBar';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {MainStackNavigationProp} from '../../../../stacks/Main/Main.routes';
import {favoritesAtom, type Character} from '../../../../store/favorites';
import {styles} from './CharacterList.styled';
import {Filter} from '../../../../components/Filter';
import axios from 'axios';

type ApiResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

const fetchCharacters = async ({
  pageParam = 1,
  name,
  species,
  status,
}: {
  pageParam: number;
  name: string;
  species: string | undefined;
  status: string | undefined;
}) => {
  const response = await axios.get(
    'https://rickandmortyapi.com/api/character',
    {
      params: {
        page: pageParam,
        name,
        species,
        status,
      },
    },
  );
  console.log(response);
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

const ItemSeparator = () => <View style={styles.separator} />;

const CharacterListScreen = () => {
  const flatListRef = useRef<FlatList | null>(null);
  useScrollToTop(flatListRef);

  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const [status, setStatus] = useState<string | undefined>();
  const [species, setSpecies] = useState<string | undefined>();

  const navigation = useNavigation<MainStackNavigationProp>();
  const queryClient = useQueryClient();

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} =
    useInfiniteQuery<ApiResponse>(
      ['characters', searchQuery, status, species],
      ({pageParam}) =>
        fetchCharacters({pageParam, name: searchQuery, species, status}),
      {
        getNextPageParam: lastPage =>
          lastPage.info.next
            ? parseInt(lastPage.info.next.split('=')[1], 10)
            : undefined,
        staleTime: 5 * 60 * 1000, // 5min
        cacheTime: 30 * 60 * 1000, // 30min
        onSuccess: () => {
          flatListRef.current?.scrollToOffset({offset: 0, animated: true});
        },
      },
    );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      queryClient.removeQueries(['characters', query]);
    },
    [queryClient],
  );

  const toggleFavorite = useCallback(
    (character: Character) => {
      setFavorites(prev =>
        prev.some(fav => fav.id === character.id)
          ? prev.filter(fav => fav.id !== character.id)
          : [...prev, character],
      );
    },
    [setFavorites],
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
        isFavorite={favorites.some(fav => fav.id === item.id)}
        onToggleFavorite={toggleFavorite}
      />
    ),
    [navigation, favorites, toggleFavorite],
  );

  const keyExtractor = useCallback((item: Character) => item.id.toString(), []);

  const characters = data?.pages.flatMap(page => page.results) || [];

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={() => {
          setSearchQuery('');
          flatListRef.current?.scrollToOffset({offset: 0, animated: true});
        }}
      />
      <Filter
        status={status}
        setStatus={setStatus}
        species={species}
        setSpecies={setSpecies}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={characters}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ref={flatListRef}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator /> : null
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No characters found</Text>
          }
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={21}
          ItemSeparatorComponent={ItemSeparator}
        />
      )}
    </View>
  );
};

export default CharacterListScreen;
