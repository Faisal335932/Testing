import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../components/Splash';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import HomeScreen from '../components/HomeScreen';
import MyKichen from '../components/MyKichen';



  
  const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen name='MyKichen' component={MyKichen} options={{headerShown:false}} />
       <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}} />
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
            <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})