import React from 'react' 
import {View, Text, StyleSheet} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SelectElement = ({data, placeholder, type, callback}) => {

    return(
        <View>
            <SelectDropdown
                    data={data}
                    onSelect={(selectedItem, index) => {
                        callback(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    defaultButtonText={placeholder}
                    renderDropdownIcon={(isOpened) => {
                        return (
                            <FontAwesome
                                name={isOpened ? "chevron-up" : "chevron-down"}
                                color={"#444"}
                                size={18}
                            />
                        );
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={styles.dropdown}
                    buttonStyle={type==='mandatory' ? styles.mandatoryDropdown1BtnStyle : styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        borderRadius: 5,        
    },
    dropdown1BtnStyle: {
        width: "70%",
        height: 40,
        backgroundColor: "#FFF",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'grey',
        alignSelf: 'center',
        marginVertical: 5
    },
    dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
    mandatoryDropdown1BtnStyle: {
        width: "70%",
        height: 40,
        backgroundColor: "#FFF",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'red',
        alignSelf: 'center',
        marginVertical: 5
    }
})

export default SelectElement