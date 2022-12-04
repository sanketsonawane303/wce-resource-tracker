import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Modal } from 'react-native';

const MessageModal = ({
    message, buttonComponent, visible, onButtonPress
}) => {
    return (
        <View>
            <Modal
                visible={visible}
                onRequestClose={onButtonPress}
                transparent={true}
            >
                <View style={styles.modalview}>
                    <View style={styles.message}>
                        <Text style={styles.messagetext}>{message}</Text>
                    </View>
                    <View style={styles.button}>
                        {buttonComponent}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default MessageModal

const styles = StyleSheet.create({
    modalview: {
        flexDirection: "column",

        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 300,
        marginTop: "40%",
        marginHorizontal: "5%"
    },
    message: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20

    },
    messagetext: {
        fontSize: 17,
        fontWeight: "500"
    },
    button: {

    }
})
