import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from 'react-native-elements'
import RequestCard from '../components/RequestCard'
import ResourceInfoCard from '../components/ResourceInfoCard';
import resourceApi from '../apis/resource';

const ResourceList = () => {
    const [resources, setResources] = useState([])
    useEffect(() => {
        resourceApi.getResource({}).then((res) => {
            console.log(res.data?.data)
            if (res.ok && res.data.status == "success") {
                setResources(res?.data?.data)
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    resources.map((value, index) => {
                        return (<View key={value._id}>
                            <ResourceInfoCard {...value} />
                        </View>)
                    })
                }
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