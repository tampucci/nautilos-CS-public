import React, { useState, useContext } from 'react';
import axios from 'axios'
import { Context as ReportContext } from '../context/ReportContext'

export default () => {
    const { addPlastics, addDiverCampaigns, addImageAnnotations, addAlgalBlooms } = useContext(ReportContext)
    const [errorMessage, setErrorMessage] = useState('')

    const plastic_campaignObj = {
        id: '',
        latitude: 0.0,
        longitude: 0.0,
        date: '',
        location: '',
        beach: '',
        plastics: [],
        image: ''
    }

    const plasticObj = {
        type: '',
        quantity: 0
    }

    const getPlastics = async (username) => {
        try {
            let plastic_campaign;
            let all_campaigns = [];
            let plastic;
            let campaing_idx = 0;

            await axios({
                method: 'post',
                url: `https://data-nautilos-h2020.eu/erddap/tabledap/csc_plastic_campaign.json?campaign_id%2Clatitude%2Clongitude%2Cdate%2Clocation_name%2Cbeach_name%2Ccontributor`
                }).then((response) => {
                response.data.table.rows.forEach(element => {
                    plastic_campaign = Object.create(plastic_campaignObj)
                    plastic_campaign.id = element[0]
                    plastic_campaign.latitude = element[1]
                    plastic_campaign.longitude = element[2]
                    plastic_campaign.date = element[3].slice(0, 10)
                    plastic_campaign.location = element[4]
                    plastic_campaign.beach = element[5]
                    plastic_campaign.contributor = element[6]
                    plastic_campaign.plastics = []
                    plastic_campaign.image = ''

                    all_campaigns.push(plastic_campaign)
                });
            }, (error) => {
                setErrorMessage(error);
                if (error.response) {
                    addPlastics([])
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

            /*await axios ({
                method: 'post',
                url: `https://data-nautilos-h2020.eu/erddap/tabledap/csc_plastic_image.json?campaign_id%2Cthumbnail&uid="${username}"`
            }).then((response)=> {  
                
                response.data.table.rows.forEach(element => {
                    campaing_idx = all_campaigns.findIndex(item => item.id === element[0]);
                    all_campaigns[campaing_idx].image = element[1]
                });
            }, (error) => {
                setErrorMessage(error);
                if (error.response) {
                    addPlastics([])
                } else if (error.request) {
                    console.log('Error request:')
                    console.log(error.request)
                    console.log(' ')
                } else if (error.message) {
                    console.log('Error message:')
                    console.log(error.message)
                    console.log(' ')
                }
            });*/

            await axios({
                method: 'post',
                url: `https://data-nautilos-h2020.eu/erddap/tabledap/csc_plastic_litter.json?campaign_id%2Cplastic_type%2Cquantity&uid="${username}"`
            }).then((response) => {
                response.data.table.rows.forEach(element => {

                    plastic = Object.create(plasticObj)
                    campaing_idx = all_campaigns.findIndex(item => item.id === element[0]);

                    if (campaing_idx != -1) {
                        plastic.type = element[1]
                        plastic.quantity = element[2]

                        all_campaigns[campaing_idx].plastics.push(plastic)
                    }
                })
                addPlastics(all_campaigns)
            }, (error) => {
                setErrorMessage(error);
                if (error.response) {
                    addPlastics([])
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

    const getDiverCampaigns = async (username) => {
        try {
            await axios({
                method: 'post',
                url: `https://data-nautilos-h2020.eu/erddap/tabledap/diver_campaign.json?measured_parameter%2Cmeasured_value%2Cdate%2Clatitude%2Clongitude&user="${username}"`
            }).then((response) => {
                /*console.log(' ')
                console.log("The response is: ")
                console.log(response.data.table.rows)*/
                addDiverCampaigns(response.data.table.rows)
            }, (error) => {
                setErrorMessage(error);
                if (error.response) {
                    addDiverCampaigns([])
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

    const getImageAnnotations = async (username) => {
        try {
            await axios({
                method: 'post',
                url: `https://data-nautilos-h2020.eu/erddap/tabledap/image_annotation.json?species_taxom_name%2Cquantity%2Cdate%2Clatitude%2Clongitude&user="${username}"`
            }).then((response) => {
                /*console.log(' ')
                console.log("The response is: ")
                console.log(response.data.table.rows)*/
                addImageAnnotations(response.data.table.rows)
            }, (error) => {
                setErrorMessage(error);
                if (error.response) {
                    addImageAnnotations([])
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

    const getAlgalBlooms = async (username) => {
        try {
            await axios({
                method: 'post',
                url: `https://data-nautilos-h2020.eu/erddap/tabledap/algal_bloom.json?species_taxom_name%2Csample_volume%2Cdate%2Clatitude%2Clongitude&user="${username}"`
            }).then((response) => {
                /*console.log(' ')
                console.log("The response is: ")
                console.log(response.data.table.rows)*/
                addAlgalBlooms(response.data.table.rows)
            }, (error) => {
                setErrorMessage(error);
                if (error.response) {
                    addAlgalBlooms([])
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

    return [getPlastics, getDiverCampaigns, getImageAnnotations, getAlgalBlooms, errorMessage]
}