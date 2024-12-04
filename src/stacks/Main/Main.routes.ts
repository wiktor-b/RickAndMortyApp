import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TabNavigationStackParamList} from '../TabNavigation/TabNavigation.routes';

export type MainStackParamList = {
  TabNavigationStack: NavigatorScreenParams<TabNavigationStackParamList>;
  CharacterDetailsStack: {
    screen: string;
    params: {
      characterId: number;
    };
  };
};

export type MainStackNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

export const MainStackRoutes: {
  [route in keyof MainStackParamList]: route;
} = {
  TabNavigationStack: 'TabNavigationStack',
  CharacterDetailsStack: 'CharacterDetailsStack',
};
