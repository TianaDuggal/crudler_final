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

function ModuleStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="ModuleListScreen"
        component={ModuleListScreen}
        options={({ navigation }) => ({
          title: 'Module CRUDLer',
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={26}
              style={{ marginLeft: 12 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      {/* ✅ Back arrow appears automatically on these screens */}
      <Stack.Screen
        name="ModuleAddScreen"
        component={ModuleAddScreen}
        options={{ title: 'Add module' }}
      />
      <Stack.Screen
        name="ModuleViewScreen"
        component={ModuleViewScreen}
        options={{ title: 'View module' }}
      />
      <Stack.Screen
        name="ModuleModifyScreen"
        component={ModuleModifyScreen}
        options={{ title: 'Modify module' }}
      />
    </Stack.Navigator>
  );
}

function UserStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="UserListScreen"
        component={UserListScreen}
        options={({ navigation }) => ({
          title: 'User CRUDLer',
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={26}
              style={{ marginLeft: 12 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      {/* ✅ Back arrow appears automatically on these screens */}
      <Stack.Screen
        name="UserAddScreen"
        component={UserAddScreen}
        options={{ title: 'Add user' }}
      />
      <Stack.Screen
        name="UserViewScreen"
        component={UserViewScreen}
        options={{ title: 'View user' }}
      />
      <Stack.Screen
        name="UserModifyScreen"
        component={UserModifyScreen}
        options={{ title: 'Modify user' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          name="ModuleCrudler"
          component={ModuleStackNavigator}
          options={{
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
