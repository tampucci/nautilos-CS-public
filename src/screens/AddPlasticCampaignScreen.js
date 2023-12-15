import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Checkbox from 'expo-checkbox';
import SelectElement from '../components/SelectElement';
import DateInput from '../components/DateInput';
import CoordinateInput from '../components/CoordinateInput';
import AddReport from '../hooks/AddReport';
import { Context as AddDataContext } from '../context/AddDataContext'
import { Feather } from '@expo/vector-icons';
import { A } from '@expo/html-elements';

const AddPlasticCampaignScreen = ({ route, navigation }) => {

    const [campaignName, setCamapaignName] = useState('')
    const [date, setDate] = useState(new Date())
    const [location, setLocation] = useState('')
    const [contributor, setContributor] = useState('')
    const [beach, setBeach] = useState('')
    const [beachCode, setBeachCode] = useState('')
    const [beachAmendment, setAmendment] = useState(false)
    const [surveyedWidth, setSurveyedWidth] = useState('')
    const [surveyedLength, setSurveyedLength] = useState('')
    const [surrounding, setSurrounding] = useState('')
    const [sediment, setSediment] = useState('')
    const [weather, setWeather] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [viewAmendmentModal, setViewAmendmentModal] = useState('false')
    const [viewBeachCodeModal, setViewBeachCodeModal] = useState('false')
    const [addPlasticCampaignApi] = new AddReport

    const { state, addResponse, addNavigateBack } = useContext(AddDataContext)

    const [latitude, setLatitude] = useState(route.params.latitude)
    const [longitude, setLongitude] = useState(route.params.longitude)

    useEffect(() => {
        addNavigateBack('AddPlasticCampaign')
        addResponse({ message: '', report_n: state.report_n })
        setLatitude(route.params.latitude)
        setLongitude(route.params.longitude)
    }, [route])

    return (
        <ScrollView>
            <Text style={styles.title}>Plastic Campaign</Text>
            {errorMsg !== '' ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
            <TextInput
                style={styles.mandatoryInput}
                onChangeText={setCamapaignName}
                placeholder="Campaign name"
                placeholderTextColor="#667"
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
                onChangeText={setContributor}
                placeholder="Contributor"
                placeholderTextColor="#667"
            />
            <TextInput
                style={styles.input}
                onChangeText={setLocation}
                placeholder="Location name"
                placeholderTextColor="#667"
            />
            <TextInput
                style={styles.mandatoryInput}
                onChangeText={setBeach}
                placeholder="Beach name"
                placeholderTextColor="#667"
            />
            <View style={styles.infoContainer}>
                <TextInput
                    style={styles.shorterInput}
                    onChangeText={setBeachCode}
                    placeholder="Beach code"
                    placeholderTextColor="#667"
                />
                <TouchableOpacity onPress={() => {
                    setViewBeachCodeModal(true)
                }} style={styles.infoTextIcon}>
                    <Feather name="info" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox style={styles.checkbox} value={beachAmendment} onValueChange={setAmendment} />
                <Text style={styles.label}>Beach amendment</Text>
                <TouchableOpacity onPress={() => {
                    setViewAmendmentModal(true)
                }} style={styles.infoCheckIcon}>
                    <Feather name="info" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.mandatoryInput}
                onChangeText={setSurveyedLength}
                placeholder="Length"
                placeholderTextColor="#667"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={setSurveyedWidth}
                placeholder="Width"
                placeholderTextColor="#667"
                keyboardType="numeric"
            />
            <SelectElement
                data={state.selects_values.surrounding_types}
                placeholder={'Surrounding type'}
                callback={(element) => { setSurrounding(element) }}
            />
            <SelectElement
                data={state.selects_values.sediment_types}
                placeholder={'Sediment type'}
                callback={(element) => { setSediment(element) }}
            />
            <SelectElement
                data={state.selects_values.weather_types}
                placeholder={'Adverse weather condition'}
                callback={(element) => { setWeather(element) }}
            />
            <TouchableOpacity style={styles.button} onPress={async () => {
                if (campaignName !== '' && date !== null && latitude !== '' && longitude !== '' && beach !== '' && surveyedLength !== '') {
                    setIsLoading(true);
                    await addPlasticCampaignApi(navigation, campaignName.trim(), date, latitude, longitude, contributor.trim(), location.trim(), beach.trim(), beachCode.trim(), beachAmendment ? 1 : 0, surveyedLength.trim(), surveyedWidth.trim(), surrounding, sediment, weather, state.username, state.edmoCode, state.authkey, setErrorMsg, setIsLoading)
                } else {
                    setErrorMsg('You should fill all mandatory fields')
                }
            }}>
                <Text style={styles.buttonText}>Add campaign</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={viewBeachCodeModal}
                onRequestClose={() => {
                    setViewBeachCodeModal(!viewBeachCodeModal);
                }}>
                <TouchableOpacity onPress={() => setViewBeachCodeModal(!viewBeachCodeModal)} style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Feather name="x" size={24} color="black" style={styles.closeIcon} />

                        <Text style={styles.modalText}>Fill with code that can be found
                            <A href="https://nodc.ogs.it/marinelitter/beachesmap" style={styles.href}><Text> here </Text></A>
                            if it is not available leave the field blank</Text>
                    </View>
                </TouchableOpacity>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={viewAmendmentModal}
                onRequestClose={() => {
                    setViewAmendmentModal(!viewAmendmentModal);
                }}>
                <TouchableOpacity onPress={() => setViewAmendmentModal(!viewAmendmentModal)} style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Feather name="x" size={24} color="black" style={styles.closeIcon} />
                        <Text style={styles.modalText}>Select in case another campaign has been already sent for this beach and, in the meanwhile, some beach information is changed</Text>
                    </View>
                </TouchableOpacity>
            </Modal>

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
        backgroundColor: 'green'
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    checkbox: {
        alignSelf: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    closeIcon: {
        alignSelf: 'flex-end',
        marginTop: 0,
        paddingTop: 0,
        marginBottom: 5
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
    href: {
        color: 'blue',
        textDecorationLine: 'underline'
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
    infoContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    infoCheckIcon: {
        paddingLeft: 5,
        marginTop: 10
    },
    infoTextIcon: {
        paddingLeft: 5,
        marginTop: 6
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
    label: {
        fontSize: 20,
        margin: 8,
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
    modalText: {
        textAlign: 'justify',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 5,
        paddingHorizontal: 15,
        paddingBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 5
    },
    shorterInput: {
        borderColor: 'grey',
        borderWidth: 0.5,
        fontSize: 18,
        width: '62%',
        backgroundColor: 'white',
        textAlign: "center",
        alignSelf: "center",
        marginVertical: 5
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 7,
    },
})

export default AddPlasticCampaignScreen