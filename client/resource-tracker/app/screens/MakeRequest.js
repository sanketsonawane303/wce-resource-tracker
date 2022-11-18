import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import DateTimePicker from "../components/DateTimePicker";
import RNEInput from "../components/RNEInput";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import { Feather } from "@expo/vector-icons";
import { colors } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";

export default function MakeRequest() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Classroom 20", value: "classroom20" },
    { label: "Classroom 21", value: "classroom21" },
    { label: "Classroom 22", value: "classroom22" },
    { label: "Classroom 23", value: "classroom23" },
    { label: "Mini CCF", value: "miniCCF" },
    { label: "PG Lab", value: "pgLab" },
  ]);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          resource: "",
          fromDate: new Date(),
          toDate: new Date(),
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ setFieldValue, values, submitForm }) => (
          <>
            <View>
              <Text style={styles.title}>Select Resource</Text>

              <DropDownPicker
                containerProps={{ style: styles.dropdown }}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />

              <View>
                <DateTimePicker from={true} name="fromDate" />
                {/* <Text>From</Text>
                  <Text>{formatAMPM(values.fromDate)}</Text> */}
              </View>

              <View>
                <DateTimePicker from={false} name="toDate" />
                {/* <Text>To</Text>
                  <Text>{formatAMPM(values.fromDate)}</Text> */}
              </View>

              <Text style={styles.title}>Link</Text>
              <RNEInput
                bg={colors.grey5}
                placeholder={"Permission Letter Link"}
                name="letterLink"
              />
              <Text style={styles.title}>Details</Text>
              <RNEInput
                bg={colors.grey5}
                multiline={true}
                placeholder={"Details"}
                name="details"
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
    marginHorizontal: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdown: {
    marginHorizontal: 3,
    marginBottom: 5,
  },
});
