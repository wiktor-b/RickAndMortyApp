import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Star} from 'lucide-react-native';
import type {Character} from '../store/favorites';

type CharacterDetailsCardProps = {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: (character: Character) => void;
};

export const CharacterDetailsCard = memo(
  ({character, isFavorite, onToggleFavorite}: CharacterDetailsCardProps) => {
    const handleToggleFavorite = () => {
      onToggleFavorite(character);
    };

    return (
      <View style={styles.container}>
        <Image source={{uri: character.image}} style={styles.image} />
        <View style={styles.detailsContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.label}>name</Text>
            <Text style={styles.valueName}>{character.name}</Text>
          </View>
          <FlatList
            numColumns={2}
            data={[
              {label: 'STATUS', value: character.status},
              {label: 'ORIGIN', value: character.origin?.name || 'Unknown'},
              {label: 'SPECIES', value: character.species},
              {label: 'GENDER', value: character.gender || 'Unknown'},
            ]}
            columnWrapperStyle={styles.gridWrapper}
            renderItem={({item}) => (
              <InfoItem label={item.label} value={item.value} />
            )}
          />
          <TouchableOpacity
            style={[
              styles.likeButton,
              isFavorite ? styles.removeButton : styles.addButton,
            ]}
            onPress={handleToggleFavorite}>
            <Star
              size={16}
              color={isFavorite ? '#F89F34' : '#fff'}
              fill={isFavorite ? '#F89F34' : 'transparent'}
            />
            <Text style={styles.likeButtonText}>
              {isFavorite ? 'REMOVE FROM LIKED' : 'ADD TO LIKED'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isFavorite === nextProps.isFavorite &&
      prevProps.character.id === nextProps.character.id
    );
  },
);

const InfoItem = ({label, value}: {label: string; value: string}) => {
  return (
    <View style={[styles.gridItem, {}]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

CharacterDetailsCard.displayName = 'CharacterDetailsCard';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#224229',
    padding: 24,
    gap: 16,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    marginBottom: 32,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#224229',
  },
  detailsContainer: {
    flexDirection: 'column',
    display: 'flex',
  },
  nameContainer: {
    padding: 8,
  },
  gridWrapper: {
    gap: 16,
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#F4F6F5',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  label: {
    fontSize: 12,
    color: '#59695C',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: '#162C1B',
  },
  valueName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#162C1B',
    fontFamily: 'Inter',
  },
  likeButton: {
    borderRadius: 100,
    marginTop: 16,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#224229',
  },
  removeButton: {
    backgroundColor: '#162C1B',
  },
  likeButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '400',
  },
});
