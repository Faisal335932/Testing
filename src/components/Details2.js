import { StyleSheet, Text, View, StatusBar, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Details2 = ({ navigation }) => {
    const [detailsData, setDetailsdata] = useState([
        {
            icon: 'user',
            content: '2 Persons',
        },
        {
            icon: 'clock-o',
            content: '25 Min',
        },
        {
            icon: '',
            content: '',
        },
        {
            icon: '',
            content: 'Breakfast',
        },
    ])

    const [instructionData, setInstructionData] = useState([
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'
        },
    ])
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#D84327"
                barStyle='light-content'
            />

            <View style={styles.topConainer}>
                <AntDesign name='arrowleft' color='white' size={scale(12.5)} onPress={()=>navigation.goBack()} />
                <Text style={styles.titlescreen}>Chicken Biryani</Text>
                <AntDesign name='sharealt' color='white' size={scale(13.5)} style={styles.shareiconstyle} />
            </View>
            <Image source={require('../assets/biryani-details.png')} style={styles.biryaniDetails} />

            <View style={styles.recipeContainer} >
                <View style={styles.dotContainerstyle}>

                    <Entypo name='dot-single' size={scale(26)} color='#D84327' style={styles.dotstyle} />
                </View>
                <Text style={styles.recipeName}>Chicken Biryani</Text>
                <FontAwesome name='bookmark-o' color='#D84327' size={18} style={styles.bookmark} />
            </View>

            <View style={styles.recipewithExperience}>
                <TouchableOpacity style={styles.recipeTextContainer}>
                    <Text style={styles.recipeText}>Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.experienceTextContainer}>
                    <Text style={styles.experienceText}>Your Experience</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.recipeDetailsContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    horizontal
                    data={detailsData}
                    keyExtractor={(data, index) => index}
                    renderItem={({ item }) => (
                        <View style={styles.personContainer}>
                            {item?.icon != '' ? <FontAwesome name={item?.icon} color='#D84327' size={10} /> : <Text></Text>}
                            <Text style={styles.personTextStyle}>{item?.content}</Text>
                        </View>

                    )}
                />
            </View>

            <View style={styles.ingredientInstructionsContainer}>
                <TouchableOpacity style={styles.IngredientsContainer} onPress={() => navigation.replace('Details')}>
                    <Text style={styles.IngredientsText}>Ingredients</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.InstructionsContainer}>
                    <Text style={styles.InstructionsText}>Instructions</Text>
                </TouchableOpacity>
            </View>

            
                <FlatList
                showsVerticalScrollIndicator={false}
                    data={instructionData}
                    style={{
                        width:moderateScale(329),
                        // backgroundColor:'lightgreen',
                        alignSelf:'center',
                    }}
                    keyExtractor={(data, index) => index}
                    renderItem={({ item, index }) => (
                        <View style={styles.instructionContainer}>
                            <View>
                                <Text style={styles.instructionIndex}>{index+1}. </Text>
                            </View>
                            <View>
                                <Text style={[styles.instructionText,{lineHeight:16}]}>{item.content}</Text>
                            </View>
                        </View>
                    )}
                />
            




        </View>
    )
}

export default Details2

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: 'white'
    },
    topConainer: {
        backgroundColor: '#D84327',
        width,
        height: scale(42.5),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: scale(14.5),
    },
    titlescreen: {
        fontSize: scale(12.5),
        fontWeight: '500',
        color: 'white',
        marginLeft: scale(9.5),
    },
    shareiconstyle: {
        position: 'absolute',
        right: scale(14.5),
    },
    biryaniDetails: {
        resizeMode: 'cover',
        width,
        height: scale(191),
    },
    recipeContainer: {
        flexDirection: 'row',
        marginTop: scale(12),
        alignItems: 'center',
        paddingLeft: scale(14.5),
    },
    recipeName: {
        fontSize: scale(14),
        fontWeight: '500',
        marginLeft: scale(9.5),
        color: '#0B0B0B'

    },
    dotContainerstyle: {
        borderColor: '#D84327',
        borderWidth: 2,
        padding: scale(0),
        borderRadius: 3,
        width: scale(15),
        height: scale(15),
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'

    },
    dotstyle: {
        textAlign: 'center',
        position: 'absolute',
    },
    bookmark: {
        position: 'absolute',
        right: scale(14.5),

    },
    recipewithExperience: {
        flexDirection: 'row',
        marginTop: scale(15),
        // width:width-29,
        paddingHorizontal: scale(14.5),
        alignSelf: 'center',

    },
    recipeText: {
        color: '#D84327',
        fontWeight: '300',
        fontSize: scale(11),

    },
    experienceText: {
        color: '#919191',
        fontWeight: '300',
        fontSize: scale(11),
    },
    recipeTextContainer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D84327',
        paddingBottom: scale(7.5),
    },
    experienceTextContainer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: scale(7.5),
    },
    personContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: scale(70),
        height: scale(16.5),
        borderColor: '#919191',
        borderWidth: 1,
        borderRadius: scale(8),
        marginRight: scale(9),


    },
    recipeDetailsContainer: {
        width,
        paddingHorizontal: scale(14.5),
        marginTop: scale(22),
    },
    personTextStyle: {
        fontSize: scale(10),
        fontWeight: '300',
        color: '#919191',
    },
    ingredientInstructionsContainer: {
        width: scale(156.5),
        height: scale(25),
        alignSelf: 'center',
        marginTop: scale(37),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: scale(36),
    },
    InstructionsContainer: {
        width: '50%',
        backgroundColor: '#D84327',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRadius: scale(13),
    },
    InstructionsText: {
        color: 'white',
        fontWeight: '500',
        fontSize: scale(10.5),
    },
    IngredientsContainer: {
        width: '50%',
        // backgroundColor:'#D84327',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRadius: scale(13),

    },
    IngredientsText: {
        fontWeight: '500',
        fontSize: scale(10.5),
        color: '#0B0B0B',
    },
    instructionContainer: {
        flexDirection: 'row',
        width:'100%',
        // paddingLeft: scale(14.5),
        // paddingRight: scale(14.5),
        marginBottom:scale(15),
        // backgroundColor:'lightblue',
        paddingTop:verticalScale(3.5)
    },
    instructionText: {
        fontSize: scale(10),
        fontWeight: '300',
        color: '#4A4A4A',
        textAlign: 'justify'
    },
    instructionIndex: {
        color: '#0B0B0B',
        fontSize: scale(20),
        fontWeight: '500',
        marginTop: scale(-10),
        // lineHeight: 24,
    },

}) 