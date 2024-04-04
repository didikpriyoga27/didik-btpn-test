import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ContactListScreen from '../screens/ContactListScreen';
import {StackParamList} from './StackParamList';

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          navigationBarColor: '#0f766e',
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          options={{title: 'Contacts'}}
          name="ContactListScreen"
          component={ContactListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
