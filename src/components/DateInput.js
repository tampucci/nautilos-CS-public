import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

const DateInput = ({ type, callback }) => {

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)
        callback(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={type === 'mandatory' ? styles.mandatoryInput : styles.input}
                editable={false}
                value={date.toISOString().slice(0, 10)}
                placeholder="Date*"
                placeholderTextColor="#667"
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={showDatepicker} style={styles.calendarIcon}>
                <FontAwesome name="calendar" size={24} color="black" />
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    calendarIcon: {
        flex: 0.2,
        marginTop: 5
    },
    container: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    input: {
        borderColor: 'black',
        borderWidth: 0.5,
        fontSize: 18,
        width: '60%',
        marginRight: 10,
        backgroundColor: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        color: 'black',
        marginVertical: 5
    },
    mandatoryInput: {
        borderColor: 'red',
        borderWidth: 0.5,
        fontSize: 18,
        width: '60%',
        marginRight: 10,
        backgroundColor: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        color: 'black',
        marginVertical: 5
    }
})

export default DateInput