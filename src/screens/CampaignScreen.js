import React, { useState, useEffect, useContext } from 'react'
import SelectElement from '../components/SelectElement';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Context as AddDataContext } from '../context/AddDataContext'

const CampaignScreen = ({ route, navigation }) => {
    const { state } = useContext(AddDataContext)

    const [campaign, setCampaign] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const latitude = route.params.latitude
    const longitude = route.params.longitude

    let plastic_campaigns = []
    state.plastic_campaigns.forEach(element => plastic_campaigns.push(element.plastic_campaign))



    useEffect(() => {
        (async () => {
            let locationStatus = await Location.requestForegroundPermissionsAsync();
            if (locationStatus.status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let locationTmp = await Location.getCurrentPositionAsync({});
            setLocation(locationTmp);
        })
    }, []);

    return (
        <View>
            <Text style={styles.title}>Plastic Campaign</Text>
            {errorMsg !== '' ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
            <SelectElement
                data={plastic_campaigns}
                placeholder={'Select campaign'}
                callback={(element) => { setCampaign(element) }}
            />
            <TouchableOpacity style={styles.button} onPress={async () => {
                if (campaign !== '') {
                    navigation.navigate('Plastics', { campaign: campaign })
                } else {
                    setErrorMsg('You should select a plastic campaign')
                }
            }}>
                <Text style={styles.buttonText}>Select Campaign</Text>
            </TouchableOpacity>
            {state.id_group == 1 ?
                <TouchableOpacity style={styles.button}
                    onPress={async () => {
                        navigation.navigate('AddPlasticCampaign', { latitude: latitude, longitude: longitude })
                    }
                    }>
                    <Text style={styles.buttonText}>Add Campaign</Text>
                </TouchableOpacity>
                : null}
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
        backgroundColor: 'green'
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 7,
        marginTop: 175
    },
})

export default CampaignScreen