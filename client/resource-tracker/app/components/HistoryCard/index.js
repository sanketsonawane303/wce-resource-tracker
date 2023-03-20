import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../configs/variables';
import { Entypo } from '@expo/vector-icons';
import { getKeyById } from '../../apis/keys';

const HistoryCard = (props) => {

    return (
        <View style={styles.card}>
            <View style={styles.innercard}>
                <Text>{props.from.email}</Text>
            </View>
            <View>

                <View>
                    <Entypo name="arrow-long-right" size={24} color="black" />
                </View>

            </View>
            <View style={styles.innercard}>
                <Text>
                    {props.to.email}
                </Text>
            </View>
        </View>
    )
}

export default HistoryCard

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },
    innercard: {
        padding: 20,
        backgroundColor: colors.lightgrey,
        minWidth: 150,
        justifyContent: "center",
        alignItems: "center"
    }
})