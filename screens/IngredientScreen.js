import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import debounce from 'lodash.debounce';

import BottomNavBar from '../components/BottomNavBar';
import { mockIngredients } from '../mockIngredients';
import { mockMyIngredients } from '../mockMyIngredients';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const xOffset = width * 0.04;

export default function IngredientScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [myIngredientsMode, setMyIngredientsMode] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientAmount, setIngredientAmount] = useState('1');

  const handleSearch = useCallback(async (text) => {
    const apiKey = '0229c2e4043547b4873fbe739976f356';
    const apiUrl = `https://api.spoonacular.com/food/ingredients/search?query=${text}&number=5&apiKey=${apiKey}`;

    setQuery(text);

    if (text.length < 2) {
      setResults([]);
      return;
    }
    try {

      const filteredResults = mockIngredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(text.toLowerCase())
      );
           
      setResults(filteredResults);      
      storeSearchResult(filteredResults);

      // const response = await fetch(apiUrl);
      // const data = await response.json(); 
      // console.log(data);
      // setResults(data.results);

    } catch (error) {
      setResults([]);
      console.error('Error fetching ingredients:', error);
    }
  }, []);

  const storeSearchResult = async (data) => {
    try{
      const response = await fetch('http://192.168.0.169/MobileFinal_RecipeFinder/storeSearchResult.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (result.success) {
        console.log('Search result stored successfully');
      } else {
        console.log('Failed to store search result');
      }    
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const openIngredientModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIngredientAmount('1');
    setModalVisible(true);
  };

  const addIngredientToList = () => {
    if (!ingredientAmount || parseFloat(ingredientAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0');
      return;
    }

    // Here you can add the ingredient to your list with the specified amount
    const ingredientWithAmount = {
      ...selectedIngredient,
      amount: parseFloat(ingredientAmount)
    };

    console.log('Adding ingredient:', ingredientWithAmount);
    
    // TODO: Add to your ingredients list/database
    // You can implement your logic here to save the ingredient
    
    setModalVisible(false);
    setSelectedIngredient(null);
    setIngredientAmount('1');
    
    Alert.alert('Success', `${ingredientWithAmount.name} added to your list!`);
  };

  const renderMyIngredient = () => {
    return (        
      <FlatList        
        data={mockMyIngredients}
        key={'_'}
        keyExtractor={(item) => "_" + item.id.toString()}        
        numColumns={2}
        columnWrapperStyle = {{justifyContent:'space-around'}}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity            
            style={styles.myIngredientCard}
            onPress={() => console.log(`Selected ingredient: ${item.name}`)}
          >
            <Image
              source={{ uri: `https://img.spoonacular.com/ingredients_100x100/${item.image}` }}
              style={styles.ingredientImage}
            />
            <View style={[styles.ingredientInfo, {alignItems:'center'}]}>
              <Text style={styles.ingredientName}>{item.name}</Text>              
            </View>   
          </TouchableOpacity>
        )}
      />      
    );
  };

  const renderAddIngredient = () => {
    return (
      <>
        {query.length > 0 && (
          <Text style={styles.resultsTitle}>
            {results.length > 0 ? `${results.length} ingredients found` : 'No ingredients found'}
          </Text>
        )}
        
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.ingredientCard} 
              onPress={() => openIngredientModal(item)}
            >
              <Image
                source={{ uri: `https://img.spoonacular.com/ingredients_100x100/${item.image}` }}
                style={styles.ingredientImage}
              />
              <View style={styles.ingredientInfo}>
                <Text style={styles.ingredientName}>{item.name}</Text>                
              </View>
              <View style={styles.addButton}>
                <Ionicons name="add-circle-outline" size={24} color="#EDD6C2" />
              </View>
            </TouchableOpacity>
          )}
        />
      </>
    );
  };

const debouncedSearch = useRef(debounce(handleSearch, 300)).current;

