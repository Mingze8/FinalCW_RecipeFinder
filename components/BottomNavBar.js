import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';  

export default function BottomNavBar({ navigation }) {

    const route = navigation.getState().routes[navigation.getState().index].name;

    return (
        <View style={styles.navBar}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Ingredients')}>
                <Ionicons name="bag-outline" size={24} color={route === 'Ingredients' ? '#614C4C' : '#D1D1D1'} />
                <Text style={[styles.navText, route === 'Ingredients' ? styles.activeColor : styles.normalColor]}>Ingredients</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="home-outline" size={24} color={route === 'Home' ? '#614C4C' : '#D1D1D1'} />
                <Text style={[styles.navText, route === 'Home' ? styles.activeColor : styles.normalColor]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
                <Ionicons name="cart-outline" size={24} color={route === 'Cart' ? '#614C4C' : '#D1D1D1'} />
                <Text style={[styles.navText, route === 'Cart' ? styles.activeColor : styles.normalColor]}>Shopping List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person-outline" size={24} color={route === 'Profile' ? '#614C4C' : '#D1D1D1'} />
                <Text style={[styles.navText, route === 'Profile' ? styles.activeColor : styles.normalColor]}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingBottom: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontFamily: 'Sora-Regular',
    fontSize: 8,
  },
  activeColor: {
    color: '#614C4C'
  },
  normalColor:{
    color: '#D1D1D1'
  }
});