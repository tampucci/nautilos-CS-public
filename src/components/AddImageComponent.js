import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Context as AddDataContext } from '../context/AddDataContext'
import * as ImagePicker from 'expo-image-picker';
//import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';

const AddImageComponent = ({ route, navigation, campaign, type }) => {

    const { state, addImage, addMediaLibraryPermission } = useContext(AddDataContext)
    const [errorMsg, setErrorMsg] = useState(null);

    let openImagePickerAsync = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true });
        if (pickerResult.assets[0].uri === undefined || pickerResult.canceled) {
            return;
        }
        addImage({ uri: pickerResult.assets[0].uri, base64: pickerResult.assets[0].base64 })
        navigation.navigate(state.navigateBack, { image: pickerResult.assets[0].uri, campaign: campaign })
    };

    let openCameraPickerAsync = async () => {
        let cameraResult = await ImagePicker.launchCameraAsync({
            base64: true,
            quality: 0.7,
        })
        if (cameraResult.assets[0].uri === undefined || cameraResult.canceled) {
            return;
        }
        /*console.log('Here')

        let asset = await MediaLibrary.createAssetAsync(cameraResult.assets[0].uri);
        console.log('Now here')
        let album = await MediaLibrary.getAlbumAsync('Nautilos')
        let albumAssets = null
        if (album === null) {
            MediaLibrary.createAlbumAsync('Nautilos', asset, false)
                .then(async () => {
                    album = await MediaLibrary.getAlbumAsync('Nautilos')
                    albumAssets = await MediaLibrary.getAssetsAsync({ album: album.id, sortBy: 'creationTime' })
                    asset = albumAssets.assets[0]
                    addImage({ uri: cameraResult.assets[0].uri, base64: cameraResult.assets[0].base64 })
                    navigation.navigate(state.navigateBack, { image: cameraResult.assets[0].uri })
                })
                .catch(error => {
                    console.log('err', error);
                });
        } else {
            MediaLibrary.addAssetsToAlbumAsync(asset, album, false)
                .then(async () => {
                    albumAssets = await MediaLibrary.getAssetsAsync({ album: album.id, sortBy: 'creationTime' })
                    asset = albumAssets.assets[0]
                    addImage({ uri: cameraResult.assets[0].uri, base64: cameraResult.assets[0].base64 })
                    //console.log("Length: " + photo.base64.length)
                    navigation.navigate(state.navigateBack, { image: cameraResult.assets[0].uri })
                }).catch(error => {
                    console.log('err', error);
                });
        }*/


        addImage({ uri: cameraResult.assets[0].uri, base64: cameraResult.assets[0].base64 })
        navigation.navigate(state.navigateBack, {image: cameraResult.assets[0].uri, campaign: campaign })

    }

    useEffect(() => {
        (async () => {
            let pickerStatus = await ImagePicker.requestCameraPermissionsAsync();
            pickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (pickerStatus.status !== 'granted') {
                setErrorMsg('Permission to access media library was denied');
                return;
            }
            addMediaLibraryPermission(true);
        })();
    }, [navigation])

    return (
        <View>
            <View style={type === 'mandatory' ? styles.mandatoryImageContainer : styles.imageContainer}>
                {route.params?.image === undefined ?
                    <FontAwesome name="image" size={60} color="black" style={styles.imageIcon} /> :
                    <Image source={{ uri: route.params?.image }} style={styles.image} />}
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={openImagePickerAsync}>
                    <Text style={styles.buttonText}>Pick an Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={openCameraPickerAsync}>
                    <Text style={styles.buttonText}>Take a Photo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 30,
        width: 150,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 5,
        backgroundColor: 'green'
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    container: {
        flexDirection: 'row',
        alignSelf: 'center'
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
        marginTop: 5,
        borderColor: 'black',
        borderWidth: 0.3
    },
    imageIcon: {
        alignSelf: 'center',
        marginTop: 5
    },
    mandatoryImageContainer: {
        alignSelf: 'center',
        flexDirection: 'column',
        width: 75,
        height: 75,
        marginTop: 5,
        borderColor: 'red',
        borderWidth: 0.3
    },
})

export default AddImageComponent