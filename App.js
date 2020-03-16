import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen'
import InfoScreen from './src/InfoScreen'
import GenreScreen from './src/GenreScreen'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          />
        <Stack.Screen 
          name="Info" 
          component={InfoScreen} 
          />
              <Stack.Screen 
          name="Genres" 
          component={GenreScreen} 
          />
     
      </Stack.Navigator>

      
     
    </NavigationContainer>
  );
}

export default App;