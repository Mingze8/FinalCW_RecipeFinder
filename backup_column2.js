import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import BottomNavBar from '../components/BottomNavBar';
import { mockRecipes } from '../mockRecipes';

export async function searchRecipes(query) {
  const apiKey = '0229c2e4043547b4873fbe739976f356';
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.recipeCard} onPress={() => alert(`Selected recipe: ${item.title}`)}>
    <Image source={{ uri: item.image }} style={styles.recipeImage} />
    <Text style={styles.recipeTitle}>{item.title}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    // const results = await searchRecipes(query);           
    navigation.navigate('SearchResults', { recipes: mockRecipes });
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#614C4C', '#A69B92']}
        style={styles.searchWrapper}
        start={{ x: .9, y: 0 }}
        end={{ x: .1, y: 1 }}
      >
        <View style={styles.searchBox}>
          <Text style={styles.searchTitle}>No Idea What to Eat Today?</Text>
          <View style={styles.searchCore}>
            <TextInput
              placeholder='Search for recipes...'
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
            />
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.searchButton}
            >
              <Ionicons name="search-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      
      <View style={[styles.contentWrapper, {paddingTop: 30}]}>
        <Text style={styles.title}>Meal You Can Make</Text>
        <FlatList
          data={mockRecipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}                    
          horizontal
          showsHorizontalScrollIndicator = {false}          
        />
      </View>

      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Daily Recommendation</Text>
        <FlatList
          data={mockRecipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}                                               
        />
      </View>      

      <StatusBar style='light' />
      <BottomNavBar navigation={navigation} />
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
  },
  searchWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',    
    height: height * .3,
    gap: 10,
    paddingBottom: 40,
    paddingHorizontal: 20,    
  },
  searchBox: {
    display: 'flex',
    gap: 12,
  },
  searchTitle: {
    color: '#fff',
    fontFamily: 'Sora-Regular',
    fontSize: 14,
  },
  searchCore: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    flex: 0,
  },

  contentWrapper: {
    flex: 2,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  title: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 15,
    marginBottom: 10
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    padding: 10,
    width: (width/2) - 5 - 20,
    marginRight: 12,
  },
  recipeImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  recipeTitle: {
    marginTop: 10,
    fontFamily: 'Sora-SemiBold',
    fontSize: 12,
    textAlign: 'center',
  },  
});