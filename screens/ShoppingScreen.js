import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';

export default function ShoppingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <Text>Shopping Screen</Text>
      < BottomNavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});