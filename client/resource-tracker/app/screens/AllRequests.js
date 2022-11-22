import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { StatusBar } from 'react-native';
import RequestCard from '../components/RequestCard';

const AllRequests = () => {
    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                </ScrollView>

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

})