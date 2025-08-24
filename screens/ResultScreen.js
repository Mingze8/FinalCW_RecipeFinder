import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const xOffset = width * 0.04;

export default function SearchResultScreen({ route, navigation }) {
  const { recipes } = route.params;

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      {/* Header with back button */}
      <LinearGradient
        colors={['#614C4C', '#A69B92']}
        style={styles.header}
        start={{ x: .9, y: 0 }}
        end={{ x: .1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Results</Text>
      </LinearGradient>

      {/* Results content */}
      <View style={styles.contentWrapper}>
        <Text style={styles.resultsCount}>
          {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
        </Text>

        <FlatList
          data={recipes}
          keyExtractor={item => item.id.toString()}
          renderItem={renderRecipeItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: xOffset,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 20,
    bottom: 0,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',

  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Sora-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: xOffset,
    paddingTop: 20,
  },
  resultsCount: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 15,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    aspectRatio: 1 / 0.75,
    borderRadius: 8,
  },
  recipeTitle: {
    padding: 20,
    fontFamily: 'Sora-SemiBold',
    fontSize: 16,
    color: '#333',
  },
});