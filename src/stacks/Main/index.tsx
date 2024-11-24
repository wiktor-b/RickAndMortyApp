import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigationStack} from '../TabNavigation';
import {CharacterDetailsStack} from '../TabNavigation/screens/CharacterDetails'; // Import CharacterDetailsStack
import {MainStackRoutes} from './Main.routes';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MainStackRoutes.TabNavigationStack}
        component={TabNavigationStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={MainStackRoutes.CharacterDetailsStack} // Add CharacterDetailsStack
        component={CharacterDetailsStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
