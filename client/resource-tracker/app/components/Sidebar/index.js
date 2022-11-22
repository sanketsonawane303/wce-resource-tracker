import { Text, SafeAreaView, Image, View, StyleSheet } from "react-native";
import React from "react";
import {
    DrawerItemList,
    DrawerContentScrollView,
} from "@react-navigation/drawer";

import AppButton from "../AppButton";
import AccountItem from "../AccountItem";
const Sidebar = (props) => {
    return (
        <>
            <View style={styles.container}>
                <DrawerContentScrollView>
                    <AccountItem />
                    <DrawerItemList {...props}/>
                </DrawerContentScrollView>
            </View>

            <View style={styles.logout}>
                <AppButton
                    title="LogOut"
                    onPress={() => {

                    }}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 7,
        paddingTop: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: "700",
    },
    subheading: {
        fontSize: 16,
        fontWeight: "100",
    },
    logout: {
        flex: 1,
        paddingHorizontal: 10,
    },
});
export default Sidebar;
