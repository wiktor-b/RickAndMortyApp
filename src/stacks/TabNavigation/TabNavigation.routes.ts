import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type TabNavigationStackParamList = {
  CharacterListScreen: undefined;
  FavoriteCharactersScreen: undefined;
};

export type TabStackNavigationProp =
  NativeStackNavigationProp<TabNavigationStackParamList>;

export const TabNavigationStackRoutes: {
  [route in keyof TabNavigationStackParamList]: route;
} = {
  CharacterListScreen: 'CharacterListScreen',
  FavoriteCharactersScreen: 'FavoriteCharactersScreen',
};
