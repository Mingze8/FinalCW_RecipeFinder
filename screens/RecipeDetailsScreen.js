import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  FlatList 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const xOffset = width * 0.04;

export default function RecipeDetailsScreen({ route, navigation }) {
  const { recipe } = route.params;
  const [activeTab, setActiveTab] = useState('ingredients');

  // Helper function to format time
  const formatTime = (minutes) => {
    if (!minutes) return 'N/A';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Helper function to get main nutrition values
  const getMainNutrition = () => {
    if (!recipe.nutrition?.nutrients) return [];
    
    const mainNutrients = ['Calories', 'Protein', 'Carbohydrates', 'Fat', 'Fiber', 'Sugar', 'Sodium'];
    return recipe.nutrition.nutrients.filter(nutrient => 
      mainNutrients.includes(nutrient.name)
    );
  };

  // Helper function to render dietary badges
  const renderDietaryBadges = () => {
    const badges = [];
    if (recipe.vegetarian) badges.push({ text: 'Vegetarian', color: '#4CAF50' });
    if (recipe.vegan) badges.push({ text: 'Vegan', color: '#8BC34A' });
    if (recipe.glutenFree) badges.push({ text: 'Gluten-Free', color: '#FF9800' });
    if (recipe.dairyFree) badges.push({ text: 'Dairy-Free', color: '#2196F3' });
    if (recipe.veryHealthy) badges.push({ text: 'Healthy', color: '#4CAF50' });
    if (recipe.lowFodmap) badges.push({ text: 'Low FODMAP', color: '#9C27B0' });

    return badges.map((badge, index) => (
      <View key={index} style={[styles.badge, { backgroundColor: badge.color }]}>
        <Text style={styles.badgeText}>{badge.text}</Text>
      </View>
    ));
  };

  // Helper function to render ingredients
  const renderIngredients = () => {
    if (!recipe.extendedIngredients || recipe.extendedIngredients.length === 0) {
      return (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>No ingredients information available</Text>
        </View>
      );
    }

    return recipe.extendedIngredients.map((ingredient, index) => (
      <View key={index} style={styles.ingredientItem}>
        <View style={styles.ingredientInfo}>
          <Text style={styles.ingredientName}>{ingredient.name}</Text>
          {ingredient.aisle && (
            <Text style={styles.ingredientAisle}>{ingredient.aisle}</Text>
          )}
        </View>
        <Text style={styles.ingredientAmount}>{ingredient.original}</Text>
      </View>
    ));
  };

  // Helper function to render nutrition
  const renderNutrition = () => {
    const mainNutrition = getMainNutrition();
    
    if (mainNutrition.length === 0) {
      return (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>No nutrition information available</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.nutritionContainer}>
        {mainNutrition.map((nutrient, index) => (
          <View key={index} style={styles.nutritionItem}>
            <Text style={styles.nutritionName}>{nutrient.name}</Text>
            <View style={styles.nutritionValues}>
              <Text style={styles.nutritionAmount}>
                {nutrient.amount.toFixed(1)} {nutrient.unit}
              </Text>              
            </View>
          </View>
        ))}
      </View>
    );
  };

  // Helper function to render instructions
  const renderInstructions = () => {
    if (!recipe.analyzedInstructions || recipe.analyzedInstructions.length === 0) {
      return (
        <View style={styles.noInstructions}>
          <Text style={styles.noInstructionsText}>No cooking instructions available</Text>
        </View>
      );
    }

    // Get the steps from the first analyzedInstructions item
    const steps = recipe.analyzedInstructions[0]?.steps;
    
    if (!steps || steps.length === 0) {
      return (
        <View style={styles.noInstructions}>
          <Text style={styles.noInstructionsText}>No cooking instructions available</Text>
        </View>
      );
    }

    return steps.map((step, index) => (
      <View key={index} style={styles.instructionStep}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>{step.number || index + 1}</Text>
        </View>
        <View style={styles.instructionContent}>
          <Text style={styles.instructionText}>{step.step}</Text>
          {step.ingredients && step.ingredients.length > 0 && (
            <View style={styles.stepIngredients}>
              <Text style={styles.stepIngredientsTitle}>Ingredients used:</Text>
              {step.ingredients.map((ing, idx) => (
                <Text key={idx} style={styles.stepIngredient}>
                  • {ing.name}
                </Text>
              ))}
            </View>
          )}
          {step.equipment && step.equipment.length > 0 && (
            <View style={styles.stepEquipment}>
              <Text style={styles.stepEquipmentTitle}>Equipment needed:</Text>
              {step.equipment.map((equip, idx) => (
                <Text key={idx} style={styles.stepEquipmentItem}>
                  • {equip.name}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    ));
  };

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
        <Text style={styles.headerTitle}>Recipe Details</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recipe Image and Basic Info */}
        <View style={styles.recipeHeader}>
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <View style={styles.recipeStats}>
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.statText}>{formatTime(recipe.readyInMinutes)}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="people-outline" size={16} color="#666" />
                <Text style={styles.statText}>{recipe.servings} servings</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="heart-outline" size={16} color="#666" />
                <Text style={styles.statText}>{recipe.aggregateLikes} likes</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Dietary Badges */}
        <View style={styles.badgesContainer}>
          {renderDietaryBadges()}
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity            
            style = {(activeTab === 'ingredients' ? styles.activeTab : styles.tab)}
            onPress={() => setActiveTab('ingredients')}
          >
            <Text style={[styles.tabText, activeTab === 'ingredients' && styles.activeTabText]}>
              Ingredients
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {(activeTab === 'nutrition' ? styles.activeTab : styles.tab)}
            onPress={() => setActiveTab('nutrition')}
          >
            <Text style={[styles.tabText, activeTab === 'nutrition' && styles.activeTabText]}>
              Nutrition
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {(activeTab === 'instruction' ? styles.activeTab : styles.tab)}
            onPress={() => setActiveTab('instructions')}
          >
            <Text style={[styles.tabText, activeTab === 'instructions' && styles.activeTabText]}>
              Instructions
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'ingredients' && (
            <View style={styles.ingredientsContainer}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              {renderIngredients()}
            </View>
          )}

          {activeTab === 'nutrition' && (
            <View style={styles.nutritionContainer}>
              <Text style={styles.sectionTitle}>Nutrition Facts</Text>
              {renderNutrition()}
            </View>
          )}

          {activeTab === 'instructions' && (
            <View style={styles.instructionsContainer}>
              <Text style={styles.sectionTitle}>Cooking Instructions</Text>
              {renderInstructions()}
            </View>
          )}
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  recipeHeader: {
    paddingHorizontal: xOffset,
    paddingTop: 20,
  },
  recipeImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  recipeInfo: {
    marginBottom: 20,
  },
  recipeTitle: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 24,
    color: '#333',
    marginBottom: 15,
    lineHeight: 30,
  },
  recipeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  statText: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: '#666',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: xOffset,
    marginBottom: 20,
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: 'white',
    fontFamily: 'Sora-Regular',
    fontSize: 12,
  },  
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: xOffset,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
  },
  activeTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#614C4C',
  },
  tabText: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    fontFamily: 'Sora-SemiBold',
    color: '#614C4C',
  },
  tabContent: {
    paddingHorizontal: xOffset,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
  },
  ingredientsContainer: {
    marginBottom: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  ingredientAisle: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  ingredientAmount: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    maxWidth: '40%',
  },
  nutritionContainer: {
    marginBottom: 20,
  },
  nutritionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  nutritionName: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: '#333',
  },
  nutritionValues: {
    alignItems: 'flex-end',
  },
  nutritionAmount: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  nutritionPercent: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructionStep: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#614C4C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    flexShrink: 0,
  },
  stepNumberText: {
    color: 'white',
    fontFamily: 'Sora-SemiBold',
    fontSize: 14,
  },
  instructionContent: {
    flex: 1,
  },
  instructionText: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 10,
  },
  stepIngredients: {
    marginTop: 10,
  },
  stepIngredientsTitle: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  stepIngredient: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    marginBottom: 2,
  },
  stepEquipment: {
    marginTop: 10,
  },
  stepEquipmentTitle: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  stepEquipmentItem: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    marginBottom: 2,
  },
  noInstructions: {
    alignItems: 'center',
    padding: 40,
  },
  noInstructionsText: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  noData: {
    alignItems: 'center',
    padding: 40,
  },
  noDataText: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});
