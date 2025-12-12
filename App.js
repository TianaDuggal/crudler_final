//Initialisation.........................................................
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import ModuleListScreen from './src/components/screens/ModuleListScreen';
import ModuleAddScreen from './src/components/screens/ModuleAddScreen';
import ModuleViewScreen from './src/components/screens/ModuleViewScreen';
import ModuleModifyScreen from './src/components/screens/ModuleModifyScreen';

import UserListScreen from './src/components/screens/UserListScreen';
import UserAddScreen from './src/components/screens/UserAddScreen';
import UserViewScreen from './src/components/screens/UserViewScreen';
import UserModifyScreen from './src/components/screens/UserModifyScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

//View.........................................................
function ModuleStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ModuleList" component={ModuleListScreen} />
      <Stack.Screen name="ModuleAdd" component={ModuleAddScreen} />
      <Stack.Screen name="ModuleView" component={ModuleViewScreen} />
      <Stack.Screen name="ModuleModify" component={ModuleModifyScreen} />
    </Stack.Navigator>
  );
}

//View.........................................................
function UserStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserListScreen" component={UserListScreen} />
      <Stack.Screen name="UserAddScreen" component={UserAddScreen} />
      <Stack.Screen name="UserViewScreen" component={UserViewScreen} />
      <Stack.Screen name="UserModifyScreen" component={UserModifyScreen} />
    </Stack.Navigator>
  );
}

//View.........................................................
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="ModuleCrudler"
        screenOptions={{ headerTitleAlign: 'center' }}
      >
        <Drawer.Screen
          name="ModuleCrudler"
          component={ModuleStackNavigator}
          options={{
            title: 'Module CRUDLer',
            drawerLabel: 'Module CRUDLer',
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="view-list" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="UserCrudler"
          component={UserStackNavigator}
          options={{
            title: 'User CRUDLer',
            drawerLabel: 'User CRUDLer',
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="people" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
