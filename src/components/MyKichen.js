import { View, Text, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign'; // Import the icon you want to use
import Modal from 'react-native-modal';
import SearchIcon from 'react-native-vector-icons/Fontisto';
import ModelImage from "../assets/modal.png"
import Kitchen from "../assets/kitchen.png"
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function MyKichen() {
  const navigation = useNavigation()
  const IsFocused = useIsFocused()
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Save');
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);




  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cheerful-hoodie-fly.cyclic.app/api/getGroceries');
        setProducts(response.data);

      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 15000); // 15 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [IsFocused]);

  useEffect(() => {
    const fetchDataFromStorage = async () => {
      try {
        // Retrieve the selected products from local storage
        const storedSelectedProducts = await AsyncStorage.getItem('selectedProducts');
        const storedTickVisibilities = await AsyncStorage.getItem('tickVisibilities');

        if (storedSelectedProducts && storedTickVisibilities) {
          // Parse the JSON strings back into arrays
          const parsedSelectedProducts = JSON.parse(storedSelectedProducts);
          const parsedTickVisibilities = JSON.parse(storedTickVisibilities);
          // Update the tick visibilities and wait for it to resolve
          await setTickVisibilities(parsedTickVisibilities);

          // Set the state with the retrieved data
          setSelectedProducts(parsedSelectedProducts);
        }
      } catch (error) {
        console.error('Error fetching data from storage:', error);
      } finally {
        // Update the loading state after fetching data
        setLoading(false);
      }
    };

    fetchDataFromStorage();
  }, []);


  const [tickVisibilities, setTickVisibilities] = useState(Array(products.length).fill(false));


  const handleProductSelect = async (product, index) => {
    const updatedSelectedProducts = [...selectedProducts];

    // Toggle the selection status of the product
    const isProductSelected = updatedSelectedProducts.some((selectedProduct) => selectedProduct._id === product._id);

    if (isProductSelected) {
      // If the product is already selected, remove it
      const selectedIndex = updatedSelectedProducts.findIndex((selectedProduct) => selectedProduct._id === product._id);
      updatedSelectedProducts.splice(selectedIndex, 1);
    } else {
      // If the product is not selected, add it
      updatedSelectedProducts.push(product);
    }

    // Toggle the tick visibility for the selected index
    toggleTickVisibility(index);


    setSelectedProducts(updatedSelectedProducts);
    // await AsyncStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
    // await AsyncStorage.setItem('tickVisibilities', JSON.stringify(tickVisibilities));
    setModalVisible(true); // Ensure the modal is visible after selecting a product

  };

  const handleSearch = (text) => {
    setSearchText(text);
    // Implement your filtering logic here based on the entered text
    // For simplicity, let's assume you are filtering products by their title
    const filtered = products.filter(product => product.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredProducts(filtered);
  };


  const toggleTickVisibility = (index) => {
    // Implement your logic to toggle the tick visibility based on the index
    // For simplicity, I'm assuming that the tick visibility is based on whether the product is selected
    setTickVisibilities((prev) => {
      const newVisibilities = [...prev];
      newVisibilities[index] = !newVisibilities[index];
      return newVisibilities;
    });
  };

  // Function to determine if the tick should be visible for a given index
  const getIsTickVisible = (index) => {
    return tickVisibilities[index];
  };
  useEffect(() => {
    const storeData = async () => {
      // Store tickVisibilities in AsyncStorage after it's updated
      await AsyncStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
      await AsyncStorage.setItem('tickVisibilities', JSON.stringify(tickVisibilities));
    };
    storeData();
  }, [tickVisibilities, selectedProducts]);
  // State to manage the tick visibilities

  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://cheerful-hoodie-fly.cyclic.app/api/getAllCategory`);
      setApiData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData(activeCategory);
  }, [activeCategory, IsFocused]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }


  const handleTabClick = async (tab, selectedProducts) => {
    const saveFilled = await AsyncStorage.getItem('saveFilled'); // Check for profile data

    if (saveFilled) {
      if (tab == "Save") {
        setLoading(true)
        const storedUserId = await AsyncStorage.getItem('userId');
        const response = await axios.post(`https://cheerful-hoodie-fly.cyclic.app/api/getProfileIngredients/${storedUserId}`, {
          email: storedUserId,
          ingredients: selectedProducts
        })
        setLoading(false)
        setModalVisible(false)
        navigation.navigate("Home", { selectedProducts });
        await AsyncStorage.setItem('saveFilled', 'true');
      } else {
        setModalVisible(false)
        setLoading(false)
      }
    } else {
      if (tab == "Save") {
        setLoading(true)
        const storedUserId = await AsyncStorage.getItem('userId');
        const response = await axios.post(`https://cheerful-hoodie-fly.cyclic.app/api/getProfileIngredients/${storedUserId}`, {
          email: storedUserId,
          ingredients: selectedProducts
        })
        setLoading(false)
        setModalVisible(false)
        navigation.navigate("BottomTab", { selectedProducts });
        await AsyncStorage.setItem('saveFilled', 'true');
      } else {
        setModalVisible(false)
        setLoading(false)
      }

    }
  }



  return (
    <ScrollView style={{ backgroundColor: "white" }}>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection={['down']}
        style={styles.bottomModal}
      >
        <View style={styles.modalContainer}>
          {/* Background Image */}

          <Image
            source={ModelImage}
            style={{
              flex: 1, resizeMode: 'cover', position: 'absolute', bottom: 0, top: 0, right: 0, left: 0, width: "100%", height: "100%", borderTopLeftRadius: moderateScale(10),
              borderTopRightRadius: moderateScale(10),
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: "-5%" }}>
            <Image
              source={Kitchen}
              style={{ height: moderateVerticalScale(50), width: "70%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            />
          </View>

          <ScrollView horizontal={true}>
            <View style={{ marginHorizontal: moderateScale(10), marginVertical: moderateVerticalScale(15), flexDirection: "row" }}>
              <View style={{ marginHorizontal: moderateScale(10), marginTop: moderateVerticalScale(15), flexDirection: "row" }}>
                {selectedProducts.map(products => (
                  <TouchableOpacity
                    key={products._id}
                    style={{ marginHorizontal: moderateScale(10) }}
                  >
                    <Image
                      source={{ uri: products?.image ? products.image.replace(/^http:/, 'https:') : null }}
                      style={{ height: moderateVerticalScale(35), width: moderateScale(35) }}
                      resizeMode='contain'
                    />
                    <Text style={{ fontSize: scale(6), textAlign: 'center', color: 'white' }}>{products.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>


          <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginVertical: moderateVerticalScale(20) }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginRight: moderateScale(10),
                borderRadius: moderateScale(20),
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: 'transparent',

                width: moderateScale(80),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleTabClick('Cancel')}
            >
              <Text style={{ fontSize: scale(12), textAlign: 'center', color: 'white', fontFamily: 'Poppins-Regular' }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginRight: moderateScale(10),
                borderRadius: moderateScale(20),
                backgroundColor: '#F81C1C',
                height: moderateVerticalScale(30),
                width: moderateScale(80),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleTabClick("Save", selectedProducts)}
            >
              <Text style={{ fontSize: scale(12), color: 'white', fontFamily: 'Poppins-Regular' }}>{loading ? <ActivityIndicator size={15} /> : "Save"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#C9C9C9',
          height: moderateVerticalScale(60),
          justifyContent: 'center',
          backgroundColor: "white"
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: scale(16),
            color: '#0B0B0B',
            fontWeight: 'bold',
            fontFamily: "Poppins-Regular"
          }}>
          My Kitchen Ingredients
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: "center",
            height: moderateVerticalScale(35),
            width: '75%',
            backgroundColor: '#E5E4E4',
            borderRadius: moderateScale(10),
            marginTop: moderateVerticalScale(15),
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SearchIcon name='search' size={16} color={'#99999E'} style={{ marginLeft: moderateScale(10) }} />
            <TextInput
              style={{
                marginTop: moderateVerticalScale(5),
                height: moderateVerticalScale(40),
                width: '90%',
                fontSize: scale(11),
                fontFamily: 'Poppins-Regular',
                color: 'black',
              }}
              placeholder="Search Ingredients"
              placeholderTextColor="#646565"
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => setSearchText('')} style={{
          height: moderateVerticalScale(35),
          justifyContent: 'center',
          marginTop: moderateVerticalScale(15),
        }}>
          <Text style={{ fontSize: scale(14), fontFamily: "Poppins-SemiBold", textAlign: "center", color: "#D64326" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        <View style={{ marginHorizontal: moderateScale(10), marginVertical: moderateVerticalScale(15), flexDirection: "row" }}>
          <View style={{ marginHorizontal: moderateScale(10), marginTop: moderateVerticalScale(15), flexDirection: "row" }}>
            {apiData.map(category => (
              <TouchableOpacity
                key={category._id}
                onPress={() => handleCategoryClick(category.title)}
                style={[
                  styles.categoryButton,
                  { backgroundColor: activeCategory === category.title ? '#D64326' : '#AEAEAE' },
                ]}
              >
                <Text style={{ color: 'white' }}>{category.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={[styles.container, { paddingVertical: 15, flexDirection: 'row', flexWrap: 'wrap' }]}>
        {
          searchText === '' ? (
            products.map((product, index) => (
              product.category === activeCategory ?

                <TouchableOpacity
                  key={index}
                  style={[
                    styles.box,
                    {
                      marginRight: (index + 1) % 4 === 0 ? 0 : moderateScale(10),
                      marginBottom: moderateVerticalScale(15), // Add margin at the bottom to move to the next row
                    },
                  ]}
                  onPress={() => handleProductSelect(product, index)}
                >
                  <Image source={{ uri: product?.image ? product.image.replace(/^http:/, 'https:') : null }} style={{ height: moderateVerticalScale(70), width: moderateScale(70), resizeMode: "contain" }} />
                  <View style={{ position: "absolute" }}>
                    {getIsTickVisible(index) && (
                      <View
                        style={{
                          position: 'absolute',
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          height: moderateVerticalScale(69),
                          width: moderateScale(69),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10
                        }}
                      >
                        <Icon name="check" size={25} color="white" />
                      </View>
                    )}
                  </View>
                  <Text style={{ fontSize: scale(8), color: "black", textAlign: "center", fontFamily: "Poppins-Regular", paddingTop: 5 }}>{product.title}</Text>
                </TouchableOpacity>
                : null
            ))
          ) :
            filteredProducts.map((product, index) => (
              product.category === activeCategory ?
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.box,
                    {
                      marginRight: (index + 1) % 4 === 0 ? 0 : moderateScale(10),
                      marginBottom: moderateVerticalScale(15), // Add margin at the bottom to move to the next row
                    },
                  ]}
                  onPress={() => handleProductSelect(product, index)}
                >
                  <Image source={{ uri: product?.image ? product.image.replace(/^http:/, 'https:') : null }} style={{ height: moderateVerticalScale(70), width: moderateScale(70), resizeMode: "contain" }} />
                  <View style={{ position: "absolute" }}>
                    {getIsTickVisible(index) && (
                      <View
                        style={{
                          position: 'absolute',
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          height: moderateVerticalScale(69),
                          width: moderateScale(69),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10
                        }}
                      >
                        <Icon name="check" size={25} color="white" />
                      </View>
                    )}
                  </View>
                  <Text style={{ fontSize: scale(8), color: "black", textAlign: "center", fontFamily: "Poppins-Regular", paddingTop: 5 }}>{product.title}</Text>
                </TouchableOpacity>
                : null
            ))}
      </View>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  categoryButton: {
    marginHorizontal: moderateScale(5),
    height: moderateVerticalScale(30),
    minWidth: moderateScale(80),
    width: "auto",
    display: 'flex',
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateVerticalScale(10),

  },
  box: {
    width: moderateScale(70),
    height: moderateVerticalScale(90),
  },
  bottomModal: {
    width: "auto",
    margin: 0,
    justifyContent: "flex-end"
  },
  modalContainer: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    height: 'auto',
    width: "100%",


  },
});