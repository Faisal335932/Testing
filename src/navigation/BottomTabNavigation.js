import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Entypo from 'react-native-vector-icons/Entypo'
import DropDownPicker from 'react-native-dropdown-picker';

import LottieView from 'lottie-react-native';

const Tab = createBottomTabNavigator();

const BottomNavigationScreenA = () => {
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('faisal');
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
    ]);
    
    return (
        <View>
        
        <Text>BottomNavigation Screen_A</Text>
        <LottieView source={require('../../SplashIcon.json')} autoPlay loop style={styles.splashanimation} />
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            // autoScroll={true}
            placeholder="Fruits"
        />
    </View>
      )
   
}
const BottomNavigationScreenB = () => (
    <View>
        <Text>BottomNavigation Screen_B</Text>
    </View>
)

const BottomTabNavigation = () => {
    
    return (
        <Tab.Navigator screenOptions={{
            tabBarInactiveTintColor: 'grey',
            tabBarActiveTintColor: 'blue',
            size: 133,
            width:100,
            // tabBarShowLabel:false
            tabBarStyle: {
                backgroundColor: 'lightgreen',
                height:330

            },
            tabBarIcon: ({route,color,size})=>{
                 
                    let iconName;
                    if (route.name === 'BottomNavigationScreenA') {
                      iconName = focused ? 'home' : 'home;'
                    } else if (route.name === 'Favorite') {
                      iconName = focused ? 'heart' : 'heart-o';
                    } else if (route.name === 'Medium') {
                      iconName = focused ? 'heart' : 'heart-o';
                    } else if (route.name === 'Hard') {
                      iconName = focused ? 'cog' : 'cog';
                    }
                    return <Icon name={iconName} size={23} color={color} />;
                  
            }
        }

        }>
            <Tab.Screen component={BottomNavigationScreenA} name='BottomNavigationScreenA' options={{
                tabBarIcon({iconName, color, size}) 
                {
                    console.log(size);
                    return(
                        <Entypo name={iconName} color={color} size={size} />
                        // <LottieView style={{ height: 100, width: 100 }} source={require('../../SplashIcon.json')} autoPlay loop  />

                    )
                }
                
            }} />
            {/* <Tab.Screen component={BottomNavigationScreenB} name='BottomNavigationScreenB' /> */}
        </Tab.Navigator>
    )
}

export default BottomTabNavigation

const styles = StyleSheet.create({
    splashanimation: {
        height: 200,
        width: 200,
    }
})