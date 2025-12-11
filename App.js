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

// ----- User screens -----
import UserListScreen from './src/components/screens/UserListScreen';
import UserAddScreen from './src/components/screens/UserAddScreen';
import UserViewScreen from './src/components/screens/UserViewScreen';
import UserModifyScreen from './src/components/screens/UserModifyScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// ========= MODULE STACK (inner) =========
function ModuleStackNavigator() {
  return (
    <Stack.Navigator
      // hide stack headers so we only see the Drawer header,
      // like in your coursework screenshots
      screenOptions={{ headerShown: false }}
    >
      {/* names must match what you use in navigation.navigate(...) */}
      <Stack.Screen name="ModuleList" component={ModuleListScreen} />
      <Stack.Screen name="ModuleAdd" component={ModuleAddScreen} />
      <Stack.Screen name="ModuleView" component={ModuleViewScreen} />
      <Stack.Screen name="ModuleModify" component={ModuleModifyScreen} />
    </Stack.Navigator>
  );
}

// ========= USER STACK (inner) =========
function UserStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* keep names exactly as used in UserListScreen navigation.navigate(...) */}
      <Stack.Screen name="UserListScreen" component={UserListScreen} />
      <Stack.Screen name="UserAddScreen" component={UserAddScreen} />
      <Stack.Screen name="UserViewScreen" component={UserViewScreen} />
      <Stack.Screen name="UserModifyScreen" component={UserModifyScreen} />
    </Stack.Navigator>
  );
}

// ========= ROOT APP WITH DRAWER =========
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="ModuleCrudler"
        // show the Drawer header (important!)
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        {/* MODULE CRUDLer in drawer */}
        <Drawer.Screen
          name="ModuleCrudler"
          component={ModuleStackNavigator}
          options={{
            title: 'Module CRUDLer',        // header title
            drawerLabel: 'Module CRUDLer',  // text in drawer
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="view-list" size={size} color={color} />
            ),
          }}
        />

        {/* USER CRUDLer in drawer */}
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
