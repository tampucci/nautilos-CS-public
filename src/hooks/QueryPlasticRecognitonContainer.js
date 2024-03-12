import React, { useState, useContext } from 'react';
import axios from 'axios'
import { Context as AddDataContext } from '../context/AddDataContext'
import qs from 'qs';

export default () => {
    const { state, addResponse, addImage, appendPlasticCampaign } = useContext(AddDataContext)

    const [errorMessage, setErrorMessage] = useState('')

//(navigation, date, latitude, longitude, image, username, authkey, setErrorMsg, setIsLoading)

    const queryPlasticClassificator = async (navigation, image, setErrorMsg, setIsLoading) => {
        try {
            console.log(image)
            if (image != '') {
                console.log('Query start')
                //Substitute all + occurencies in the string
                await axios({
                    method: 'post',
                    url: 'https://nautilos-dckr.isti.cnr.it/queryPlasticClassificator.php',
                    data: qs.stringify({
                        image:image
                    })
                }).then((response) => {
                    console.log(response.data.result)
                    /*if (response.data.status != 'success') {
                        setIsLoading(false)
                        setErrorMsg("Image not added")
                    }*/
                    navigation.navigate('Home', { response: 'Classificator successfully queried' })
                })
                console.log('Query end')
            } else {
                console.log("I'm out")
            }
        } catch (e) {
            setErrorMessage('Error meanwhile communicating with server')
        } 
    }

    return [queryPlasticClassificator, errorMessage]

}