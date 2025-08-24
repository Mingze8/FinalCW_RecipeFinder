import React from 'react';
import {StatusBar} from 'expo-status-bar';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default function BoardingScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/BoardingScreenBackground.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style='light'/>
        <View style={styles.container}>          
            <Text style={styles.title}>Smart Meal Planning Made Easy</Text>  
            <Text style={styles.subtitle}>
              Explore recipes based on your ingredients and create a hassle-free shopping list for what you need.
            </Text>            
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>   
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',        
  },
  container: {
    flex: 1,    
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  title:{
    fontFamily: 'Sora-SemiBold',
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Sora-Regular',
    fontSize: 13,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: '#EDD6C2',
    paddingVertical: 12,        
    width: '85%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#333',
    fontFamily: 'Sora-SemiBold',
    fontSize: 18,
  },
  registerText: {
    color: '#FFF',
    fontFamily: 'Sora-Regular',
    fontSize: 13,
    marginTop: 20,
  },
});