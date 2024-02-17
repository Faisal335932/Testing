import { Dimensions, StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const Saved = () => {
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
       
    ];
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="white"
                barStyle='dark-content'
            />

            <View style={styles.pageTitleContainer}>
                <Text style={styles.pageTitle}>Saved Receipe</Text>

            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                horizontal={false}
                data={DATA}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.receipesList}>


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
                        <FontAwesome name='bookmark-o' color='#DDDDDD' size={18} style={styles.bookmark} />
                        <Image source={item.url} style={styles.receipeImage} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
            />


        </View>
    )
}

export default Saved

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width,
        height,
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: scale(15),
        fontWeight: '600',
        color: '#0B0B0B',

    },
    pageTitleContainer: {
        height: scale(48),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#C9C9C9',
        borderBottomWidth: scale(1),
        width,
        marginBottom:scale(18),
    },
    receipesList: {
        flexDirection: 'row',
        width: scale(329),
        alignItems: 'center',
        paddingLeft: scale(15),
        elevation: scale(3),
        marginBottom: scale(14),
        borderWidth: 0,
        height:scale(100),

    },
    receipeImage: {
        resizeMode: 'cover',
        height: scale(100),
        width: scale(100),
        position:'absolute',
        right:0,

    },
    receipeDetails: {
        marginLeft: scale(9),
        height: '97%',
        paddingTop: scale(10),
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
    },
    bookmark:{
        position:'absolute',
        right:scale(108),
        top: scale(10),
    }
})