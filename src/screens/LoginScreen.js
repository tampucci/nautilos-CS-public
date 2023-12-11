import React, { useContext, useState } from 'react'
import { Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Context as AddDataContext } from '../context/AddDataContext'
import Login from '../hooks/Login';
import { Feather } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {

    const { state } = new useContext(AddDataContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginApi, errorMessage] = new Login
    const [errorMsg, setErrorMsg] = useState('')
    const [viewModal, setViewModal] = useState('false')


    return (
        <View style={styles.container}>
            <Image source={require('../../assets/Nautilos.png')} style={styles.centeredLogo} />
            {errorMsg !== '' ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor="#667"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize='none'
                placeholderTextColor="#667"
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={viewModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setViewModal(!viewModal);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setViewModal(!viewModal)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.button} onPress={() => {
                (async () => {
                    if (username == '' || password == '') {
                        setErrorMsg('You should fill both\n' +
                            'username and password')
                    } else {
                        await loginApi(username.toLowerCase(), password)
                        if (state.username != 0) {
                            setErrorMsg('')
                            navigation.navigate('Home')
                        } else {
                            setErrorMsg('Invalid username or password')
                        }
                    }
                })();
            }}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setViewModal(!viewModal)
                console.log("View modal: "+viewModal)
            }} style={styles.infoIcon}>
                <Feather name="info" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.version}>Version: 1.4</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
    centeredLogo: {
        width: 300,
        height: 50,
        alignSelf: 'center',
        marginTop: 150,
        marginBottom: 15
    },
    container: {
        flexDirection: 'column'
    },
    errorMsg: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 18,
        paddingBottom: 10,
        textAlign: 'center',
    },
    infoIcon: {
        paddingLeft: 5,
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
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10
    },
    version: {
        paddingRight: 30,
        paddingTop: 200,
        textAlign: 'right',
        color: '#707070'
    }
})

export default LoginScreen