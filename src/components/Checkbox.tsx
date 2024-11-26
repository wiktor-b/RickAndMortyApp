import {Dispatch, SetStateAction} from 'react';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface CheckboxProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: Dispatch<SetStateAction<string | undefined>>;
}

export const Checkbox = ({label, value, checked, onChange}: CheckboxProps) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        onChange(prev => {
          if (prev === value) {
            return undefined;
          }
          return value;
        })
      }>
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: checked ? '#162C1B' : '#fff',
          },
        ]}
      />
      <Text>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DAE4DC',
  },
});
