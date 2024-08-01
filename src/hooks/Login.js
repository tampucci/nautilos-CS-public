import React, { useState, useContext } from 'react';
import axios from 'axios'
import { Context as AddDataContext } from '../context/AddDataContext'
import qs from 'qs';

export default () => {
    const { addLoginData } = useContext(AddDataContext)

    const [errorMessage, setErrorMessage] = useState('')
    var resultJson;

    const loginApi = async (username, password) => {
        
        try {
            let connection = axios.create({
                baseURL: 'https://nautilos-app.isti.cnr.it'
            }) 

            await connection.post('/csOpLogin.php', qs.stringify({
                username: username,
                password: password
            })).then((response) => {
                resultJson = response.data
                if (response.data.login==='success') {
                    addLoginData(resultJson)
                } else {
                    setErrorMessage('Invalid username or password')
                }
            }, (error) => {
                setErrorMessage(error);
                if (error.response) {
                    console.log('Error response:')
                    console.log(error.response)
                    console.log(' ')
                } else if (error.request) {
                    console.log('Error request:')
                    console.log(error.request)
                    console.log(' ')
                } else if (error.message) {
                    console.log('Error message:')
                    console.log(error.message)
                    console.log(' ')
                }
            });
        } catch (e) {
            setErrorMessage('Error meanwhile communicating with server')
        }
    }

    return [loginApi, errorMessage]

}