import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import CompareScreen from '../screens/compare-screen';
import HomeScreen from '../screens/home-screen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-blue-600">
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: 'rgb(37,99,235)'},
          headerTitleStyle: {color: '#fff'},
          headerBackTitleStyle: {color: '#f2f2f2'},
        }}>
        <Stack.Screen
          name="homeScreen"
          options={{title: 'Launches'}}
          component={HomeScreen}
        />
        <Stack.Screen
          options={{title: 'Comparison'}}
          name="compareScreen"
          component={CompareScreen}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigator;
