import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigators/app-navigator';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {Portal, Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import defaultTheme from './themes';
// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <PaperProvider
      settings={{
        icon: props => <Icon {...props} />,
      }}
      theme={defaultTheme}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </PaperProvider>
  );
};

export default App;
