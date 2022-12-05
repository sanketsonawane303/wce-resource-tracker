import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input } from "react-native-elements";
import { colors } from "../../configs/variables";
import { useFormikContext } from "formik";

export default function RNEInput({
  placeholder,
  label,
  multiline,
  bg,
  onInputChange,
  defaultValue,
  name,
  error,
  ...otherProps
}) {
  const { setFieldValue } = useFormikContext();
  return (
    <Input
      secureTextEntry={name === "password" ? true : false}
      defaultValue={defaultValue}
      onChangeText={(text) => setFieldValue(name, text)}
      placeholder={placeholder}
      label={label}
      multiline={multiline}
      inputStyle={{
        backgroundColor: bg ? bg : colors.lightgrey,
      }}

      inputContainerStyle={{
        borderBottomWidth: 2,
        // borderWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: bg ? bg : colors.lightgrey,
        borderRadius: 5,

      }}
      labelStyle={{
        color: "black",
        marginBottom: 5,
      }}
      errorMessage={error}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({});
