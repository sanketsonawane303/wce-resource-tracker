import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import AppButton from '../AppButton';
import { AntDesign } from '@expo/vector-icons';
import { colors } from 'react-native-elements';
import { colors as uicolors } from '../../configs/variables';
export default function RequestCard() {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View>
                    <Text style={styles.heading}>Resource: Mini CCF</Text>
                    <Text style={styles.heading}>Date of Request: 17/11/2022</Text>
                    <Text style={styles.heading}>Applicant: WLUG</Text>
                </View>
                <View style={styles.icon}>
                    <FontAwesome name="building-o" size={40} color="blue" />
                </View>
            </View>
            <View style={styles.row}>
                <AppButton
                    title={"Review"}
                    onPress={() => { }}
                    buttonStyles={{
                        backgroundColor: colors.grey1,
                        width: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 7,
                        marginBottom: 0,
                        marginTop: 0
                    }
                    }
                    textStyle={{
                        marginLeft: 5,
                        fontSize: 15
                    }}
                    IconComponent={<AntDesign name="infocirlceo" size={20} color="white" />}
                />
                <View style={styles.statuscard}>
                    <Text style={styles.statustext}> Rejected </Text>
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
        borderRadius: 10,
        borderColor: colors.grey3,
        borderWidth: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 5,
        marginVertical: 10

    },
    icon: {
        justifyContent: "center"
    },
    heading: {
        fontWeight: "bold"
    },
    statuscard: {
        padding: 5,
        backgroundColor: uicolors.rejectbg,
        borderRadius: 3
    },
    statustext: {
        fontWeight: "500"
    }

})