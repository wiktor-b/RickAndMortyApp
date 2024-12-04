import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Star} from 'lucide-react-native';
import type {Character} from '../store/favorites';

type CharacterCardProps = {
  character: Character;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: (character: Character) => void;
};

const getLikeButtonStyle = (isFavorite: boolean) => ({
  ...styles.likeButton,
  backgroundColor: isFavorite ? '#DAE4DC' : '#FFF',
});

export const CharacterCard = memo(
  ({character, onPress, isFavorite, onToggleFavorite}: CharacterCardProps) => {
    const handleToggleFavorite = () => {
      onToggleFavorite(character);
    };

    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.detailsContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>NAME</Text>
              <Text style={styles.value}>{character.name}</Text>
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>STATUS</Text>
              <Text style={styles.value}>{character.status}</Text>
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>SPECIES</Text>
              <Text style={styles.value}>{character.species}</Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: character.image}} style={styles.image} />
            <TouchableOpacity
              style={getLikeButtonStyle(isFavorite)}
              onPress={handleToggleFavorite}>
              <Star
                size={16}
                color={isFavorite ? '#F89F34' : '#224229'}
                fill={isFavorite ? '#F89F34' : 'transparent'}
              />
              <Text style={styles.likeButtonText}>LIKE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isFavorite === nextProps.isFavorite &&
      prevProps.character.id === nextProps.character.id
    );
  },
);

CharacterCard.displayName = 'CharacterCard';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6F5',
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#224229',
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  labelContainer: {
    padding: 8,
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: 'DMMono-Medium',
    color: '#59695C',
    fontWeight: 500,
  },
  value: {
    fontSize: 16,
    color: '#162C1B',
    fontWeight: 400,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#162C1B',
  },
  likeButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#224229',
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButtonText: {
    marginLeft: 4,
    fontWeight: 400,
    color: '#224229',
  },
});
