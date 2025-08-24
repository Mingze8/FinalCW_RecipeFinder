import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {    
    if (email === '' || password === '') {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please enter both email and password.',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    fetch('http://192.168.0.169/MobileFinal_RecipeFinder/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome back!',
            visibilityTime: 1000,
            autoHide: true,
          });
          
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          );

        } else {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: data.message || 'Please try again.',
            visibilityTime: 5000,
            autoHide: true,
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'An error occurred. Please try again.',
          visibilityTime: 5000,
          autoHide: true,
        });
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style='dark'/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>          
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#EDD6C2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18
  },
  linkText: {
    color: '#333',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
});