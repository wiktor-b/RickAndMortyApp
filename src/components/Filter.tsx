import React, {Dispatch, SetStateAction, useState} from 'react';
import {ChevronDown} from 'lucide-react-native';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import {Checkbox} from './Checkbox';
import {useClickOutside} from 'react-native-click-outside';

interface FilterProps {
  status: string | undefined;
  setStatus: Dispatch<SetStateAction<string | undefined>>;
  species: string | undefined;
  setSpecies: Dispatch<SetStateAction<string | undefined>>;
}

export const Filter = ({
  status,
  setStatus,
  species,
  setSpecies,
}: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<View>(() => {
    setIsOpen(false);
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          setIsOpen(v => !v);
        }}>
        <Text style={styles.text}>FILTER </Text>
        <ChevronDown color={styles.text.color} />
      </Pressable>
      {isOpen && (
        <View collapsable={false} ref={ref} style={styles.modal}>
          <Text style={styles.label}>STATUS</Text>
          <Checkbox
            label="Alive"
            value="alive"
            checked={status === 'alive'}
            onChange={setStatus}
          />
          <Checkbox
            label="Dead"
            value="dead"
            checked={status === 'dead'}
            onChange={setStatus}
          />
          <Checkbox
            label="Unknown"
            value="unknown"
            checked={status === 'unknown'}
            onChange={setStatus}
          />
          <Text style={styles.label}>SPIECIES</Text>
          <Checkbox
            label="Human"
            value="human"
            checked={species === 'human'}
            onChange={setSpecies}
          />
          <Checkbox
            label="Humanoid"
            value="humanoid"
            checked={species === 'humanoid'}
            onChange={setSpecies}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'flex-start',
    zIndex: 100,
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '100%',
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#224229',
    padding: 24,
    gap: 16,
    borderBottomWidth: 5,
    borderRightWidth: 5,
  },
  label: {
    fontSize: 14,
    color: '#59695C',
  },
  button: {
    color: '#fff',
    backgroundColor: '#224229',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 100,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
  },
});
