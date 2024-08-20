import React, { useContext } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Context as ReportContext } from '../context/ReportContext'
//import { WebView } from 'react-native-webview';

const MapScreen = ({ route, navigation }) => {

    const mapRegion = {
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
    };
    const { state } = new useContext(ReportContext);

    //Per i marker recuperati dinamicamente

    //TO ADD IMAGE VIEW add the line below just before </callout>
    //{item.image!='' ? <WebView source={{ html: `<html><body><img src="${item.image}" width="375" /></body></html>` }} style={{ marginTop:5, height: 100, width: 100}} /> : null}

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={mapRegion}>
                <Marker
                    coordinate={{ latitude: route.params.latitude, longitude: route.params.longitude }}
                    title="Your position" pinColor='red'
                />
                {//Marker generator for plastics report

                //TODO adjust Callout size
                state.plastics.map((item, index) => {
                    return (<Marker
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude
                        }}
                        key={index}
                        title={'Plastic report'} 
                        //description={`Campaign ${item.id} on ${item.date}`}
                        pinColor='blue'
                    >
                        <Callout style={styles.callout}>
                            <Text style={styles.mainTitle}>Campaign {item.id.split('_')[0]} on {item.date}</Text>
                            {item.location != '' ? <Text>Location: {item.location}</Text> : null}
                            {item.beach != '' ? <Text>Beach: {item.beach}</Text> : null}
                            <Text style={styles.sectionTitle}>Plastics</Text>
                            {
                                item.plastics.map((item2) => {
                                    return (
                                        <Text>{item2.type}: {item2.quantity}</Text>
                                    )
                                    })
                            }
                            
                        </Callout>
                    </Marker>);
                })}
                {state.diverCampaigns.map((item, index) => {
                    return (<Marker
                        coordinate={{
                            latitude: item[3],
                            longitude: item[4]
                        }}
                        key={index}
                        title={'Diver campaign report'} 
                        description={`Measured ${item[1]} of ${item[0]} on ${item[2]}`}
                        pinColor='yellow'
                    />);
                })}
                {state.imageAnnotations.map((item, index) => {
                    return (<Marker
                        coordinate={{
                            latitude: item[3],
                            longitude: item[4]
                        }}
                        key={index}
                        title={'Image annotation report'} 
                        description={`Identified ${item[1]} of ${item[0]} on ${item[2]}`}
                        pinColor='green'
                    />);
                })}
                {state.algalBlooms.map((item, index) => {
                    return (<Marker
                        coordinate={{
                            latitude: item[3],
                            longitude: item[4]
                        }}
                        key={index}
                        title={'Algal bloom report'} 
                        description={`Identified ${item[1]} of ${item[0]} on ${item[2]}`}
                        pinColor='orange'
                    />);
                })}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 20,
        width: 100,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 5,
        backgroundColor: 'green'
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center'
    },
    callout: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontWeight: 'bold',
    }
})

export default MapScreen