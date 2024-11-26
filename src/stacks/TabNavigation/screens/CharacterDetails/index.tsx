import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CharacterDetailsScreen from './CharacterDetails.screen';

const Stack = createNativeStackNavigator();

export const CharacterDetailsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="CharacterDetailsScreen"
        component={CharacterDetailsScreen}
      />
    </Stack.Navigator>
  );
};
