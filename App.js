// Main entry file for SmartSpend navigation and shared app setup.

//Initialisation.......................................
// Imports
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SmartSpendProvider } from './src/context/SmartSpendContext';
import OverviewScreen from './src/screens/OverviewScreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import ExpenseHistoryScreen from './src/screens/ExpenseHistoryScreen';
import TrendsScreen from './src/screens/TrendsScreen';
import IncomeCyclesScreen from './src/screens/IncomeCyclesScreen';
import { COLORS } from './src/constants/theme';

// Navigation setup
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom-tab structure
function SmartSpendTabs() {
  //View.................................................
  return (
    <Tab.Navigator
      // The bottom tabs keep the main student tasks one tap away throughout the app.
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.card,
        },
        headerTintColor: COLORS.ink,
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: COLORS.slate,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          height: 68,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Overview: 'view-dashboard-outline',
            ExpenseHistory: 'wallet-outline',
            Trends: 'chart-donut',
            IncomeCycles: 'calendar-range-outline',
          };

          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Overview"
        component={OverviewScreen}
        options={{ title: 'Overview' }}
      />
      <Tab.Screen
        name="ExpenseHistory"
        component={ExpenseHistoryScreen}
        options={{ title: 'History' }}
      />
      <Tab.Screen
        name="Trends"
        component={TrendsScreen}
        options={{ title: 'Insights' }}
      />
      <Tab.Screen
        name="IncomeCycles"
        component={IncomeCyclesScreen}
        options={{ title: 'Cycles' }}
      />
    </Tab.Navigator>
  );
}

// Root app wrapper
export default function App() {
  //View.................................................
  return (
    // The provider loads database-backed finance data once and shares it across every screen.
    <SmartSpendProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="SmartSpendTabs"
          screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: COLORS.ink,
            contentStyle: { backgroundColor: COLORS.background },
          }}
        >
          <Stack.Screen
            name="SmartSpendTabs"
            component={SmartSpendTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={({ route }) => ({
              title: route.params?.expenseId ? 'Edit Expense' : 'Add Expense',
            })}
          />
          <Stack.Screen
            name="ExpenseHistory"
            component={ExpenseHistoryScreen}
            options={{ title: 'Expense History' }}
          />
          <Stack.Screen
            name="Trends"
            component={TrendsScreen}
            options={{ title: 'Spending Trends' }}
          />
          <Stack.Screen
            name="IncomeCycles"
            component={IncomeCyclesScreen}
            options={{ title: 'Income Cycles' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SmartSpendProvider>
  );
}
