import { View, Text, StyleSheet, Modal, Image } from "react-native";
import React, { useState, useEffect } from "react";
import AppButton from "../components/AppButton";
import ShowTitleInfo from "../components/ShowTitleInfo";
import { Input } from "react-native-elements";
import { colors } from "../configs/variables";
import useAuth from "../auth/useAuth";
import { approveRequest, deleteRequest, updateRequest } from "../apis/request";
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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [link, setLink] = useState("");

  const { request } = route.params;

  console.log(request);
  // "approved", "declined", "pending", "changesRequired"
  const handleSuggestionSubmit = async () => {
    const body = {
      id: request._id,
      action: status,
      remarks: suggestions,
    };
    //console.log(body);
    try {
      const res = await approveRequest(body);
      status;
      if (res.ok && res.data.status == "success") {
        setSuggestModalVisible(!suggestModalVisible);
        navigation.navigate("RequestStack", { screen: "AllRequests" });
      } else {
        //  console.log(res.data);
      }
    } catch (err) {
      // console.log(err);
    }

    //    console.log(status);
  };

  const handleDeleteRequest = async () => {
    try {
      const res = await deleteRequest(request._id);
      if (res.ok && res.data.status == "success") {
        alert("Request Withdrawn");
        navigation.navigate("RequestStack", { screen: "AllRequests" });
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    try {
      const res = await updateRequest({
        id: request._id,
        link: link,
      });

      if (res.ok && res.data.status == "success") {
        setEditModalVisible(!editModalVisible);
        navigation.navigate("RequestStack", { screen: "RequestList" });
      } else {
        console.log(res.data);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

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
              request.resources.list.map((item, index) => {
                return <Text key={index} style={styles.data}>{item}</Text>
              })
            }
            <Text style={styles.data}>{request.resources.department}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>Duration</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.data}>From </Text>
              <Text style={styles.data}>
                {formatAMPM(new Date(request?.time?.from))}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.data}>To </Text>
              <Text style={styles.data}>
                {formatAMPM(new Date(request?.time?.to))}
              </Text>
            </View>


            <View style={styles.status}>
              <Text style={styles.title}>Status: {request.status}</Text>
            </View>

            <View style={styles.status}>
              <Text style={styles.title}>History</Text>
            </View>


            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,

            }}>
              <View style={{
                width: 10,
                height: 10,
                borderRadius: 50,
                backgroundColor: "green",
              }}>

              </View>
              <View style={{ marginLeft: 10 }}><Text style={{
                color: "green",
                fontWeight: "500"
              }}>Request Submitted</Text></View>
            </View>

            <View style={styles.approvalbox}>
              {
                request?.approvals.map((item, index) => {
                  return (<View key={index}>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10

                    }}>
                      <View style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: "green",
                      }}>

                      </View>
                      <View style={{ marginLeft: 10 }}><Text style={{
                        color: "green",
                        fontWeight: "500"
                      }}>Approved by {item.role}</Text></View>
                    </View>

                  </View>)
                })
              }
            </View>

          </View>
        </View>

        {user.role.includes("advisor") || user.role.includes("hod") ? (
          <>
            <View style={styles.buttonGroup}>
              {((user.role.includes("advisor") &&
                request.status == "pending") ||
                (user.role.includes("hod") &&
                  request.status == "approved by advisor")) && (
                  <>
                    <AppButton
                      onPress={() => {

                        setStatus("changes required");
                        setSuggestModalVisible(!suggestModalVisible);
                      }}
                      title={"Changes Required"}
                      name={"changesRequired"}
                    />

                    <AppButton
                      onPress={() => {
                        setStatus("approved");

                        setSuggestModalVisible(!suggestModalVisible);
                      }}
                      name={"accept"}
                      title={"Accept"}
                    />
                  </>
                )}

              {((user.role.includes("advisor") &&
                request.status == "pending") ||
                user.role.includes("hod")) && (
                  <AppButton
                    onPress={() => {
                      setStatus("declined");
                      setSuggestModalVisible(!suggestModalVisible);
                    }}
                    buttonStyles={styles.button}
                    name={"declined"}
                    title={"Reject"}
                  />
                )}
            </View>
          </>
        ) : (
          <>
            <View style={styles.buttonGroup}>
              {request.status == "changes required" && <AppButton buttonStyles={styles.button} title={"Edit"} onPress={() => setEditModalVisible(!editModalVisible)} />}

              {/* <AppButton
                onPress={() => setQRModalVisible(!qrModalVisible)}
                title={"Show QR"}
              /> */}
              <AppButton
                onPress={() => handleDeleteRequest(request._id)}
                title={"Withdraw"}
              />
            </View>
          </>
        )}
        {/*  */}
      </View>

      <View>
        <Modal
          animationType="slide" //slide, fade, none
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => {
            setEditModalVisible(!editModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Input
                onChangeText={(text) => setLink(text)}
                placeholder={"Add Updated Link"}
                label={"Link"}
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
                onPress={() => handleEdit()}
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
  status: {
    marginTop: 30
  },
  approvalbox: {
  }
});
