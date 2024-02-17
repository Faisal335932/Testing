import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Dimensions, FlatList } from 'react-native';
import Test from './src/components/Test';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import Login from './src/components/Login';
import Details from './src/components/Details';
import MyKichen from './src/components/MyKichen';
import Splash from './src/components/Splash';
import HomeScreen from './src/components/HomeScreen';
import SignUp from './src/components/SignUp';
import Entypo from 'react-native-vector-icons/Entypo'
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'; // 
import Modal from "react-native-modal";
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import Receipes from './src/components/Receipes';
import Details2 from './src/components/Details2';
import Saved from './src/components/Saved';
import Profile from './src/components/Profile';


export default function App() {
    const Data = [
        {
            url: require('./src/assets/potato.png'),
            title: 'Potato'
        },
        {
            url: require('./src/assets/tomato.png'),
            title: 'Tomato'
        },
        {
            url: require('./src/assets/onion.png'),
            title: 'Onion'
        },
    ]
    const [modalData, setModalData] = useState([
        {
            id:1,
            url: require('./src/assets/potato.png'),
            title: 'Potato'
        },
        {
            id:2,
            url: require('./src/assets/tomato.png'),
            title: 'Tomato'
        },
        {
            id:3,
            url: require('./src/assets/onion.png'),
            title: 'Onion'
        },
    ]);
    const [tickVisible, setTickVisible] = useState(Array(Data.length).fill(false))
    const [tickVisibilities, setTickVisibilities] = useState(Array(Data.length).fill(false));
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    function visiblehandler(index) {
        const newArray = [...tickVisible]; // Create a copy of the original array
        newArray[index] = !newArray[index];
        setTickVisible(newArray)
        toggleModal();
    }
    return (
        // <MyKichen />
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
        // <MyKichen />
        // <View
        //     style={{
        //         width: Dimensions.get('screen').width,
        //         height: Dimensions.get('screen').height,
        //         backgroundColor: 'gold',
        //         alignItems: 'center'
        //     }}
        // >
        //     {
        //         Data.map((data, index) => (
        //             <TouchableOpacity
        //                 key={index}
        //                 onPress={() => visiblehandler(index)}
        //                 style={[{ width: 200, height: 200, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', opacity: tickVisible[index] ? .7 : 1 }]}>
        //                 <Image source={data.url} style={{ width: 200, height: 200 }} />
        //                 {
        //                     tickVisible[index] ? <Icon name='check' color='white' size={122} style={{ position: 'absolute' }} /> : null
        //                 }
        //             </TouchableOpacity>
        //         ))
        //     }
        //     <Modal
        //         onBackdropPress={toggleModal}
        //         onSwipeComplete={toggleModal}
        //         swipeDirection={['down']}
        //         isVisible={isModalVisible}
        //         style={{
        //             margin: 0
        //         }}
        //     >
        //         <View style={{
        //             backgroundColor: 'transparent',
        //             borderTopLeftRadius: moderateScale(10),
        //             borderTopRightRadius: moderateScale(10),
        //             flex: 1,
        //             backgroundColor: 'transparent'
        //         }}>
        //             <Image
        //                 source={require('./src/assets/modal.png')}
        //                 style={{
        //                     width: '100%',
        //                     height: '28%',
        //                     resizeMode: 'cover',
        //                     position: 'absolute',
        //                     bottom: 0,
        //                     borderTopLeftRadius: 10,
        //                     borderTopRightRadius: 10,
        //                 }}
        //             />
        //             <Image
        //                 style={{
        //                     alignSelf: 'center',
        //                     position: 'absolute',
        //                     bottom: '26%',
        //                     width: 170,
        //                     height: 30,
        //                     resizeMode: 'cover'
        //                 }}
        //                 source={require('./src/assets/kitchen.png')}
        //             />


        //             <FlatList
        //                 data={modalData}
        //                 numColumns={8}
        //                 keyExtractor={(data, index) => index}
        //                 contentContainerStyle={{
        //                     justifyContent: 'space-evenly',
        //                     width: '100%',
        //                 }}
        //                 style={{
        //                     backgroundColor: 'lightblue',
        //                     padding: 10,
        //                     position: 'absolute',
        //                     bottom: 82,
        //                     width: '100%',

        //                 }}
        //                 renderItem={({ item }) => (
        //                     <TouchableOpacity
        //                         style={{
        //                             backgroundColor: 'gold', marginHorizontal: 12,
        //                         }}
        //                         onPress={()=>(
        //                             console.log(item)
        //                         )}
        //                     >
        //                         <Image source={require('./src/assets/potato.png')}
        //                             style={{
        //                                 resizeMode: 'cover',
        //                                 height: 22,
        //                                 width: 22,
        //                                 alignSelf: 'center'
        //                             }}
        //                         />
        //                         <Text >{item?.title}</Text>
        //                     </TouchableOpacity>
        //                 )}
        //             />
        //             <TouchableOpacity
        //             style={{
        //                 position:'absolute',
        //                 bottom:44,
        //                 backgroundColor:'transparent',
        //                 alignItems:'center',
        //                 justifyContent:'center',
        //                 paddingHorizontal:55,
        //                 borderWidth:1,
        //                 borderColor:'white',
        //                 borderRadius:22,
        //                 left:32
        //             }}
        //             >
        //                 <Text style={{color:'white'}}>Cancel</Text>
        //             </TouchableOpacity>
        //             <TouchableOpacity
        //             style={{
        //                 position:'absolute',
        //                 bottom:44,
        //                 backgroundColor:'#D84327',
        //                 alignItems:'center',
        //                 justifyContent:'center',
        //                 paddingHorizontal:55,
        //                 borderRadius:22,
        //                 right:32
        //             }}
        //             >
        //                 <Text style={{color:'white'}}>Save</Text>
        //             </TouchableOpacity>
                    


        //         </View>
        //     </Modal>

        // </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
        alignItems: 'center',
    },
    btnsyle: {
        fontSize: 55,
        fontWeight: '900',
        color: 'black'
    }

});