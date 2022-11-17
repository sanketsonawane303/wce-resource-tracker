import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AppButton from "../components/AppButton";
import { StatusBar } from "react-native";
import ShowTitleInfo from "../components/ShowTitleInfo";

const obj = [
  { title: "Applicant", data: "Vinayak Gaikwad" },
  { title: "Club", data: "Walchnad Linux Users Group" },
  { title: "Resource Name", data: "Classroom No 21" },
  { title: "Date", data: "12 November 2022" },
  { title: "Time", data: "10 AM to 1 PM" },
  { title: "Letter", data: "Letter.link" },
];

export default function ViewRequest() {
  return (
    <View style={styles.container}>
      <View>
      {obj.map((info) => {
        return (
          <>
            <ShowTitleInfo
              key={info.title + info.data}
              title={info.title}
              data={info.data}
            />
          </>
        );
      })}
      </View>

      <View style={styles.buttonGroup}>
        <AppButton buttonStyles={styles.button} title={"Suggestions"} />
        <AppButton title={"Submit"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    justifyContent:'space-between'
  },
  info: {
    paddingVertical: 10,
  },
  data: {
    fontSize: 18,
  },
  buttonGroup: {
    
    flexDirection: "row",
    justifyContent: "space-between",

  },
  button: {
    
  },
});
