import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import HistoryCard from '../components/HistoryCard';
import { getKeyById } from '../apis/keys';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

const KeyHistory = ({ route }) => {
    const focus = useIsFocused()
    const id = route?.params?.id;
    const [key, setKey] = useState(null);
    const getKeyDetails = () => {
        getKeyById({ id: id }).then((res) => {
            console.log(res)
            if (res.ok && res.data.status == "success") {

                console.log(res.data.data);
                setKey(res.data.data);
            }
        })
    }
    useEffect(() => {
        if (!focus) return;
        setKey(null);
        getKeyDetails();
    }, [focus])
    if (key == null) {
        return null;
    }
    return (
        <ScrollView style={{
        }}>
            <View style={{
            }}>
                {
                    key && key?.holder_history.map((item, index) => {
                        return <View key={index}><HistoryCard {...item} /></View>
                    })
                }
            </View>
        </ScrollView>
    )
}

export default KeyHistory

const styles = StyleSheet.create({})