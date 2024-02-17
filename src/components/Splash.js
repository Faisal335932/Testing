import { Dimensions, Image, StatusBar, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';



const Splash = ({navigation}) => {
  useEffect(()=>{
    setTimeout(() => {
      navigation.replace('Login')
    }, 3000);
  },[])
    
  return (
    <View style={styles.container}>
      <StatusBar 
      hidden={true}
      />
      <TouchableOpacity onPress={() => navigation.replace('Login')} >

      <Image source={require('../assets/logo.png')} style={styles.imgstyle} />
      </TouchableOpacity>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center'
    },
    imgstyle:{
        width: scale(245),
        height: verticalScale(245),
        backgroundColor: '#D84327',
       // padding: moderateScale(5)
    }
})