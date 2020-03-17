import * as React from 'react';
import { useState} from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen'
import InfoScreen from './src/InfoScreen'
import GenreScreen from './src/GenreScreen'

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
  'roboto-bold': require('./fonts/Roboto/Roboto-Bold.ttf'),
  'roboto-italic': require('./fonts/Roboto/Roboto-Italic.ttf'),
  'roboto-regular': require('./fonts/Roboto/Roboto-Regular.ttf'),
  'roboto-light': require('./fonts/Roboto/Roboto-Light.ttf')
  });
  };

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: true
            
          }}
          
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: '',
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0)',
              height: 0
            }
          }}
  
          />
        <Stack.Screen 
          name="Info" 
          component={InfoScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0)',
              height: 0
            },
            headerTintColor: 'rgba(0,0,0,0)'
          }} 
          />
              <Stack.Screen 
          name="Genres" 
          component={GenreScreen} 
          options={{
            title: 'GENRES',
            headerStyle: {
              backgroundColor: '#BABBC2'
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          />
     
      </Stack.Navigator>

      
     
    </NavigationContainer>
  );
}

export default App;