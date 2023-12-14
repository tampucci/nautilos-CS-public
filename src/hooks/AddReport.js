import React, { useState, useContext } from 'react';
import axios from 'axios'
import { Context as AddDataContext } from '../context/AddDataContext'
import qs from 'qs';

export default () => {
    const { state, addResponse, addImage, appendPlasticCampaign } = useContext(AddDataContext)

    const [errorMessage, setErrorMessage] = useState('')

    const addPlasticCampaignApi = async (navigation, name, date, latitude, longitude, contributor, location, beach, beachCode, beachAmendment, length, width, surrounding, sediment, weather, username, originator, authkey, setErrorMsg, setIsLoading) => {
        //TODO: ask for account to add data to erddap dataset
        try {
            await axios({
                method: 'post',
                url: 'https://nautilos-app.isti.cnr.it/addPlasticCampaign.php',
                data: qs.stringify({
                    name: name,
                    date: date.toISOString().slice(0, 10),
                    latitude: latitude,
                    longitude: longitude,
                    location: location,
                    contributor: contributor,
                    beach: beach,
                    beachCode: beachCode,
                    beachAmendment: beachAmendment,
                    width: width,
                    length: length,
                    surrounding: surrounding,
                    sediment: sediment,
                    weather: weather,
                    user: username,
                    originator: originator,
                    authkey: authkey
                })
            }).then((response) => {
                resultJson = response.data
                if (response.data.result === 'success') {
                    appendPlasticCampaign(response.data.plastic_campaign)
                    navigation.navigate('Home', { response: 'Campaign successfully added' })
                } else {
                    setIsLoading(false)
                    setErrorMsg("Campaign not added")
                }
            }, (error) => {
                setIsLoading(false)
                setErrorMsg("Campaign not added");
                if (error.response) {
                    let errorResponse = error.response.data
                    if (errorResponse.split('Query error: ')[1] !== undefined) {
                        errorResponse = errorResponse.split('Query error: ')[1];
                        errorResponse = errorResponse.slice(0, errorResponse.length - 5)
                        if (errorResponse.split('=')[1] !== undefined) {
                            errorResponse = errorResponse.split('=')[1];
                        }
                    }
                    setErrorMsg(errorResponse)
                }
            })
        } catch (e) {
            setErrorMessage('Error meanwhile communicating with server')
        }
    }

    const addPlasticsApi = async (navigation, username, authkey, campaignId, plasticTypes, plasticQuantities, surveyCode, jCodes, image, setErrorMsg, setIsLoading) => {
        let campaign_id = '['
        let plastic_types = '['
        let quantities = '['
        let survey_code = '['
        let j_codes = '['
        let uid = '['
        let firstElement = true

        try {
            if (image != '') {
                //Substitute all + occurencies in the string 
                const searchImage = '\\+';
                const searchImageRegExp = new RegExp(searchImage, 'g'); // Throws SyntaxError
                const replaceImageWith = '%2B';
                image = '"data:image/png;base64,' + image.replace(searchImageRegExp, replaceImageWith) + '"'

                await axios({
                    method: 'post',
                    url: 'https://nautilos-app.isti.cnr.it/addPlasticImage.php',
                    data: qs.stringify({
                        user: username,
                        campaignId: campaignId,
                        image:image,
                        authkey: authkey
                    })
                }).then((response) => {
                    if (response.data.status != 'success') {
                        setIsLoading(false)
                        setErrorMsg("Image not added")
                    }
                })
            }

            //Adds only plastic types greater than zero
            plasticQuantities.forEach((element, index) => {
                if (parseInt(element) > 0) {
                    if (!firstElement) {
                        campaign_id += ','
                        plastic_types += ','
                        quantities += ','
                        survey_code += ','
                        j_codes += ','
                        uid += ','
                    } else {
                        firstElement = false
                    }
                    campaign_id += campaignId
                    plastic_types += plasticTypes[index]
                    quantities += parseInt(element)
                    survey_code += surveyCode
                    j_codes += jCodes[index]
                    uid += username
                }
            });

            campaign_id += ']'
            plastic_types += ']'
            quantities += ']'
            survey_code += ']'
            j_codes += ']'
            uid += ']'

            await axios({
                method: 'post',
                url: 'https://nautilos-app.isti.cnr.it/addPlasticLitter.php',
                data: qs.stringify({
                    user: username,
                    campaignId: campaign_id,
                    plasticTypes: plastic_types,
                    plasticQuantities: quantities,
                    surveyCode: survey_code,
                    jCodes: j_codes,
                    uid: uid,
                    authkey: authkey
                })
            }).then((response) => {
                if (response.data.status === 'success') {
                    addImage({ uri: '', base64: '' })
                    addResponse({ message: 'Report successfully added', report_n: state.report_n + 1 })
                    navigation.navigate('Home', { response: 'Report successfully added' })
                } else {
                    setIsLoading(false)
                    setErrorMsg("Report not sent")
                }
            }, (error) => {
                setIsLoading(false)
                setErrorMsg("Report not sent");
                if (error.response) {
                    //console.log(error.response.data)
                    if (error.response.data.split('Query error: ')[1] !== undefined) {
                        let errorResponse = error.response.data.split('Query error: ')[1];
                        errorResponse = errorResponse.slice(0, errorResponse.length - 5)
                        setErrorMsg(errorResponse)
                    }
                }
            });
        } catch (e) {
            setErrorMessage('Error meanwhile communicating with server')
        }
    }

    const addDiverCampaignApi = async (navigation, parameterType, parameterValue, date, latitude, longitude, location, depth, seaBottom, weather, seaStatus, image, username, setErrorMsg, setIsLoading) => {
        const author = "divercampaign_diV3rpw4"
        try {
            if (image != '') {
                const searchImage = '\\+';
                const searchImageRegExp = new RegExp(searchImage, 'g'); // Throws SyntaxError
                const replaceImageWith = '%2B';
                image = 'data:image/png;base64,' + image.replace(searchImageRegExp, replaceImageWith)
            }
            const search = '\\&'
            const searchRegExp = new RegExp(search, 'g')
            const replaceWith = '%26'

            await axios({
                method: 'post',
                url: 'https://data-nautilos-h2020.eu/erddap/tabledap/diver_campaign.insert?' +
                    'measured_parameter=' + parameterType +
                    '&measured_value=' + parameterValue.replace(searchRegExp, replaceWith) +
                    '&date=' + date.toISOString().slice(0, 19) +
                    '&latitude=' + latitude.toString().replace(searchRegExp, replaceWith) +
                    '&longitude=' + longitude.toString().replace(searchRegExp, replaceWith) +
                    '&location_name=' + location.replace(searchRegExp, replaceWith) +
                    '&depth=' + depth.replace(searchRegExp, replaceWith) +
                    '&sea_bottom_type=' + seaBottom +
                    '&weather_type=' + weather +
                    '&sea_status=' + seaStatus +
                    '&image=' + image +
                    '&user=' + username +
                    '&author=' + author
            }).then((response) => {
                if (response.data.status === 'success') {
                    addImage({ uri: '', base64: '' })
                    addResponse({ message: 'Report successfully added', report_n: state.report_n + 1 })
                    navigation.navigate('Home', { response: 'Report successfully added' })
                } else {
                    setIsLoading(false)
                    setErrorMsg("Report not sent")
                }
            }, (error) => {
                setIsLoading(false)
                setErrorMsg("Report not sent");
                if (error.response) {
                    if (error.response.data.split('Query error: ')[1] !== undefined) {
                        let errorResponse = error.response.data.split('Query error: ')[1];
                        errorResponse = errorResponse.slice(0, errorResponse.length - 5)
                        if (errorResponse.split('=')[1] !== undefined) {
                            errorResponse = errorResponse.split('=')[1];
                        }
                        setErrorMsg(errorResponse)
                    }
                }
            });
        } catch (e) {
            setErrorMessage('Error meanwhile communicating with server')
        }
    }

    const addImageAnnotationApi = async (navigation, species, quantity, date, latitude, longitude, location, depth, seaLevel, seaBottom, weather, image, username, setErrorMsg, setIsLoading) => {
        const author = "imageannotation_iM4GEpw4"
        try {
            if (image != '') {
                const searchImage = '\\+';
                const searchImageRegExp = new RegExp(searchImage, 'g'); // Throws SyntaxError
                const replaceImageWith = '%2B';
                image = 'data:image/png;base64,' + image.replace(searchImageRegExp, replaceImageWith)
            }
            const search = '\\&'
            const searchRegExp = new RegExp(search, 'g')
            const replaceWith = '%26'

            await axios({
                method: 'post',
                url: 'https://data-nautilos-h2020.eu/erddap/tabledap/image_annotation.insert?' +
                    'species_taxom_name=' + species.replace(searchRegExp, replaceWith) +
                    '&quantity=' + quantity.replace(searchRegExp, replaceWith) +
                    '&date=' + date.toISOString().slice(0, 19) +
                    '&latitude=' + latitude.toString().replace(searchRegExp, replaceWith) +
                    '&longitude=' + longitude.toString().replace(searchRegExp, replaceWith) +
                    '&location_name=' + location.replace(searchRegExp, replaceWith) +
                    '&depth=' + depth.replace(searchRegExp, replaceWith) +
                    '&sea_level=' + seaLevel +
                    '&sea_bottom_type=' + seaBottom +
                    '&weather_type=' + weather +
                    '&image=' + image +
                    '&user=' + username +
                    '&author=' + author
            }).then((response) => {
                if (response.data.status === 'success') {
                    addImage({ uri: '', base64: '' })
                    addResponse({ message: 'Report successfully added', report_n: state.report_n + 1 })
                    navigation.navigate('Home', { response: 'Report successfully added' })
                } else {
                    setIsLoading(false)
                    setErrorMsg("Report not sent")
                }
            }, (error) => {
                setIsLoading(false)
                setErrorMsg("Report not sent");
                if (error.response) {
                    if (error.response.data.split('Query error: ')[1] !== undefined) {
                        let errorResponse = error.response.data.split('Query error: ')[1];
                        errorResponse = errorResponse.slice(0, errorResponse.length - 5)
                        if (errorResponse.split('=')[1] !== undefined) {
                            errorResponse = errorResponse.split('=')[1];
                        }
                        setErrorMsg(errorResponse)
                    }
                }
            });
        } catch (e) {
            setErrorMessage('Error meanwhile communicating with server')
        }
    }

    const addAlgalBloomApi = async (navigation, species, description, sampleVolume, date, latitude, longitude, location, depth, seaZone, seaBottom, weather, image, username, setErrorMsg, setIsLoading) => {
        const author = "algalbloom_4Lg4lpw4"
        try {
            if (image != '') {
                const searchImage = '\\+';
                const searchImageRegExp = new RegExp(searchImage, 'g'); // Throws SyntaxError
                const replaceImageWith = '%2B';
                image = 'data:image/png;base64,' + image.replace(searchImageRegExp, replaceImageWith)
            }
            const search = '\\&'
            const searchRegExp = new RegExp(search, 'g')
            const replaceWith = '%26'

            await axios({
                method: 'post',
                url: 'https://data-nautilos-h2020.eu/erddap/tabledap/algal_bloom.insert?' +
                    'species_taxom_name=' + species.replace(searchRegExp, replaceWith) +
                    '&sample_volume=' + sampleVolume.replace(searchRegExp, replaceWith) +
                    '&date=' + date.toISOString().slice(0, 19) +
                    '&latitude=' + latitude.toString().replace(searchRegExp, replaceWith) +
                    '&longitude=' + longitude.toString().replace(searchRegExp, replaceWith) +
                    '&location_name=' + location.replace(searchRegExp, replaceWith) +
                    '&depth=' + depth.replace(searchRegExp, replaceWith) +
                    '&sea_zone=' + seaZone +
                    '&sea_bottom_type=' + seaBottom +
                    '&weather_type=' + weather +
                    '&image=' + image +
                    '&description=' + description.replace(searchRegExp, replaceWith) +
                    '&user=' + username +
                    '&author=' + author
            }).then((response) => {
                if (response.data.status === 'success') {
                    addImage({ uri: '', base64: '' })
                    addResponse({ message: 'Report successfully added', report_n: state.report_n + 1 })
                    navigation.navigate('Home', { response: 'Report successfully added' })
                } else {
                    setIsLoading(false)
                    setErrorMsg("Report not sent")
                }
            }, (error) => {
                setIsLoading(false)
                setErrorMsg("Report not sent");
                if (error.response) {
                    if (error.response.data.split('Query error: ')[1] !== undefined) {
                        let errorResponse = error.response.data.split('Query error: ')[1];
                        errorResponse = errorResponse.slice(0, errorResponse.length - 5)
                        if (errorResponse.split('=')[1] !== undefined) {
                            errorResponse = errorResponse.split('=')[1];
                        }
                        setErrorMsg(errorResponse)
                    }
                }
            });
        } catch (e) {
            setErrorMessage('Error meanwhile communicating with server')
        }
    }

    return [addPlasticCampaignApi, addPlasticsApi, addDiverCampaignApi, addImageAnnotationApi, addAlgalBloomApi, errorMessage]

}