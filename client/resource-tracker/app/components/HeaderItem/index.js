import {
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { colors, statusbar } from "../../configs/variables";
import { Entypo } from '@expo/vector-icons';

import { AntDesign } from "@expo/vector-icons";
import useAuth from "../../auth/useAuth";
import AppButton from "../AppButton";

export default function HeaderItem({ route, navigation }) {
    const { user } = useAuth();
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.drawerbutton}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Entypo name="menu" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Manage Resources</Text>
                    <View style={{}}>
                        <AppButton
                            title="Add"
                            onPress={() => {
                                navigation.navigate("AddResource", {
                                    resource: null,
                                });
                            }}
                            buttonStyles={styles.buttonStyles}
                            IconComponent={<AntDesign name="plus" size={20} color="white" style={styles.addbutton} />}

                        />
                    </View>
                </View>
                {/* <View>
            <Avatar
              onPress={() => navigation.navigate("UserProfile")}
                        activeOpacity={0.2}
                        avatarStyle={{}}
                        containerStyle={{ backgroundColor: "#BDBDBD" }}
                        icon={{}}
                        source={
                            user?.profile_picture
                                ? {
                                    uri: driveURL + user?.profile_picture,
                                }
                                : require("../../images/user-icon.png")
                        }
                        imageProps={{
                            style: {
                                resizeMode: "cover",
                            },
                        }}
                        overlayContainerStyle={{}}
                        placeholderStyle={{}}
                        rounded
                        size="small"
                        title="P"
                        titleStyle={{}}
            />
                    </View> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",

    },
    drawerbutton: {
        marginRight: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonStyles: {
        paddingVertical: 4,
        borderRadius: 3,
        backgroundColor: "green"
    },
    addbutton: {
        marginRight: 10,
        marginLeft: -10
    }
});
