import React, { useReducer } from 'react'
import createDataContext from './CreateDataContext';


const ReportsReducer = (state, action) => {
    switch (action.type) {
        case 'addAlgalBlooms':
            state.sentReport -= state.algalBlooms.length    
            state.algalBlooms = action.payload.algalBlooms
            state.sentReport += action.payload.algalBlooms.length
            return state
        case 'addDiverCampaigns':
            state.sentReport -= state.diverCampaigns.length  
            state.diverCampaigns = action.payload.diverCampaigns
            state.sentReport += action.payload.diverCampaigns.length
            return state
        case 'addImageAnnotations':
            state.sentReport -= state.imageAnnotations.length  
            state.imageAnnotations = action.payload.imageAnnotations
            state.sentReport += action.payload.imageAnnotations.length
            return state
        case 'addPlastics':
            state.sentReport -= state.plastics.length  
            state.plastics = action.payload.plastics
            state.sentReport += action.payload.plastics.length
            return state
        default:
            return state
    }
}


const addAlgalBlooms = (dispatch) => {
    return (algalBlooms) => {
        dispatch({ type: 'addAlgalBlooms', payload: { algalBlooms: algalBlooms } })
    }
}
const addDiverCampaigns = (dispatch) => {
    return (diverCampaigns) => {
        dispatch({ type: 'addDiverCampaigns', payload: { diverCampaigns: diverCampaigns } })
    }
}
const addImageAnnotations = (dispatch) => {
    return (imageAnnotations) => {
        dispatch({ type: 'addImageAnnotations', payload: { imageAnnotations: imageAnnotations } })
    }
}
const addPlastics = (dispatch) => {
    return (plastics) => {
        dispatch({ type: 'addPlastics', payload: { plastics: plastics } })
    }
}

export const { Context, Provider } = createDataContext(ReportsReducer, {
    addAlgalBlooms, addDiverCampaigns, addImageAnnotations, addPlastics
}, {
    algalBlooms: [], diverCampaigns: [], imageAnnotations: [], plastics: [], sentReport: 0
});