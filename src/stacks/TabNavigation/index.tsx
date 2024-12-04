import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CharacterListScreen} from './screens/CharacterList';
import {FavoriteCharactersScreen} from './screens/FavoriteCharacters';
import {Star, User} from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const AllCharactersIcon = () => <User color="white" size={16} />;

const LikedCharactersIcon = () => <Star color="white" size={16} />;

export const TabNavigationStack = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Nav.png')}
        style={styles.navImage}
        resizeMode="cover"
      />
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        })}>
        <Tab.Screen
          name="ALL CHARACTERS"
          component={CharacterListScreen}
          options={() => ({
            headerShown: false,
            tabBarIcon: AllCharactersIcon,
          })}
        />
        <Tab.Screen
          name="LIKED CHARACTERS"
          component={FavoriteCharactersScreen}
          options={() => ({
            headerShown: false,
            tabBarIcon: LikedCharactersIcon,
          })}
        />
      </Tab.Navigator>
      <Image
        source={require('../../../assets/Footer.png')}
        style={styles.footerImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#162C1B',
  },
  navImage: {
    width: '100%',
  },
  tabBar: {
    backgroundColor: '#162C1B',
    height: 70,
  },
  tabBarLabel: {
    fontSize: 12,
  },
  footerImage: {
    width: '100%',
  },
});

export default TabNavigationStack;
