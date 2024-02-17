import { Dimensions, StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


const Profile = () => {
    const [dateOpen, setDateOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [DateInputValue, setDateInputValue] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Pakistan', value: 'Pakistan' },
        { label: 'India', value: 'India' },
        { label: 'Uk', value: 'Uk' },
        { label: 'China', value: 'China' },
    ]);
    const [formData, setFormData] = useState([
        {
            categoryName: 'Profile',
            catogoryValue: 'Full Name',
            dropdown: false
        },
        {
            categoryName: 'Date of Birth',
            catogoryValue: date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
            dropdown: false
        },
        {
            categoryName: 'Gmail',
            catogoryValue: 'example123@gmail.com',
            dropdown: false
        },
        {
            categoryName: 'Country',
            catogoryValue: 'Pakistan',
            dropdown: true,
            dropdownData: [
                { label: 'Pakistan', value: 'Pakistan' },
                { label: 'India', value: 'India' },
                { label: 'Uk', value: 'Uk' },
                { label: 'China', value: 'China' },
            ]
        },
        {
            categoryName: 'City',
            catogoryValue: 'Faislabad ',
            dropdown: true,
            dropdownData: [
                { label: 'Vehari', value: 'Vehari' },
                { label: 'Burewala', value: 'Burewala' },
                { label: 'Karachi', value: 'Karachi' },
                { label: 'Multan', value: 'Multan' },
            ]
        },
        {
            categoryName: 'Profession',
            catogoryValue: 'Kitchen Expert',
            dropdown: false
        },
        {
            categoryName: 'Food Preferences ',
            catogoryValue: 'Meal type',
            dropdown: false,

            dropdownData: [
                { label: 'Biryani', value: 'Biryani' },
                { label: 'Chicken', value: 'Chicken' },

            ]
        },


    ])
    const handleDateChange = (selectedDate) => {
        setDateInputValue(formatDate(selectedDate)); // Format the selected date
        setDate(selectedDate);
        setDateOpen(false);
    };
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };

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

            <Image source={require('../assets/profile-pic.png')} style={styles.profilepic} />
            <Text style={styles.profilename}>Edit Profile Picture</Text>




            <View style={{ marginBottom: scale(330) }}>
                <FlatList
                    scrollEnabled
                    data={formData}
                    keyExtractor={(data, index) => index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        item?.dropdown ?
                            <View style={{
                                width: moderateScale(329),
                                alignSelf: 'center'
                            }}>
                                <Text style={[styles.fullName]}>{item?.categoryName}</Text>
                                <DropDownPicker
                                    placeholder={item?.catogoryValue}
                                    open={open}
                                    value={value}
                                    items={item?.dropdownData}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                    closeAfterSelecting={true}
                                    style={{
                                        width: moderateScale(329),
                                        alignSelf: 'center',
                                        borderWidth: 0,
                                        borderBottomWidth: 1,
                                        margin: 0,
                                        paddingTop: 28
                                    }}
                                    dropDownContainerStyle={{
                                        width: moderateScale(329),
                                        backgroundColor: 'white',
                                    }}


                                    placeholderStyle={{
                                        color: "#0B0B0B",
                                        fontWeight: "500",
                                        fontSize: 12
                                    }}
                                    textStyle={{
                                        color: "#0B0B0B",
                                        fontWeight: "500",
                                        fontSize: 12
                                    }}

                                />
                            </View>
                            : item?.categoryName === 'Date of Birth' ? <View>

                                <Text style={styles.fullName}>{item?.categoryName}</Text>
                                <TouchableOpacity
                                    onPress={() => setDateOpen(true)}
                                >

                                    <TextInput
                                        value={DateInputValue}
                                        placeholder='17-02-2024'
                                        editable={false}
                                        style={styles.nameInput}
                                        onFocus={() => setDateOpen(true)}
                                        placeholderTextColor={'black'}

                                    />
                                    <FontAwesome5
                                        name='calendar-alt'
                                        style={{
                                            position: 'absolute',
                                            right: moderateScale(22),
                                            top: verticalScale(10),
                                        }}
size={18}
                                    />
                                </TouchableOpacity>
                            </View>
                                : <View>

                                    <Text style={styles.fullName}>{item?.categoryName}</Text>


                                    <TextInput value={item?.catogoryValue} style={styles.nameInput} />

                                </View>
                    )}
                />
            </View>
            <TouchableOpacity style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
            {dateOpen && (
                <DatePicker
                    modal
                    open={dateOpen}
                    date={date}
                    onConfirm={handleDateChange}
                    mode='date'
                    onCancel={() => setDateOpen(false)}
                />
            )}
           

        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    pageTitle: {
        fontSize: scale(15),
        fontWeight: '600',
        color: '#0B0B0B',

    },
    pageTitleContainer: {
        height: scale(60),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#C9C9C9',
        borderBottomWidth: scale(1),
        width,
        marginBottom: scale(24),
    },
    profilepic: {
        height: scale(68.5),
        width: scale(68.5),
        marginTop: 0,
        marginBottom: scale(13.5),
    },
    profilename: {
        marginTop: 0,
        color: '#D84327',
        fontWeight: '500',
        fontSize: scale(12),
        marginBottom: scale(13.5),
        marginBottom: scale(13.5),
    },
    fullName: {
        color: '#919191',
        fontWeight: '300',
        fontSize: scale(10),
        // position: 'absolute',
        marginLeft: scale(5),
        marginBottom: verticalScale(-2),
        width: scale(289),
        marginTop: scale(19),

    },
    nameInput: {
        color: '#0B0B0B',
        fontSize: scale(12),
        fontWeight: '500',
        width: scale(294),
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 0,
        height: scale(22),
        marginTop: scale(9),
    },
    saveBtn: {
        backgroundColor: '#D84327',
        position: 'absolute',
        bottom: scale(89),
        height: scale(40),
        width: scale(265),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: scale(18)
    },
    saveBtnText: {
        color: '#FFFFFF',
        fontSize: scale(12),
        fontWeight: '300',

    }
})