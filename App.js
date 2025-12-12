// App.js
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

// ----- Module screens -----
import ModuleListScreen from "./src/components/screens/ModuleListScreen";
import ModuleAddScreen from "./src/components/screens/ModuleAddScreen";
import ModuleViewScreen from "./src/components/screens/ModuleViewScreen";
import ModuleModifyScreen from "./src/components/screens/ModuleModifyScreen";

// ----- User screens -----
import UserListScreen from "./src/components/screens/UserListScreen";
import UserAddScreen from "./src/components/screens/UserAddScreen";
import UserViewScreen from "./src/components/screens/UserViewScreen";
import UserModifyScreen from "./src/components/screens/UserModifyScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

//Initialisation.......................................
function ModuleStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ModuleListScreen"
        component={ModuleListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ModuleAddScreen" component={ModuleAddScreen} />
      <Stack.Screen name="ModuleViewScreen" component={ModuleViewScreen} />
      <Stack.Screen name="ModuleModifyScreen" component={ModuleModifyScreen} />
    </Stack.Navigator>
  );
}

//Initialisation.......................................
function UserStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserListScreen"
        component={UserListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="UserAddScreen" component={UserAddScreen} />
      <Stack.Screen name="UserViewScreen" component={UserViewScreen} />
      <Stack.Screen name="UserModifyScreen" component={UserModifyScreen} />
    </Stack.Navigator>
  );
}

//Initialisation.......................................
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="ModuleCrudler"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <Drawer.Screen
          name="ModuleCrudler"
          component={ModuleStackNavigator}
          options={{
            title: "Module Crudler",
            drawerLabel: "Module Crudler",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="view-list" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="UserCrudler"
          component={UserStackNavigator}
          options={{
            title: "User Crudler",
            drawerLabel: "User Crudler",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="people" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
