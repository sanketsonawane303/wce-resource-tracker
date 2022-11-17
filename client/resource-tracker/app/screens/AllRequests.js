import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { StatusBar } from 'react-native';
import ResourceCard from '../components/ResourceCard';

const AllRequests = () => {
    return (
        <>
            <View style={styles.container}>
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />


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