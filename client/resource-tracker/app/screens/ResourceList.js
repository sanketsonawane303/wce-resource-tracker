import { ScrollView, StyleSheet, Text, View, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from 'react-native-elements'
import RequestCard from '../components/RequestCard'
import ResourceInfoCard from '../components/ResourceInfoCard';
import { createResource, getResource } from '../apis/resource';
import { useIsFocused } from "@react-navigation/native";

const ResourceList = () => {
    const [resources, setResources] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const focus = useIsFocused();


    useEffect(() => {
        if (!focus) return;
        getResource().then((res) => {
            // console.log(res)
            console.log(res.data)
            if (res.ok && res.data.status == "success") {
                setResources(res?.data?.data)
            }
        })
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setResources([]);
        if (!focus) return;
        getResource()
            .then((res) => {
                if (res.ok == true && res.data.status == "success") setResources(res.data.data);
                else {
                }
            })
            .catch((err) => {
                //  console.log(err);
            });
        setRefreshing(false);
    }, []);

    return (
        <View style={styles.container}>
            {
                resources.length > 0 ? (
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            resources.map((value, index) => {
                                return (<View key={value._id}>
                                    <ResourceInfoCard {...value} />
                                </View>)
                            })
                        }
                    </ScrollView>)
                    :
                    (<View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>)
            }



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