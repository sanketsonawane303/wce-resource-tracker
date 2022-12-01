import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import AppButton from "../../components/AppButton";
import { colors } from "../../configs/variables";
export default function ServerError({ navigation, route }) {
    return (

        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <LottieView
                source={require("./servererror.json")}
                style={{
                    width: 250,
                    height: 250,
                }}
                autoPlay
                loop
            />

            <View
                style={{
                    marginTop: 100,
                    marginHorizontal: 20,
                    marginBottom: 20,
                }}
            >
                <View>
                    <View
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                fontWeight: "400",
                                opacity: 0.7,
                            }}
                        >
                            Technology can be difficult sometimes, Server not available.
                        </Text>
                    </View>
                    <View>
                        <AppButton
                            title={"Retry"}
                            buttonStyles={{
                                borderRadius: 5,
                                backgroundColor: colors.error,
                            }}
                            onPress={() => navigation.navigate("RequestStack")}
                        />
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({});
