import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from 'react-native-elements'
import RequestCard from '../components/RequestCard'
import ResourceInfoCard from '../components/ResourceInfoCard'

const ResourceList = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <ResourceInfoCard />
                <ResourceInfoCard />
                <ResourceInfoCard />
                <ResourceInfoCard />
                <ResourceInfoCard />
                <ResourceInfoCard />
            </ScrollView>


        </View>
    )
}

export default ResourceList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20
    },
    card: {
        backgroundColor: colors.grey5,
        margin: 10,
        padding: 10,
    },
    heading: {
        fontWeight: "bold"
    }
})