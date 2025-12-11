// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

// ----- Module screens -----
import ModuleListScreen from './src/components/screens/ModuleListScreen';
import ModuleAddScreen from './src/components/screens/ModuleAddScreen';
import ModuleViewScreen from './src/components/screens/ModuleViewScreen';
import ModuleModifyScreen from './src/components/screens/ModuleModifyScreen';

// ----- User screens (NO template folder!) -----
import UserListScreen from './src/components/screens/UserListScreen';
import UserAddScreen from './src/components/screens/UserAddScreen';
import UserViewScreen from './src/components/screens/UserViewScreen';
import UserModifyScreen from './src/components/screens/UserModifyScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// ===== MODULE STACK =====
function ModuleStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ModuleListScreen"
        component={ModuleListScreen}
        options={{ title: 'Modules' }}
      />
      <Stack.Screen
        name="ModuleAddScreen"
        component={ModuleAddScreen}
        options={{ title: 'Add Module' }}
      />
      <Stack.Screen
        name="ModuleViewScreen"
        component={ModuleViewScreen}
        options={{ title: 'View Module' }}
      />
      <Stack.Screen
        name="ModuleModifyScreen"
        component={ModuleModifyScreen}
        options={{ title: 'Edit Module' }}
      />
    </Stack.Navigator>
  );
}

// ===== USER STACK =====
function UserStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserListScreen"
        component={UserListScreen}
        options={{ title: 'Users' }}
      />
      <Stack.Screen
        name="UserAddScreen"
        component={UserAddScreen}
        options={{ title: 'Add User' }}
      />
      <Stack.Screen
        name="UserViewScreen"
        component={UserViewScreen}
        options={{ title: 'View User' }}
      />
      <Stack.Screen
        name="UserModifyScreen"
        component={UserModifyScreen}
        options={{ title: 'Edit User' }}
      />
    </Stack.Navigator>
  );
}

// ===== ROOT APP WITH DRAWER =====
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Modules"
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen
          name="Modules"
          component={ModuleStackNavigator}
          options={{
            drawerLabel: 'Modules',
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="view-list" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Users"
          component={UserStackNavigator}
          options={{
            drawerLabel: 'Users',
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="people" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
