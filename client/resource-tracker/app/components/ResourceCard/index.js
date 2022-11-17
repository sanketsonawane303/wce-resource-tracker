import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import AppButton from '../AppButton';
import { AntDesign } from '@expo/vector-icons';
import { colors } from 'react-native-elements';
export default function ResourceCard() {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View>
                    <Text style={styles.heading}>Resource: Mini CCF</Text>
                    <Text style={styles.heading}>Date of Request: 17/11/2022</Text>
                    <Text style={styles.heading}>Applicant: WLUG</Text>
                    <View>
                        <AppButton
                            onPress={() => { }} buttonStyles={{
                                backgroundColor: colors.grey0,
                                width: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 7,
                                marginBottom: 0
                            }
                            }
                            IconComponent={<AntDesign name="infocirlceo" size={24} color="white" />}
                        />
                    </View>
                </View>
                <View style={styles.icon}>
                    <FontAwesome name="building-o" size={40} color="blue" />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: 10

    },
    icon: {
        justifyContent: "center"
    },
    heading: {
        fontWeight: "bold"
    }
})