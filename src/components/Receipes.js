import { Dimensions, TouchableOpacity, Image, StatusBar, FlatList, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, scale } from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SelectList } from 'react-native-dropdown-select-list'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ScaleFromCenterAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const Receipes = () => {
  const [selected, setSelected] = React.useState("");
  const [data, setdata] = useState([
    { key: '1', value: '' },
    { key: '2', value: '+91' },
    { key: '3', value: '+971' },
    { key: '4', value: '+88' },
    { key: '5', value: '+1' },

  ]);
  const [optionsData, setOptionsData] = useState([
    {
      content: 'Cooking Time',
    },
    {
      content: 'Meal Type'
    },
    {
      content: 'Categories',
    },
    {
      content: 'Veg Type'
    },
  ])
  const [iconData, setIconData] = useState([

    {
      url: require('../assets/heart.png'),
      count: 3,
      leftscale: 0,
    },
    {
      url: require('../assets/smile.png'),
      count: 3,
      leftscale: 27
    },
    {
      url: require('../assets/heart-plus.png'),
      count: 0,
      leftscale: 54
    }

  ])
  const DATA = [
    {
      url: require('../assets/chicken-biryani.png'),
    },
    {
      url: require('../assets/chicken-biryani.png'),
    },
    {
      url: require('../assets/chicken-biryani.png'),
    },
    {
      url: require('../assets/chicken-biryani.png'),
    },
    {
      url: require('../assets/chicken-biryani.png'),
    },
    {
      url: require('../assets/chicken-biryani.png'),
    },
    {
      url: require('../assets/chicken-biryani.png'),
    },
    {
      url: require('../assets/chicken-biryani.png'),
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'white'}
        barStyle={'dark-content'}
      />
      <View style={styles.headingContainer}>
        <Text style={styles.headingStyle}>You could cook below recipes </Text>
        <Image source={require('../assets/smile-crop.png')} style={{ resizeMode: 'contain', height: scale(13.5) }} />
      </View>
      <View style={styles.searchContainer}>
        <AntDesign name='search1' style={styles.searchIconStyle} />
        <TextInput placeholder='Biryani' style={styles.searchTextStyle} />
      </View>

      <View style={styles.optionsContainer}>
        {
          optionsData.map((content, index) => (
            <SelectList
              key={index}
              data={data}
              setSelected={setSelected}
              arrowicon={<FontAwesome name="chevron-down" size={6.5} color={'#A3A3A3'} style={{ marginLeft: 1.5 }} />}
              boxStyles={styles.dropdownStyle} //override default styles
              defaultOption={{ key: '1', value: content.content }}   //default selected option
            />
          ))
        }
      </View>
      <View style={{ paddingBottom: scale(33) }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={DATA}
          style={{
            width:scale(329),
          }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.receipesList}>
              <Image source={item.url} style={styles.receipeImage} />

              <View style={styles.receipeDetails}>
                <Text style={styles.receipeTitle}>Chicken Biryani</Text>
                <Text style={styles.ingredientmatchedStyle}>5 of 5 ingredients matched</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.ingredientmatchedStyle}>🕥 25 Min</Text>
                  <Image source={require('../assets/kcl-icon.png')} style={styles.kclIconStyle} />
                  <Text style={styles.ingredientmatchedStyle}>500 kcl</Text>
                  <View style={styles.allrecentIconContainer}>
                    {
                      iconData.map((icondata, index) => {

                        return (
                          <TouchableOpacity style={[styles.recentIconBtn, { left: scale(icondata.leftscale) }]} key={index}>
                            <Image source={icondata.url} style={styles.recentIconImage} />
                            <Text style={styles.recentIconText}>{icondata.count}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  )
}

export default Receipes

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center'
  },
  headingStyle: {
    fontWeight: '600',
    fontSize: scale(15),
    marginVertical: scale(13),
    color: '#0B0B0B'
  },
  headingContainer: {
    borderBottomWidth: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#C9C9C9',
    marginBottom: scale(15),
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E4E4',
    width: scale(329),
    height: scale(23),
    paddingHorizontal: scale(11),
    alignItems: 'center',
    borderRadius: scale(5),
    marginBottom: scale(13),
  },
  searchTextStyle: {
    fontSize: scale(10),
    color: '#646565',
    fontWeight: '300',
    paddingLeft: scale(9),
    paddingVertical: 0,
    width: '95%',
  },
  dropdownStyle: {
    fontSize: 6,
    alignItems: 'center',
    borderRadius: scale(20),
    height: scale(18),
    width: scale(71),
    paddingVertical: 0,
    paddingBottom: 3,
    color: '#A3A3A3',
    paddingHorizontal: scale(8)

  },
  optionsContainer: {
    flexDirection: 'row',
    width: scale(329),
    justifyContent: 'space-evenly',
    marginBottom: scale(13.5),
  },
  receipesList: {
    flexDirection: 'row',
    width: scale(329),
    alignItems: 'center',
    paddingLeft: 0,
    elevation: 1,
    marginBottom: scale(24),
    borderWidth: 0,

  },
  receipeImage: {
    resizeMode: 'cover',
    height: scale(100),
    width: scale(100),
  },
  receipeDetails: {
    marginLeft: scale(9),
    height: '97%',
    marginTop: '3%',
  },
  receipeTitle: {
    fontSize: scale(12),
    fontWeight: '600',
    color: '#0B0B0B',
    marginTop: 0,
  },
  ingredientmatchedStyle: {
    color: '#AEAEAE',
    fontSize: scale(9),
    fontWeight: '300',
    marginRight: scale(9),
    marginTop: scale(7.5),
  },
  kclIconStyle: {
    height: scale(9),
    width: scale(8),
    marginRight: scale(4),
    marginTop: scale(7.5),
  },
  allRecentsContainer: {
    marginTop: scale(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: scale(5),
  },
  recentIconBtn: {
    flexDirection: 'row',
    // marginTop:scale(20),
    height: scale(13),
    width: scale(22),
    position: 'absolute',
    top: scale(14),
    left: 0
  },
  recentIconImage: {
    borderRadius: scale(13),
    height: scale(13),
    width: scale(22),
  },
  recentIconText: {
    position: 'relative',
    right: scale(11),
    top: scale(4),
    color: '#919191',
    fontSize: scale(8),
    fontWeight: '300',
  },
  allrecentIconContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    position: 'absolute',
    top: scale(15)
  }
})