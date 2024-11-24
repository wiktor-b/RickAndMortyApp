import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './src/stacks/Main';
import {ClickOutsideProvider} from 'react-native-click-outside';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ClickOutsideProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </QueryClientProvider>
    </ClickOutsideProvider>
  );
};

export default App;
