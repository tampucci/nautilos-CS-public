import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const DecreaseIncreaseComponent = ({ element, values, index, backgroundColor, callback }) => {

    function handleIncrementClick(index) {
        const nextPlastic = values.map((pq, i) => {
            if (i === index) {
                // Increment the clicked counter
                return pq + 1;
            } else {
                // The rest haven't changed
                return pq;
            }
        });
        callback(nextPlastic);
    }

    function handleDecrementClick(index) {
        const nextPlastic = values.map((pq, i) => {
            if (i === index) {
                if (pq - 1 < 0) {
                    return 0;
                }
                return pq - 1;
            } else {
                return pq;
            }
        });
        callback(nextPlastic);
    }

    function changeValue(index, value) {
        const nextPlastic = values.map((pq, i) => {
            if (i === index) {
                if (value < 0) {
                    return 0
                } else {
                    return value;
                }
            } else {
                // The rest haven't changed
                return pq;
            }
        });
        callback(nextPlastic);
    }

    return (
        <View style={backgroundColor == 'white' ? styles.quantityContainerWhite : styles.quantityContainer} key={index}>
            <Text style={styles.text}>{element}: </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => { handleDecrementClick(index) }}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                    value={values[index].toString()}
                    style={styles.textInput}
                    onChangeText={(value) => changeValue(index, value)}
                    textAlign={'center'}
                    placeholder="Length"
                    placeholderTextColor="#667"
                    keyboardType="numeric"
                    key={index}
                />
                <TouchableOpacity style={styles.quantityButton} onPress={() => { handleIncrementClick(index) }}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    quantityButton: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: 'green'
    },
    quantityContainer: {
        flexDirection: 'row',
        borderRadius: 5,
        marginHorizontal: 5,
        paddingVertical: 3,
    },
    quantityContainerWhite: {
        flexDirection: 'row',
        borderRadius: 10,
        paddingVertical: 3,
        marginHorizontal: 5,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    text: {
        paddingHorizontal: 7,
        marginVertical: 5
    },
    textInput: {
        width: 35,
        alignSelf: 'center'
    }
})

export default DecreaseIncreaseComponent