import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ClassificationResult = ({ route, navigation }) => {

    const images = route.params.images
    const [shownImage, setShownImage] = useState(images[0])
    const [cont, setCont] = useState(0)

    const changeImage = () => {

        setCont((cont + 1) % 3)
        setShownImage(images[cont])
    }

    return (
        <View style={styles.container}>
            <View><Text style={styles.title}> </Text></View>
            <View>
                <TouchableOpacity
                    onPress={() => changeImage()}
                >
                    <Image style={{ width: 700, height: 350, resizeMode: 'contain', transform: [{ rotate: '90deg' }] }} source={{ uri: 'data:image/png;base64,' + shownImage }}></Image>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => {
                    (navigation.navigate('Home'))
                }}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    border: {
        borderColor: 'black',
        borderWidth: 0.3
    },
    button: {
        height: 40,
        width: 200,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 150,
        backgroundColor: 'green'
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center'
    },
    container: {
        alignSelf: 'center',
        flexDirection: 'column',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 7,
    },
})

export default ClassificationResult