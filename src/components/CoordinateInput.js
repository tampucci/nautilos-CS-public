import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const CoordinateInput = ({ latitude, longitude, setLatitude, setLongitude, navigation }) => {
    
    return (
        <View>
            <Text style={styles.title}>Coordinates:</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.mandatoryInput}
                    onChangeText={setLatitude}
                    placeholder="Latitude"
                    placeholderTextColor="#667"
                    keyboardType="numeric"
                    value={latitude.toString()}
                />
                <TextInput
                    style={styles.mandatoryInput}
                    onChangeText={setLongitude}
                    placeholder="Longitude"
                    placeholderTextColor="#667"
                    keyboardType="numeric"
                    value={longitude.toString()}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={ () => {
                navigation.navigate('PickCoordinates', { latitude: latitude, longitude: longitude })
            }}>
                <Text style={styles.buttonText}>Pick coordinates</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 30,
        width: 150,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 5,
        backgroundColor: 'green'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    coordinateView: {
        marginHorizontal: 10,
        borderColor: 'red',
        borderWidth: 0.3
    },
    container: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    mandatoryInput: {
        borderColor: 'red',
        borderWidth: 0.5,
        fontSize: 18,
        width: "35%",
        backgroundColor: 'white',
        textAlign: 'center',
        marginHorizontal: 5,
        justifyContent: 'space-between',
        /*alignSelf: 'center',*/
        color: 'black',
        marginVertical: 5
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default CoordinateInput