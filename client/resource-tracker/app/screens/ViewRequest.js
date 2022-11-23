import { View, Text, StyleSheet, Modal, Image } from "react-native";
import React, { useState } from "react";
import AppButton from "../components/AppButton";
import ShowTitleInfo from "../components/ShowTitleInfo";
import { Input } from "react-native-elements";
import { colors } from "../configs/variables";

const obj = [
  { title: "Applicant", data: "Vinayak Gaikwad" },
  { title: "Club", data: "Walchnad Linux Users Group" },
  { title: "Resource Name", data: "Classroom No 21" },
  { title: "Date", data: "12 November 2022" },
  { title: "Time", data: "10 AM to 1 PM" },
  { title: "Letter", data: "Letter.link" },
];

export default function ViewRequest() {
  const [role, setRole] = useState("teacher");
  const [suggestModalVisible, setSuggestModalVisible] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [qrModalVisible, setQRModalVisible] = useState(false);

  const handleSuggestionSubmit = (values) => {
    setSuggestModalVisible(!suggestModalVisible);
    console.log(suggestions);
  };
  return (
    <>
      <View style={styles.container}>
        <View>
          {obj.map((info, index) => {
            return (
              <View key={index}>
                <ShowTitleInfo title={info.title} data={info.data} />
              </View>
            );
          })}
        </View>

        {role !== "teacher" ? (
          <>
            <View style={styles.buttonGroup}>
              <AppButton
                onPress={() => setSuggestModalVisible(!modalVisible)}
                title={"Ask Details"}
              />
              <AppButton buttonStyles={styles.button} title={"Reject"} />
              <AppButton title={"Accept"} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.buttonGroup}>
              <AppButton buttonStyles={styles.button} title={"Edit"} />
              <AppButton onPress={() => setQRModalVisible(!qrModalVisible)} title={"Show QR"} />
              <AppButton title={"Withdraw"} />
            </View>
          </>
        )}
        {/*  */}
      </View>

      <View>
        <Modal
          animationType="slide"//slide, fade, none
          transparent={true}
          visible={suggestModalVisible}
          onRequestClose={() => {
            setSuggestModalVisible(!suggestModalVisible);
          }}
         
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Input
                onChangeText={(text) => setSuggestions(text)}
                placeholder={"Enter Suggestions"}
                label={"Add Suggestions"}
                multiline={true}
                inputStyle={{
                  backgroundColor: colors.lightgrey,
                }}
                inputContainerStyle={{
                  borderBottomWidth: 2,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  backgroundColor: colors.lightgrey,
                  borderRadius: 5,
                }}
                labelStyle={{
                  color: "black",
                  marginBottom: 5,
                }}
              />
              <AppButton
                onPress={handleSuggestionSubmit}
                buttonStyles={{ padding: 12 }}
                title={"Submit"}
              />
            </View>
          </View>
        </Modal>
      </View>

      <View>
        <Modal
          animationType="slide"//slide, fade, none
          transparent={true}
          visible={qrModalVisible}
          onRequestClose={() => {
            setQRModalVisible(!qrModalVisible)
          }}
         
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <Image style={styles.image} source={require("../../assets/testQR.png")} ></Image>
             
              <AppButton
                
                buttonStyles={{ padding: 12 }}
                title={"Hide QR"}
                onPress={() => setQRModalVisible(!qrModalVisible)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
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
    justifyContent: "space-between",
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
  centeredView: {
    justifyContent: "center",
  },
  modalView: {
    flexDirection: "column",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  image:{
    width: 300, 
    height:300
  }
});
