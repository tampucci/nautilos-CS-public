import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SelectElement from '../components/SelectElement';
import DateInput from './../components/DateInput';
import AddImageComponent from '../components/AddImageComponent';
import CoordinateInput from '../components/CoordinateInput';
import AddReport from '../hooks/AddReport';
import { Context as AddDataContext } from '../context/AddDataContext'

const ImageAnnotationScreen = ({ route, navigation }) => {

    const [species, setSpecies] = useState('')
    const [quantity, setQuantity] = useState('')
    const [date, setDate] = useState(new Date())
    const [location, setLocation] = useState('')
    const [depth, setDepth] = useState('')
    const [seaLevel, setSeaLevel] = useState('')
    const [bottomType, setBottomType] = useState('')
    const [weather, setWeather] = useState('')
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [, , , addImageAnnotationApi] = new AddReport

    const [latitude, setLatitude] = useState(route.params.latitude)
    const [longitude, setLongitude] = useState(route.params.longitude)

    const { state, addResponse, addNavigateBack } = useContext(AddDataContext)

    useEffect(() => {
        addNavigateBack('ImageAnnotation')
        addResponse({ message: '', report_n: state.report_n })
        setLatitude(route.params.latitude)
        setLongitude(route.params.longitude)
    }, [route])

    return (
        <ScrollView>
            <Text style={styles.title}>Image Annotation</Text>
            {errorMsg !== '' ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
            <AddImageComponent route={route} navigation={navigation} type={'mandatory'} latitude={latitude} longitude={longitude} />
            <TextInput
                style={styles.mandatoryInput}
                onChangeText={setSpecies}
                placeholder="Species/taxom name*"
                placeholderTextColor="#667"
            />
            <TextInput
                style={styles.mandatoryInput}
                onChangeText={setQuantity}
                placeholder="Quantity*"
                placeholderTextColor="#667"
                keyboardType="numeric"
            />
            <DateInput type={'mandatory'} callback={(element) => setDate(element)} />
            <CoordinateInput
                latitude={latitude}
                longitude={longitude}
                setLatitude={(element) => setLatitude(element)}
                setLongitude={(element) => setLongitude(element)}
                navigation={navigation}
            />
            <TextInput
                style={styles.input}
                onChangeText={setLocation}
                placeholder="Location name"
                placeholderTextColor="#667"
            />
            <TextInput
                style={styles.input}
                onChangeText={setDepth}
                placeholder="Depth"
                placeholderTextColor="#667"
                keyboardType="numeric"
            />
            <SelectElement
                data={state.selects_values.sea_levels}
                placeholder={'Sea level'}
                callback={(element) => { setSeaLevel(element) }}
            />
            <SelectElement
                data={state.selects_values.sea_bottom_types}
                placeholder={'Sea bottom type'}
                callback={(element) => { setBottomType(element) }}
            />
            <SelectElement
                data={state.selects_values.weather_types}
                placeholder={'Adverse weather condition'}
                callback={(element) => { setWeather(element) }}
            />
            <TouchableOpacity style={styles.button} onPress={async () => {
                if (state.image.uri !== '' && species !== '' && quantity !== '' && date !== null && latitude !== '' && longitude !== '') {
                    setIsLoading(true);
                    await addImageAnnotationApi(navigation, species, quantity.trim(), date, latitude, longitude, location, depth.trim(), seaLevel, bottomType, weather, state.image.base64, state.username, state.authkey, setErrorMsg, setIsLoading)
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
                    <Text style={styles.frontText}>Sending report</Text>
                </View>
            }
        </ScrollView>
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
    container: {
        flexDirection: 'row'
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
    image: {
        alignSelf: 'center',
        marginTop: 5,
        height: 60,
        width: 60,
    },
    imageContainer: {
        alignSelf: 'center',
        flexDirection: 'column',
        width: 75,
        height: 75,
        borderColor: 'black',
        borderWidth: 0.3
    },
    imageIcon: {
        alignSelf: 'center',
        marginTop: 5
    },
    input: {
        borderColor: 'grey',
        borderWidth: 0.5,
        fontSize: 18,
        width: '70%',
        backgroundColor: 'white',
        textAlign: "center",
        alignSelf: "center",
        marginVertical: 5
    },
    mandatoryInput: {
        borderColor: 'red',
        borderWidth: 0.5,
        fontSize: 18,
        width: "70%",
        backgroundColor: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        color: 'black',
        marginVertical: 5
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 5
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 7,
    },
})

export default ImageAnnotationScreen