return (
  <View style={styles.container}>
    <StatusBar style='light' />

    <View style={styles.floatingButton}>
      {myIngredientsMode ? (
        <TouchableOpacity style={styles.myIngredientsButton} onPress={() => setMyIngredientsMode(!myIngredientsMode)}>
          <Ionicons name="add-circle-outline" size={18} color={'#000'} />
          <Text style={styles.floatingButtonText}>Add Ingredients</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.myIngredientsButton} onPress={() => setMyIngredientsMode(!myIngredientsMode)}>
          <Ionicons name="bag-outline" size={18} color={'#000'} />
          <Text style={styles.floatingButtonText}>View Ingredients</Text>
        </TouchableOpacity>
      )}
    </View>

    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Header Section */}
      <LinearGradient
        colors={['#614C4C', '#A69B92']}
        style={styles.headerWrapper}
        start={{ x: .9, y: 0 }}
        end={{ x: .1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{myIngredientsMode ? 'My Ingredients' : 'Find Ingredients'}</Text>
          <Text style={styles.headerSubtitle}>{myIngredientsMode ? 'Manage your ingredients' : 'Add ingredients to your list'}</Text>
        </View>
      </LinearGradient>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#614C4C" style={styles.searchIcon} />
            <TextInput
              placeholder='Search for ingredients...'
              placeholderTextColor="#A69B92"
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                debouncedSearch(text)
              }}
              style={styles.searchInput}
            />
          </View>
        </View>
      </View>

      {/* Results Section */}
      <View style={styles.resultsSection}>

        {/* My Ingredients Mode */}
        {myIngredientsMode ? (              
          renderMyIngredient()     
        ) : (
          renderAddIngredient()
        )}        
      </View>
    </ScrollView>

    {/* Ingredient Amount Modal */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Ingredient</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#614C4C" />
            </TouchableOpacity>
          </View>

          {selectedIngredient && (
            <View style={styles.ingredientPreview}>
              <Image
                source={{ uri: `https://img.spoonacular.com/ingredients_100x100/${selectedIngredient.image}` }}
                style={styles.modalIngredientImage}
              />
              <Text style={styles.modalIngredientName}>{selectedIngredient.name}</Text>
            </View>
          )}

          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Amount:</Text>
            <View style={styles.amountInputContainer}>
              <TouchableOpacity 
                style={styles.amountButton}
                onPress={() => {
                  const currentAmount = parseFloat(ingredientAmount) || 0;
                  if (currentAmount > 1) {
                    setIngredientAmount((currentAmount - 1).toFixed(0));
                  }
                }}
              >
                <Ionicons name="remove" size={24} color="#614C4C" />
              </TouchableOpacity>
              
              <TextInput
                style={styles.amountInput}
                value={ingredientAmount}
                onChangeText={setIngredientAmount}
                keyboardType="numeric"
                placeholder="1"
                placeholderTextColor="#A69B92"
              />
              
              <TouchableOpacity 
                style={styles.amountButton}
                onPress={() => {
                  const currentAmount = parseFloat(ingredientAmount) || 0;
                  setIngredientAmount((currentAmount + 1).toFixed(0));
                }}
              >
                <Ionicons name="add" size={24} color="#614C4C" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.addButtonModal}
              onPress={addIngredientToList}
            >
              <Text style={styles.addButtonText}>Add to List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

    <BottomNavBar navigation={navigation} />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 70,
  },
  headerWrapper: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 28,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: -15,
  },
  searchBox: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: '#333',
  },
  floatingButton: {
    position: 'absolute',
    bottom: (width * .05) + 70,
    right: width * .05,
    zIndex: 1,
  },
  myIngredientsButton: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: 'rgba(237 214 194 / .35)',
    padding: 10,
    alignItems: 'center',
    borderRadius: 9999,
  },
  floatingButtonText: {
    fontSize: 12,
  },
  resultsSection: {
    paddingHorizontal: 20,
    paddingTop: 30,
    flex: 1,
  },  
  resultsTitle: {
    fontFamily: 'Sora-Medium',
    fontSize: 16,
    color: '#614C4C',
    marginBottom: 20,
    textAlign: 'center',
  },
  ingredientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  ingredientImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'contain',
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontFamily: 'Sora-Medium',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  ingredientCategory: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    color: '#A69B92',
  },
  addButton: {
    padding: 8,
  },

  myIngredientCard: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: (width/2.2) - xOffset,
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: width * 0.85,
    maxHeight: height * 0.6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 20,
    color: '#614C4C',
  },
  closeButton: {
    padding: 5,
  },
  ingredientPreview: {
    alignItems: 'center',
    marginBottom: 25,
  },
  modalIngredientImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalIngredientName: {
    fontFamily: 'Sora-Medium',
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  amountSection: {
    marginBottom: 25,
  },
  amountLabel: {
    fontFamily: 'Sora-Medium',
    fontSize: 16,
    color: '#614C4C',
    marginBottom: 10,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  amountButton: {
    width: 50,
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  amountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Sora-Regular',
    color: '#333',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Sora-Medium',
    fontSize: 16,
    color: '#666',
  },
  addButtonModal: {
    flex: 1,
    backgroundColor: '#EDD6C2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Sora-Medium',
    fontSize: 16,
    color: '#333',
  },
});