import React, { useReducer } from 'react'
import createDataContext from './CreateDataContext';


const AddReducer = (state, action) => {
    switch (action.type) {
        case 'addCameraPermission':
            state.cameraPermission = action.payload.cameraPermission
            return state
        case 'addImage':
            state.image.uri = action.payload.image.uri
            state.image.base64 = action.payload.image.base64
            return state
        case 'addLoginData':
            state.username = action.payload.id_user
            state.authkey = action.payload.authkey
            state.edmoCode = action.payload.edmoCode
            state.id_group = action.payload.id_group
            state.selects_values = action.payload.selects_values
            state.plastic_campaigns = action.payload.plastic_campaigns
            return state
        case 'addMediaLibraryPermission':
            state.mediaLibraryPermission = action.payload.mediaLibraryPermission
            return state
        case 'addNavigateBack':
            state.navigateBack = action.payload.navigateBack
            return state
        case 'addPlasticCampaigns':
            state.plastic_campaigns = action.payload.plastic_campaigns
            return state            
        case 'addResponse':
            state.message = action.payload.response.message
            state.report_n = action.payload.response.report_n
            return state
        case 'addUsername':
            state.username = action.payload.username
            return state
        case 'appendPlasticCampaign':
            state.plastic_campaigns.push( action.payload.plastic_campaign )
            state.plastic_campaigns = state.plastic_campaigns.sort()
            return state
        case 'reset':
            state = {
                cameraPermission: false,
                image: { uri: '', base64: '' },
                mediaLibraryPermission: false,
                navigateBack: '',
                message: '',
                report_n: 0,
                username: 0,
                authkey: '',
                edmoCode: 0,
                id_group: 0,
                selects_values: {
                    measured_param_types: [],
                    plastic_types: [],
                    plastic_families: [],
                    sea_bottom_types: [],
                    sea_levels: [],
                    sea_statuses: [],
                    sea_zones: [],
                    sediment_types: [],
                    surrounding_types: [],
                    weather_types: [],
                },
                plastic_campaigns: []
            }
        default:
            return state
    }
}

const addCameraPermission = (dispatch) => {
    return (permission) => {
        dispatch({ type: 'addCameraPermission', payload: { cameraPermission: permission } })
    }
}

const addImage = (dispatch) => {
    return (image) => {
        dispatch({ type: 'addImage', payload: { image: image } })
    }
}

const addLoginData = (dispatch) => {
    return (resultJson) => {
        dispatch({ type: 'addLoginData', payload: resultJson })
    }
}

const addMediaLibraryPermission = (dispatch) => {
    return (permission) => {
        dispatch({ type: 'addMediaLibraryPermission', payload: { mediaLibraryPermission: permission } })
    }
}

const addNavigateBack = (dispatch) => {
    return (navigateBack) => {
        dispatch({ type: 'addNavigateBack', payload: { navigateBack: navigateBack } })
    }
}

const addPlasticCampaigns = (dispatch) => {
    return (plastic_campaigns) => {
        dispatch({ type: 'addPlasticCampaigns', payload: { plastic_campaigns: plastic_campaigns } })
    }
}

const addResponse = (dispatch) => {
    return (response) => {
        dispatch({ type: 'addResponse', payload: { response: response } })
    }
}

const appendPlasticCampaign = (dispatch) => {
    return (plastic_campaign) => {
        dispatch({ type: 'appendPlasticCampaign', payload: { plastic_campaign: plastic_campaign } })
    }
}

const addUsername = (dispatch) => {
    return (username) => {
        dispatch({ type: 'addUsername', payload: { username: username } })
    }
}

const reset = (dispatch) => {
    return () => {
        dispatch({ type: 'reset' })
    }
}

export const { Context, Provider } = createDataContext(
    AddReducer,
    { addCameraPermission, addImage, addLoginData, addMediaLibraryPermission, addNavigateBack, addPlasticCampaigns, addResponse, addUsername, appendPlasticCampaign, reset },
    {
        cameraPermission: false,
        image: { uri: '', base64: '' },
        mediaLibraryPermission: false,
        navigateBack: '',
        message: '',
        report_n: 0,
        username: 0,
        authkey: '',
        edmoCode: 0,
        id_group: 0,
        selects_values: {
            measured_param_types: [],
            plastic_types: [],
            plastic_families: [],
            sea_bottom_types: [],
            sea_levels: [],
            sea_statuses: [],
            sea_zones: [],
            sediment_types: [],
            surrounding_types: [],
            weather_types: [],
        },
        plastic_campaigns: []
    }
);    