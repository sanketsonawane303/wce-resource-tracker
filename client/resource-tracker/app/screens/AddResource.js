import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import AppButton from "../components/AppButton";
import RNEInput from "../components/RNEInput";
import { Formik } from "formik";
import { colors } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import MessageModal from '../components/MessageModal';
import { createResource } from "../apis/resource";
// Department items
const items = [
    { label: "Computer Science and Engineering", value: "Computer Science and Engineering" },
    { label: "Civil Engineering", value: "Civil Engineering" },
    { label: "Mechanical Engineering", value: "Mechanical Engineering" },
    { label: "Electronics Engineering", value: "Electronics Engineering" },
    { label: "Electrical Engineering", value: "Electrical Engineering" },
    { label: "Information Tehhnology", value: "Information Tehhnology" },
    { label: "Other(WCE)", value: "WCE" }
]

export default function AddResource({ navigation }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [message, setMessage] = useState(null);
    const [messageBox, setMessageBox] = useState(false);

    const handleResoureSubmit = (values) => {
        createResource({ ...values, is_room: true }).then((response) => {
            if (response.ok) {
                if (response?.data?.status == "success") {
                    setMessage("Resource added successfully");
                    setMessageBox(true);
                }
                else {
                    setMessage("Resource already exists");
                    setMessageBox(true);
                }
            }
            else {
                setMessage("Something went wrong, Please Try Again");
                setMessageBox(true);
            }

        }).catch((error) => {
            setMessage("Something went wrong, Please Try Again");
            setMessageBox(true);
        })
    }
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    department: "WCE",
                    name: "",
                    capacity: 0,
                    key_code: ""

                }}
                onSubmit={handleResoureSubmit}
            >
                {({ setFieldValue, values, submitForm }) => (
                    <>
                        <View>
                            <Text style={styles.title}>Select Department</Text>

                            <DropDownPicker
                                containerProps={{ style: styles.dropdown }}
                                open={open}
                                value={value}
                                items={items}
                                placeholder="Select Department"
                                setOpen={setOpen}
                                setValue={setValue}
                                onChangeValue={(value) => {
                                    setFieldValue("department", value)
                                }}
                            />
                            <RNEInput
                                bg={colors.grey5}
                                placeholder={"Name of Resource"}
                                name="name"
                                label={"Name"}
                            />
                            <RNEInput
                                bg={colors.grey5}
                                multiline={true}
                                placeholder={"Capacity/Seats"}
                                name="capacity"
                                label="Capacity"
                                keyboardType="numeric"
                            />

                            <RNEInput
                                bg={colors.grey5}
                                multiline={true}
                                placeholder={"Key Code"}
                                name="key_code"
                                label="Key Code"
                            />
                        </View>
                        <AppButton title={"submit"} onPress={submitForm} />
                        <View>
                            {
                                messageBox == true &&
                                <MessageModal
                                    message={message}
                                    buttonComponent={
                                        <AppButton
                                            title="Manage Resources"
                                            buttonStyles={{
                                                width: 150,
                                                paddingVertical: 10
                                            }}
                                            onPress={() => {
                                                navigation.navigate("ManageResources");
                                                setMessageBox(false);
                                            }}
                                        />
                                    }
                                />
                            }
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        marginHorizontal: 5
    },
    dropdown: {
        marginHorizontal: 5,
        marginBottom: 5,
    },
});
