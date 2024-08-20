import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location'

const InsertButton = ({ name, navigateTo, navigation}) => {

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => {
                (async () => {
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        setErrorMsg('Permission to access location was denied');
                        return;
                    }

                    let location = await Location.getCurrentPositionAsync({});
                    navigation.navigate(navigateTo, { latitude: location.coords.latitude, longitude: location.coords.longitude })
                })();
            }}>
                <Text style={styles.buttonText}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 200,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 15,
        backgroundColor: 'green'
    },
    buttonText: {
        fontSize: 23,
        marginTop: 3,
        color: 'white',
        textAlign: 'center'
    }
})

export default InsertButton