import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import AppButton from '../AppButton';
import { colors, Switch } from 'react-native-elements';
import { colors as uicolors } from '../../configs/variables';

export default function ResourceInfoCard() {

    const [switchstate, chageSwitch] = useState(0);


    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.resourcename}>
                    <Text style={styles.heading}>Advanced Software Engineering Lab </Text>
                </View>
                <View style={styles.icon}>
                    <FontAwesome name="building-o" size={40} color="blue" />
                </View>
            </View>

            <View style={styles.switchrow}>
                <Text style={styles.subheading}>Availability: </Text>
                <Switch value={switchstate} onValueChange={chageSwitch} />
            </View>

            <View>
                <Text style={styles.subheading}>Department of Computer Science and Engineering</Text>
            </View>

            <View style={styles.buttonrow}>
                <View>
                    <AppButton
                        title={"Delete"} onPress={() => { }}
                        buttonStyles={{
                            backgroundColor: uicolors.error,
                            width: 100,
                            paddingVertical: 5,
                        }}

                    />
                </View>
                <View>
                    <AppButton
                        title={"Edit"}
                        onPress={() => { }}
                        buttonStyles={{
                            backgroundColor: uicolors.primary,
                            width: 100,
                            paddingVertical: 5,
                        }}

                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 5,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 3,
        backgroundColor: colors.grey5,
        borderBottomColor: "blue",
        borderBottomWidth: 3
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 5,
        marginVertical: 10,

    },
    icon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        fontWeight: "bold",
        fontSize: 20
    },
    subheading: {
        fontSize: 12,
        fontWeight: "250"
    },
    statuscard: {
        padding: 5,
        backgroundColor: uicolors.rejectbg,
        borderRadius: 3
    },
    statustext: {
        fontWeight: "500"
    },
    switchrow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    resourcename: {
        flex: 7,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderLeftColor: uicolors.grey,
        marginLeft: -10,
        borderLeftWidth: 5,
        paddingLeft: 5

    },
    buttonrow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10
    }

})