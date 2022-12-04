import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFormikContext } from "formik";
import AppButton from "../AppButton";
import { Feather } from "@expo/vector-icons";

const formatAMPM = (date) => {
  var month = date.getUTCMonth() + 1; //months from 1-12
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  var strDate = day + "/" + month + "/" + year;
  return strDate + " " + strTime;
};

const DateTimePicker = ({ name, from }) => {
  const { setFieldValue, values } = useFormikContext();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFieldValue(name, date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{from ? "From" : "To"}</Text>

        <View style={styles.timeContainer}>
          <Text style={styles.card}>
            {from ? formatAMPM(values.fromDate) : formatAMPM(values.toDate)}
          </Text>
          <AppButton
            buttonStyles={styles.button}
            onPress={showDatePicker}
            IconComponent={<Feather name="calendar" size={24} color="black" />}
          />
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderColor: "grey",
    borderWidth: 2,
    fontSize: 20,
    paddingVertical: 12,
    borderRadius: 10,
    textAlign: "center",
  },

  button: {
    marginHorizontal: 5,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default DateTimePicker;
