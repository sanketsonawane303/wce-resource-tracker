import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import AppButton from "../components/AppButton";
import DateTimePicker from "../components/DateTimePicker";
import RNEInput from "../components/RNEInput";
import { Formik } from "formik";
import { colors } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import resourceApi from "../apis/resource";
// Department items
const items = [
    { label: "Computer Science and Engineering", value: "CSE" },
    { label: "Civil Engineering", value: "CV" },
    { label: "Mechanical Engineering", value: "ME" },
    { label: "Electronics Engineering", value: "ELN" },
    { label: "Electrical Engineering", value: "ELE" },
    { label: "Information Tehhnology", value: "IT" },
    { label: "Other(WCE)", value: "WCE" }
]

export default function AddResource() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    department: "WCE",
                    name: "",
                    capacity: 0,
                    key_code: ""

                }}
                onSubmit={(values) => {

                }}
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
                                label="key_code"
                            />
                        </View>
                        <AppButton title={"submit"} onPress={submitForm} />
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
