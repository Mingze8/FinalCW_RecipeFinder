import {useState, useEffect, use} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Font from 'expo-font';
import Toast from 'react-native-toast-message';

import HomeScreen from './screens/HomeScreen';
import BoardingScreen from './screens/BoardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import IngredientScreen from './screens/IngredientScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import ProfileScreen from './screens/ProfileScreen';
import ResultScreen from './screens/ResultScreen';
import RecipeDetailsScreen from './screens/RecipeDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Sora-Bold': require('./assets/fonts/Sora-Bold.ttf'),
      'Sora-ExtraBold': require('./assets/fonts/Sora-ExtraBold.ttf'),
      'Sora-ExtraLight': require('./assets/fonts/Sora-ExtraLight.ttf'),     
      'Sora-Light': require('./assets/fonts/Sora-Light.ttf'),
      'Sora-Medium': require('./assets/fonts/Sora-Medium.ttf'),    
      'Sora-Regular': require('./assets/fonts/Sora-Regular.ttf'),      
      'Sora-SemiBold': require('./assets/fonts/Sora-SemiBold.ttf'),  
      'Sora-Thin': require('./assets/fonts/Sora-Thin.ttf'),                   
    }).then(() => {
      setFontLoaded(true);
    }).catch(error => {
      console.error('Error loading fonts:', error);
    });
  }, []);
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>      
      <Stack.Navigator initialRouteName="Boarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Boarding" component={BoardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Ingredients" component={IngredientScreen} />
        <Stack.Screen name="Cart" component={ShoppingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SearchResults" component={ResultScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
      </Stack.Navigator>
      <Toast />      
    </NavigationContainer>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});