import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {

    fetch('http://192.168.0.169/MobileFinal_RecipeFinder/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          Toast.show({
            type: 'success',
            text1: 'Registration Successful',
            text2: 'You can now log in.',
            visibilityTime: 2000,
            autoHide: true,
          });
          navigation.navigate('Login');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Registration Failed',
            text2: data.message || 'Please try again.',
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Registration failed', 'An error occurred. Please try again.');
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style='dark' />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
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
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
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