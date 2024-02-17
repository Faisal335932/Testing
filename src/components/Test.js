import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5' // Assuming you are using Expo for vector icons
import DatePicker from 'react-native-date-picker';

const YourComponent = ({ item }) => {
    const [dateOpen, setDateOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [DateInputValue, setDateInputValue] = useState('');



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
            <Text style={styles.fullName}>{item?.categoryName}</Text>
            <TouchableOpacity
                onPress={() => setDateOpen(true)}
            >

                <TextInput
                    value={DateInputValue}
                    // placeholder={formatDate(DateInputValue)}
                    editable={false}
                    style={styles.nameInput}
                    onFocus={() => setDateOpen(true)}

                />
                <FontAwesome5
                    name='calendar-alt'
                    style={{
                        position: 'absolute',
                        right: moderateScale(22),
                        top: verticalScale(15),
                    }}

                />
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullName: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black'
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameInput: {
        width: Dimensions.get('screen').width * .8,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    calendarIcon: {
        position: 'absolute',
        right: 10,
    },
});

export default YourComponent;
