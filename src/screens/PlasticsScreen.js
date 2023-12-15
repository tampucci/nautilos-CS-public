import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AddImageComponent from '../components/AddImageComponent';
import AddReport from '../hooks/AddReport';
import { Context as AddDataContext } from '../context/AddDataContext'
import DecreaseIncreaseComponent from '../components/DecreaseIncreaseComponent';

const PlasticsScreen = ({ route, navigation }) => {

    const { state, addResponse, addNavigateBack } = useContext(AddDataContext)

    let sum = 0;
    let plastic_types = []
    let j_codes = []
    state.selects_values.plastic_types.forEach(element => {
        plastic_types.push(element.plasticType)
        j_codes.push(element.jCode)
    })

    const campaignName = route.params.campaign
    const surveyCode = state.plastic_campaigns[state.plastic_campaigns.findIndex(item => item.plastic_campaign == campaignName)].campaign_id
    const [plasticQuantity, setPlasticQuantity] = useState(Array(plastic_types.length).fill(0))

    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [, addPlasticApi] = new AddReport

    useEffect(() => {
        addNavigateBack('Plastics')
        addResponse({ message: '', report_n: state.report_n })
    }, [])

    return (
        <ScrollView>
            <Text style={styles.title}>Plastics</Text>
            {errorMsg !== '' ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
            <Text style={styles.simpleText}>Campaign id: {campaignName}</Text>
            <View style={styles.border}>
                {plastic_types.map((type, i) => {
                    return (
                        <DecreaseIncreaseComponent
                            element={type}
                            index={i}
                            values={plasticQuantity}
                            callback={(element) => { setPlasticQuantity(element) }}
                            backgroundColor={i % 2 != 0 ? 'classic' : 'white'}
                        />
                    )
                })}
            </View>

            <AddImageComponent navigation={navigation} route={route} campaign={campaignName} />

            <TouchableOpacity style={styles.button} onPress={async () => {
                sum = plasticQuantity.reduce((partialSum, a) => partialSum + a, 0);
                if (sum > 0) {
                    setIsLoading(true);
                    await addPlasticApi(navigation, state.username, state.authkey, campaignName, plastic_types, plasticQuantity, surveyCode, j_codes, state.image.base64, setErrorMsg, setIsLoading)
                    addResponse({ message: 'Report successfully added', report_n: state.report_n + 1 })
                    navigation.navigate("Home", { response: "Report successfully added" })
                } else {
                    setErrorMsg('At least one value should greater than 0')
                }
            }}>
                <Text style={styles.buttonText}>Send data</Text>
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

    /*quantityButtonContainer: {
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 1,
        alignSelf: 'flex-end'
    },
    quantityButton: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: 'green'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 2,
        borderColor: 'black',
        borderWidth: 1
    },
    quantityText: {
        paddingHorizontal: 10,
        marginVertical: 5
    },*/

    border: {
        borderColor: 'black',
        marginHorizontal: 5,
        paddingVertical: 3,
        borderWidth: 0.3
    },
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
    simpleText: {
        marginBottom: 5,
        marginLeft: 5
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 7,
    },
})

export default PlasticsScreen