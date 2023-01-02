import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import AppButton from '../AppButton';
import { colors, Switch } from 'react-native-elements';
import { colors as uicolors } from '../../configs/variables';
import { useNavigation } from '@react-navigation/native';


export default function ResourceInfoCard(props) {

    const [switchstate, chageSwitch] = useState(props?.is_available);
    const navigation = useNavigation()


    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.resourcename}>
                    <Text style={styles.heading}>{props?.name}</Text>
                </View>
                <View style={styles.icon}>
                    <FontAwesome name="building-o" size={40} color="blue" />
                </View>
            </View>


            <View style={styles.buttonrow}>
                <View style={styles.department}>
                    <Text style={styles.subheading}>Department of {props?.department}</Text>
                </View>
                <View>
                    <AppButton
                        title={"Edit"}
                        onPress={() => {
                            navigation.navigate('EditResource', { resource: props })
                        }}
                        buttonStyles={{
                            backgroundColor: uicolors.primary,
                            width: 80,
                            paddingVertical: 5,
                            borderRadius: 3
                        }}

                    />
                </View>
            </View>

            <View>
                <AppButton title="Key History" onPress={() => {
                    navigation.navigate('KeyHistory', { id: props.key_id })
                }} buttonStyles={{
                    width: 120,
                    height: 40,
                    padding: 0,
                    backgroundColor: "white",
                    borderBottomColor: "blue",
                    borderBottomWidth: 3,


                }}

                    textStyle={{
                        color: "blue",

                    }}


                />
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
        marginHorizontal: 10,
        alignItems: "center"
    },
    department: {
        flex: 7,
        flexDirection: "row",
        flexWrap: "wrap",
    }

})