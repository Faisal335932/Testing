import { StyleSheet, Text, View, StatusBar, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const HomeScreen = ({navigation}) => {
    const [searchHistory, setSearchHistory] = useState([
        {
            id: 1,
            historyText: 'Peach, Ghee, Garlic'
        },
        {
            id: 2,
            historyText: 'Cheese, Lentils, potato'
        },
        {
            id: 3,
            historyText: 'Tomato, Seeds'
        },
        {
            id: 4,
            historyText: 'Beans, Fish'
        },
    ]);
    const [itemData, setItemData] = useState([
        {
            title: 'Tomato',
            src: require('../assets/tomato.png')
        },
        {
            title: 'Lentils',
            src: require('../assets/lentils.png')
        },
        {
            title: 'Ghee',
            src: require('../assets/ghee.png')
        },
        {
            title: 'Tomato',
            src: require('../assets/tomato.png')
        },
        {
            title: 'Lentils',
            src: require('../assets/lentils.png')
        },
        {
            title: 'Ghee',
            src: require('../assets/ghee.png')
        },
        {
            title: 'Add',
            src: require('../assets/add.png')
        },
    ])
    const [recentData, setRecentData] = useState([
        {
            url: require('../assets/biryani.png'),
            title: 'Special Chicken Biryani',

        },
        {
            url: require('../assets/biryani.png'),
            title: 'Special Chicken Biryani',
        },
    ]);

    const [iconData, setIconData] = useState([

        {
            url: require('../assets/heart.png'),
            count: 3,
            leftscale:60,
        },
        {
            url: require('../assets/smile.png'),
            count: 3,
            leftscale:60+27
        },
        {
            url: require('../assets/heart-plus.png'),
            count: 0,
            leftscale:60+27+27
        }

    ])

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#FFFFFF"
                barStyle='dark-content'
            />

            <Image
                source={require('../assets/logo-without-text.png')}
                style={styles.logoStyle}
            />
            <Text style={styles.cookTodayTextStyle}  >What should we cook today?</Text>
            <Text style={styles.kyaBnayaTextStyle} >(kya Banaye)</Text>
            <View style={styles.searchContainer}>
                <AntDesign name='search1' style={styles.searchIconStyle} />
                <TextInput placeholder='Search Ingredients' placeholderTextColor={'white'} style={styles.searchInputTextStyle} />
                <TouchableOpacity style={styles.searchBtnContainer}>
                    <Text style={styles.searchBtnText}>Search</Text>
                </TouchableOpacity>
            </View>

            {
                searchHistory.map((data, index) => {
                    return (
                        <TouchableOpacity style={styles.searchHistoryContainer} key={index}>
                            <AntDesign name='search1' style={{ fontSize: scale(15), color: '#646565', marginHorizontal: scale(5) }} />
                            <Text>{data.historyText}</Text>
                        </TouchableOpacity>
                    )
                })
            }

            <Text style={styles.itemsHeading}>Items in My Kitchen</Text>

            <View style={styles.allItemsContainer}>
                {
                    itemData.map((data, index) => (
                        <TouchableOpacity style={styles.itemContainer} key={index}>
                            <Image source={data.src} style={styles.itemImageStyle} />
                            <Text style={styles.itemHeading}>{data.title}</Text>
                        </TouchableOpacity>
                    ))
                }

            </View>

            <Text style={[styles.itemsHeading, { marginTop: scale(12) }]}>Recent Recipes</Text>


            <View style={styles.allRecentsContainer}>
                {
                    recentData.map((data, key) => (
                       
                        <TouchableOpacity style={styles.recentContainer} key={key} onPress={()=>navigation.navigate('Details')}>
                            <Image source={data.url} style={styles.recentImageStyle} />
                            <Text style={styles.recentTextStyle}>{data.title}</Text>
                            <View style={styles.allrecentIconContainer}>
                                {
                                    iconData.map((icondata, index) =>{
                                        
                                    return(
                                        <TouchableOpacity style={[styles.recentIconBtn,{left:scale(icondata.leftscale)}]} key={index}>
                                            
                                            <Image source={icondata.url} style={styles.recentIconImage} />
                                            <Text style={styles.recentIconText}>{icondata.count}</Text>
                                        </TouchableOpacity>
                                    )})
                                }

                                
                            </View>
                        </TouchableOpacity>
                    ))
                }



            </View>


        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height,
        width,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    logoStyle: {
        marginTop: scale(21),
        height: scale(108),
        width: scale(138),
        resizeMode: 'cover',
        marginBottom: scale(8),
    },
    cookTodayTextStyle: {
        fontWeight: '600',
        fontSize: scale(22),
        color: '#0B0B0B',
    },
    kyaBnayaTextStyle: {
        fontSize: scale(16),
        fontWeight: '400',
        color: '#0B0B0B',
        marginBottom: scale(17),
    },
    searchIconStyle: {
        fontSize: scale(16),
        color: 'white',
        fontWeight: 'bold',
        marginLeft: scale(11)
    },
    searchContainer: {
        backgroundColor: '#D64326',
        width: scale(323),
        height: scale(40),
        borderRadius: scale(5),
        flexDirection: 'row',
        alignItems: 'center',

    },
    searchBtnContainer: {
        backgroundColor: '#ffffff',
        height: scale(27),
        marginVertical: scale(6.5),
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(12),
        borderRadius: scale(5),
        position: 'absolute',
        right: scale(6)


    },
    searchInputTextStyle: {
        fontSize: scale(12),
        fontWeight: '300',
        width: scale(195),

    },
    searchBtnText: {
        fontSize: scale(12),
        fontWeight: '500',
        color: '#D64326'
    },
    searchHistoryContainer: {
        flexDirection: 'row',
        marginTop: scale(13),
        width: scale(323),
    },
    itemsHeading: {
        marginTop: scale(14),
        width: scale(323),
        color: '#0B0B0B',
        fontWeight: '600',
        fontSize: scale(12),
    },
    allItemsContainer: {
        marginTop: scale(4),
        borderWidth: scale(1),
        padding: scale(12),
        width: scale(323),
        borderRadius: scale(5),
        flexDirection: 'row',
        borderColor: '#D3D3D3'
    },
    itemHeading: {
        color: '#0B0B0B',
        fontWeight: '400',
        fontSize: scale(5),
        alignSelf: 'center',
    },
    itemContainer: {
        alignItems: 'center',
        width: scale(29),
        height: scale(37),
        marginRight: scale(9),
    },
    itemImageStyle: {
        resizeMode: 'cover',
        height: scale(29),
        width: scale(29),
        // backgroundColor:'#E5E4E4'
    },
    allRecentsContainer: {
        marginTop: scale(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: scale(323),
        borderRadius: scale(5),
    },
    recentContainer: {
        height: scale(167),
        width: scale(155),
        shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
        // borderWidth:.1

    },
    recentImageStyle: {
        resizeMode: 'cover',
        height: scale(106),
        width: '92%',
        alignSelf:'center'
    },
    recentTextStyle: {
        fontWeight: '500',
        fontSize: scale(10),
        color: '#0B0B0B',
        marginTop: verticalScale(4.8),
        marginLeft:moderateScale(9.5),
    },
    recentIconContainer: {
        flexDirection: 'row',


    },
    recentIconBtn: {
        flexDirection: 'row',
        // marginTop:scale(20),
        height: scale(13),
        width: scale(22),
        position: 'absolute',
        top: scale(14),
        left: scale(60)
    },
    recentIconText: {
        position: 'relative',
        right: scale(11),
        top: scale(4),
        color: '#919191',
        fontSize: scale(8),
        fontWeight: '300',
    },
    recentIconImage: {
        borderRadius: scale(13),
        height: scale(13),
        width: scale(22),
    }

})