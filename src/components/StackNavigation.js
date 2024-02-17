import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './Splash';
import Login from './Login';
import HomeScreen from './HomeScreen';
import Details2 from './Details2';
import Details from './Details';
import NestedNavigation from './NestedNavigation';
import SignUp from './SignUp';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            {/* <Stack.Screen name='NestedNavigation' component={NestedNavigation} options={{headerShown:false}} /> */}
            <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}} />
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
            <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}} />
            {/* <Stack.Screen name='Details2' component={Details2} options={{headerShown:false}} /> */}
        </Stack.Navigator>

    </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})