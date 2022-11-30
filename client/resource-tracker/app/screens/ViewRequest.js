import { View, Text, StyleSheet, Modal, Image } from "react-native";
import React, { useState, useEffect } from "react";
import AppButton from "../components/AppButton";
import ShowTitleInfo from "../components/ShowTitleInfo";
import { Input } from "react-native-elements";
import { colors } from "../configs/variables";
import useAuth from "../auth/useAuth";
import { updateRequest } from "../apis/request";
import ResourceList from "./ResourceList";

const obj = [
  { title: "Applicant", data: "Vinayak Gaikwad" },
  { title: "Club", data: "Walchnad Linux Users Group" },
  { title: "Resource Name", data: "Classroom No 21" },
  { title: "Date", data: "12 November 2022" },
  { title: "Time", data: "10 AM to 1 PM" },
  { title: "Letter", data: "Letter.link" },
];

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

export default function ViewRequest({ navigation, route }) {
  
  
  const { user } = useAuth();

  const [suggestModalVisible, setSuggestModalVisible] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [qrModalVisible, setQRModalVisible] = useState(false);
  const [status, setStatus] = useState("");

  const {request} = route.params;
  // "approved", "declined", "pending", "changesRequired"
  const handleSuggestionSubmit = async () => {
    const body = {
      id: request._id,
      action: status,
      remarks: suggestions,
    };
    console.log(body);
    try {
      const res = await updateRequest(body);
      status;
      if (res.ok && res.data.status == "success") {

        setSuggestModalVisible(!suggestModalVisible);
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }

    console.log(status);
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.info}>
            <Text style={styles.title}>Applicant</Text>
            <Text style={styles.data}>{request.applicant}</Text>
          </View>
          
          <View style={styles.info}>
            <Text style={styles.title}>Club</Text>
            <Text style={styles.data}>{request.club}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>Resource</Text>
           
            {
              request.resources.list.map(item =>{
                return <Text style={styles.data}>{item}</Text>
              })
            }
             <Text style={styles.data}>{request.resources.department}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>Duration</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
            <Text style={styles.data}>From </Text>
            <Text style={styles.data}>{formatAMPM(new Date(request.time.from))}</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.data}>To </Text>
            <Text style={styles.data}>{formatAMPM(new Date(request.time.to))}</Text>
            </View>
           
          </View>
          
        


          
        </View>

        {!user.role.includes("advisor") || !user.role.includes("HOD") ? (
          <>
            <View style={styles.buttonGroup}>
              <AppButton
                onPress={() => {
                  setStatus("changesRequired");
                  setSuggestModalVisible(!suggestModalVisible);
                }}
                title={"Ask Details"}
                name={"changesRequired"}
              />
              <AppButton
                onPress={() => {
                  setStatus("declined");
                  setSuggestModalVisible(!suggestModalVisible);
                }}
                buttonStyles={styles.button}
                name={"declined"}
                title={"Reject"}
              />
              <AppButton
                onPress={() => {
                  setStatus("approved");
                  setSuggestModalVisible(!suggestModalVisible);
                }}
                name={"accept"}
                title={"Accept"}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.buttonGroup}>
              <AppButton buttonStyles={styles.button} title={"Edit"} />
              <AppButton
                onPress={() => setQRModalVisible(!qrModalVisible)}
                title={"Show QR"}
              />
              <AppButton title={"Withdraw"} />
            </View>
          </>
        )}
        {/*  */}
      </View>

      <View>
        <Modal
          animationType="slide" //slide, fade, none
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
                placeholder={"Add details/suggestions"}
                label={"Details"}
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
                onPress={() => handleSuggestionSubmit()}
                buttonStyles={{ padding: 12 }}
                title={"Submit"}
              />
            </View>
          </View>
        </Modal>
      </View>

      <View>
        <Modal
          animationType="slide" //slide, fade, none
          transparent={true}
          visible={qrModalVisible}
          onRequestClose={() => {
            setQRModalVisible(!qrModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                style={styles.image}
                source={require("../../assets/testQR.png")}
              ></Image>

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
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    paddingVertical: 10,
  },
  data: {
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
  },
});
