import React, { useContext, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Context as AddDataContext } from '../context/AddDataContext'

const PickCoordinatesScreen = ({ route, navigation }) => {

    const mapRegion = {
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
    };

    const { state } = useContext(AddDataContext)

    const [latitude, setLatitude] = useState(route.params.latitude)
    const [longitude, setLongitude] = useState(route.params.longitude)

    return (
        <View>
            <MapView style={styles.map} region={mapRegion}
                onPress={(event) => {
                    setLatitude(Math.trunc(event.nativeEvent.coordinate.latitude* 1E7) / 1E7)
                    setLongitude(Math.trunc(event.nativeEvent.coordinate.longitude* 1E7) / 1E7)
                }}
            >
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={'Your position'}
                    description={`${latitude}, ${longitude}`} pinColor='red'
                />
            </MapView>
            <Text style={styles.coordinateText}>Latitude: {latitude}</Text>
            <Text style={styles.coordinateText}>Longitude: {longitude}</Text>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate(state.navigateBack, { latitude: latitude, longitude: longitude })
            }}>
                <Text style={styles.buttonText}>Pick coords</Text>
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
        fontSize: 24,
        color: 'white',
        textAlign: 'center'
    },
    coordinateText: {
        fontSize: 16,
        marginLeft: 5
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height-200,
        marginBottom: 10
    }
})

export default PickCoordinatesScreen