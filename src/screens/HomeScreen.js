import React, { useState, useEffect, useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import InsertButton from '../components/InsertButton'
import * as Location from 'expo-location'
import { Context as AddDataContext } from '../context/AddDataContext'
import { Context as ReportContext } from '../context/ReportContext'
import GetReports from '../hooks/GetReports';

const HomeScreen = ({ route, navigation }) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [reportNumber, setReportNumber] = useState(route.params.report_n);
    const { state: reportState } = new useContext(ReportContext)
    const { state, addUsername, reset } = new useContext(AddDataContext);
    const [getPlastics, getDiverCampaigns, getImageAnnotations, getAlgalBlooms] = new GetReports();
    const username = state.username
    const message = route.params.response

    useEffect(() => {
        (async () => {
            let locationStatus = await Location.requestForegroundPermissionsAsync();
            if (locationStatus.status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }9
            setLocation(await Location.getCurrentPositionAsync({}))
            /*await Location.getCurrentPositionAsync({}).then((location) => {
                setLocation(location)
            })*/

            await getPlastics(username)
            await getDiverCampaigns(username)
            await getImageAnnotations(username)
            await getAlgalBlooms(username)
            //setLocation(locationTmp);
            setReportNumber(reportState.sentReport)            
        })();
    }, [state.report_n]);

    let text = 'Waiting for coordinates...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = "";
    }

    return (
        <View>
            <Text style={styles.username}>User id: {username}</Text>
            {reportNumber === -1 ? <Text style={styles.reportNumber}>Shared report: loading</Text> : <Text style={styles.reportNumber}>Shared report: {reportNumber}</Text>}
            <Image source={require('../../assets/Nautilos.png')} style={styles.centeredLogo} />
            {message != '' ? <Text style={styles.message}>{message}</Text> : null}
            {location ? <Text style={styles.paragraph}>Coordinate: {location.coords.latitude}, {location.coords.longitude}</Text> : <Text style={styles.paragraph}>{text}</Text>}
            <InsertButton
                name={"Plastic Campaigns"}
                navigateTo={"Campaigns"}
                navigation={navigation}
            />
            <InsertButton
                name={"Diver Campaings"}
                navigateTo={"Diver"}
                navigation={navigation}
            />
            <InsertButton
                name={"Image Annotation"}
                navigateTo={"ImageAnnotation"}
                navigation={navigation}
            />
            <InsertButton
                name={"Algal Bloom"}
                navigateTo={"Algalbloom"}
                navigation={navigation}
            />
            <InsertButton
                name={"View Map"}
                navigateTo={"Map"}
                navigation={navigation}
            />
            <TouchableOpacity style={styles.button} onPress={() => {
                addUsername('');
                reset();
                navigation.navigate('Login')
            }}>
                <Text style={styles.buttonText}>{'Log out'}</Text>
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
    centeredLogo: {
        width: 300,
        height: 50,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 5
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10
    },
    reportNumber: {
        marginTop: 5,
        marginRight: 10,
        textAlign: 'right',
        fontSize: 14,
        fontWeight: 'bold'
    },
    username: {
        marginTop: 20,
        marginRight: 10,
        textAlign: 'right',
        fontSize: 14,
        fontWeight: 'bold'
    }
})

export default HomeScreen