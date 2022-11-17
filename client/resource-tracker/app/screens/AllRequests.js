import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { StatusBar } from 'react-native';

const AllRequests = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text>Resource: Mini CCF</Text>
                    <Text>Date of Request: 17/11/2022</Text>
                    <Text>Applicant: WLUG</Text>
                </View>
                <View style={styles.card}>
                    <Text>Resource: Mini CCF</Text>
                    <Text>Date of Request: 17/11/2022</Text>
                    <Text>Applicant: WLUG</Text>
                </View>
                <View style={styles.card}>
                    <Text>Resource: Mini CCF</Text>
                    <Text>Date of Request: 17/11/2022</Text>
                    <Text>Applicant: WLUG</Text>
                </View>
                <View style={styles.card}>
                    <Text>Resource: Mini CCF</Text>
                    <Text>Date of Request: 17/11/2022</Text>
                    <Text>Applicant: WLUG</Text>
                </View>

            </View>
        </>

    )
}

export default AllRequests

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: StatusBar.currentHeight
    },
    card: {
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1
    }
})