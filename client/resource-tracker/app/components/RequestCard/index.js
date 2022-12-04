import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import AppButton from '../AppButton';
import { AntDesign } from '@expo/vector-icons';
import { colors } from 'react-native-elements';
import { colors as uicolors } from '../../configs/variables';
import formatAMPM from '../../utils/formatAMPM';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export default function RequestCard(props) {
    const navigation = useNavigation()
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.details}>
                    <View style={styles.content}>
                        <Text style={styles.heading}>Resources Requested:</Text>
                        {
                            props?.resources?.list.map((resource, index) => {
                                return (
                                    <View key={index} >
                                        <Text style={styles.subheading}>{resource}</Text>
                                    </View>
                                )
                            }
                            )
                        }
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.heading}>Date of Request:</Text>
                        <Text>{moment(props?.createdAt).format('LLL')}</Text>

                    </View>
                    <View>
                        <Text style={styles.heading}>Applicant:</Text>
                        <Text>{props.applicant}</Text>
                    </View>
                </View>
                <View style={styles.icon}>
                    <FontAwesome name="building-o" size={40} color="blue" />
                </View>
            </View>
            <View style={styles.row}>
                <AppButton
                    title={"Review"}
                    onPress={() => {
                        navigation.navigate('ViewRequest', { request: props })
                    }}
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
                {
                    props?.status === "pending" && (<View style={styles.pendingstatus}>
                        <Text>Pending</Text>
                    </View>)
                }
                {
                    props?.status === "declined" && (<View style={styles.rejectedstatus}>
                        <Text>Rejected</Text>
                    </View>)
                }
                {
                    props?.status === "approved" && (<View style={styles.pendingstatus}>
                        <Text>Accepted</Text>
                    </View>)
                }
                {
                    props?.status === "changes required" && (<View style={styles.pendingstatus}>
                        <Text>Chnage Req</Text>
                    </View>)
                }
                {
                    props?.status === "approved by advisor" && (<View style={styles.pendingstatus}>
                        <Text>approved by advisor</Text>
                    </View>)
                }
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 5,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
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
    details: {
        flex: 7
    },
    icon: {
        flex: 1,
        justifyContent: "center",
    },
    heading: {
        fontWeight: "bold",
        fontSize: 16
    },
    pendingstatus: {
        padding: 5,
        backgroundColor: uicolors.pendingbg,
        borderRadius: 3
    },
    rejectedstatus: {
        padding: 5,
        backgroundColor: uicolors.rejectbg,
        borderRadius: 3
    },
    approvedstatus: {
        padding: 5,
        backgroundColor: uicolors.successbg,
        borderRadius: 3
    },
    statustext: {
        fontWeight: "500"
    },
    content: {
        marginBottom: 5
    }

})