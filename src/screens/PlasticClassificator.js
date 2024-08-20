import React, { useState, useEffect, useContext } from 'react'
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { Context as AddDataContext } from '../context/AddDataContext'
import QueryPlasticRecognitonContainer from '../hooks/QueryPlasticRecognitonContainer'
import DateInput from './../components/DateInput';
import AddImageComponent from '../components/AddImageComponent';
import CoordinateInput from '../components/CoordinateInput';


const PlasticClassificatorScreen = ({route, navigation}) => {

    const [latitude, setLatitude] = useState(route.params.latitude)
    const [longitude, setLongitude] = useState(route.params.longitude)
    const [date, setDate] = useState(new Date())
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const [queryPlasticClassificator] = new QueryPlasticRecognitonContainer

    const { state, addResponse, addNavigateBack } = useContext(AddDataContext)

    useEffect(() => {
        addNavigateBack('PlasticClassificator')
        addResponse({ message: '', report_n: state.report_n })
        setLatitude(route.params.latitude)
        setLongitude(route.params.longitude)
    }, [route])


    return(
        <View>
            <Text style={styles.title}>Image Annotation</Text>
            {errorMsg !== '' ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
            <AddImageComponent route={route} navigation={navigation} type={'mandatory'} latitude={latitude} longitude={longitude} />
            <DateInput type={'mandatory'} callback={(element) => setDate(element)} />
            <CoordinateInput
                latitude={latitude}
                longitude={longitude}
                setLatitude={(element) => setLatitude(element)}
                setLongitude={(element) => setLongitude(element)}
                navigation={navigation}
            />
            <TouchableOpacity style={styles.button} onPress={async () => {
                if (state.image.uri !== '' && date !== null && latitude !== '' && longitude !== '') {
                    setIsLoading(true);
                    await queryPlasticClassificator(navigation, state.image.base64, setErrorMsg, setIsLoading)
                } else {
                    setErrorMsg('You should fill all mandatory fields')
                }
            }}>
                <Text style={styles.buttonText}>
                    Send data
                </Text>
            </TouchableOpacity>
            
            {isLoading &&
                <View style={styles.frontView}>
                    <ActivityIndicator size="large" color="black" style={styles.frontSpinner} />
                    <Text style={styles.frontText}>Analysing image</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 30,
        width: 150,
        borderRadius: 5,
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: 'green',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    errorMsg: {
        color: 'red',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 18
    },
    frontSpinner: {
        alignSelf: 'center'
    },
    frontText: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        fontSize: 25
    },
    frontView: {
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 999,
        flexDirection: 'row',
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 7,
    },
})

export default PlasticClassificatorScreen