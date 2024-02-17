import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CountryPicker from 'react-native-country-picker-modal';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


const SignUp = ({ navigation }) => {
  const [withFlagButton, setwithFlagButton] = useState(false);
  const [visibleCountry,setVisibleCountry] = useState(false)
  const [countryCode, setCountryCode] = useState('FR')
  const [country, setCountry] = useState(null)
  const [withCountryNameButton, setWithCountryNameButton] = useState(
    false,
  )
  const [withFlag, setWithFlag] = useState(true)
  const [withEmoji, setWithEmoji] = useState(false)
  const [withFilter, setWithFilter] = useState(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState(true)
  const [withCallingCode, setWithCallingCode] = useState(true)
  const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }
  
  const [data, setdata] = useState([
    { key: '1', value: '+92' },
    { key: '2', value: '+91' },
    { key: '3', value: '+971' },
    { key: '4', value: '+88' },
    { key: '5', value: '+1' },

  ]);
  const [otpInput, setOtpinput] = useState([
    { value: 8 },
    { value: 8 },
    { value: 8 },
    { value: 8 }
  ])
  const [loginOptions, setLoginOptions] = useState([
    { url: require('../assets/google-icon.jpg') },
    { url: require('../assets/fb-icon.jpg') },
    { url: require('../assets/insta-icon.jpg') },
  ])
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle='dark-content'

      />
      <Image source={require('../assets/logo1.png')} style={styles.imgStyle} />
      <View style={styles.headingContainer}>
        <Text style={styles.headingStyle}>SignUp using Phone no & Otp</Text>
      </View>
      <View>
        <Text style={styles.dummyText}>Lorem ipsum dolor sit amet</Text>
        <Text style={styles.dummyText}>consectur adipiscing tempor incididunt.</Text>
      </View>
      <View style={styles.inputContainer}>
        
        <TouchableOpacity  style={styles.countryCodeBtn}
        onPress={()=> setVisibleCountry(!visibleCountry)}
        >

          <CountryPicker
            {...{
              countryCode,
              withFilter,
              withFlag,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
              onSelect,
            }}
            onClose={()=>setVisibleCountry(!visibleCountry)}
             withFlagButton={false}
            visible={visibleCountry}
          />
          <Text style={styles.countryCodeText}>+{country?.callingCode || 92}</Text>
          <AntDesign name='down' color={'#D84327'} size={10} />
        </TouchableOpacity>

        <TextInput style={styles.inputStyle} placeholder='Phone No' />
      </View >

      <View style={styles.optContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {
            otpInput.map((data, index) => (
              <TextInput style={styles.optInputStyle} placeholder={data.value.toString()} placeholderTextColor={'#000000'} key={index} />

            ))
          }


        </View>
        <View style={styles.resendOtpContainer}>
          <Text style={styles.resendTextStyle}>
            Resend OTP
          </Text>
          <AntDesign name='right' style={styles.downIconStyle} />
        </View>
      </View>

      <TouchableOpacity style={styles.loginBtnStyle} onPress={()=>navigation.replace('HomeScreen')} >
        <Text style={styles.loginTextStyle}>SignUp</Text>
      </TouchableOpacity>

      <View >
        <Text style={styles.orTextStyle}>or</Text>
        <Text style={styles.continueTextStyle}>Continue With</Text>
        <View style={styles.iconsContainer}>
          {
            loginOptions.map((data, index) => (
                <TouchableOpacity  key={index}>

                    <Image source={data.url} style={styles.loginOptionStyle}/>
                </TouchableOpacity>

            ))
          }

        </View>
      </View>
      <TouchableOpacity>

        <Text style={styles.orTextStyle}>Don’t have an account? Login </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  imgStyle: {
    marginTop: verticalScale(90),
    width: verticalScale(137),
    height: scale(137),
    backgroundColor: '#D84327',
  },
  headingStyle: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center'
  },
  headingContainer: {
    width: scale(150),
    height: scale(40),
    marginTop: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(12)
  },
  dummyText: {
    textAlign: 'center',
    fontWeight: '300',
    color: '#646565',
    fontSize: scale(10),
    lineHeight: scale(14),
    // fontFamily:'Poppins-Bold',
  },
  inputStyle: {
    // backgroundColor: 'lightgreen',
    width: scale(204),
    fontSize: scale(10),
    color: '#646565',
    paddingLeft: scale(9)
  },
  inputContainer: {
    flexDirection: 'row',
    width: scale(242),
    marginTop: scale(20),
    borderWidth: 1,
    borderRadius: 5,
    height: scale(32),
    // backgroundColor:'lightblue',
    overflow: 'hidden'
  },
  dropdownStyle: {
    fontSize: scale(10),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scale(4),
    paddingLeft: scale(8),
    paddingRight: scale(2),
    width: scale(38),
    color: '#D84327',
    borderWidth: 0,
  },
  optContainer: {
    marginTop: scale(24),
    width: scale(242),
    height: scale(53),
    padding: 0,


  },
  optInputStyle: {
    backgroundColor: '#E5E5E5',
    height: scale(33),
    width: scale(33),
    color: '#000000',
    textAlign: 'center',
    fontSize: scale(17),
    justifyContent: 'center',
    textAlignVertical: 'center',
    // paddingTop:scale(6),
    paddingBottom: scale(4),
  },
  downIconStyle: {
    alignSelf: 'center',
    marginLeft: scale(8),
    color: '#D84327',
    fontSize: scale(10),
  },
  resendOtpContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  resendTextStyle: {
    color: '#D84327',
    fontSize: scale(10),
    fontWeight: '500',

  },
  loginBtnStyle: {
    width: scale(242),
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(10),
    backgroundColor: '#D84327',
    borderRadius: scale(31),
    marginBottom: scale(11),
  },
  loginTextStyle: {
    color: '#FFFFFF',
    fontWeight: '300',
    fontSize: scale(12),
  },
  orTextStyle: {
    textAlign: 'center',
    fontSize: scale(10),
    fontWeight: '300',
    color: '#383838'
  },
  continueTextStyle: {
    textAlign: 'center',
    fontSize: scale(11),
    fontWeight: '400',
    color: '#000000',
    marginTop: scale(2.5),
    marginBottom: scale(11)
  },
  iconsContainer: {
    flexDirection: 'row',
    width: scale(109),
    height: scale(20.5),
    justifyContent: 'space-between',
    marginBottom: scale(13),
  },
  loginOptionStyle: {
    resizeMode: 'cover',
    width: scale(20.5),
    height: scale(20.5),
  },
  countryCodeBtn:{
    flexDirection:'row',
    alignItems:'center',
    width:scale(40),
    justifyContent:'space-between',
    paddingLeft:scale(9),
    marginRight:scale(3),
  },
  countryCodeText:{
    color:'#D84327',
    fontWeight:'500',
    fontSize:scale(10)
  }

})