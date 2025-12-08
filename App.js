import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModuleListScreen from './src/components/screens/ModuleListScreen';
import Screen from './src/components/layout/Screen'; // still used if you add more screens later

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ModuleList"
        screenOptions={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="ModuleList"
          component={ModuleListScreen}
          options={{ title: 'List modules' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
