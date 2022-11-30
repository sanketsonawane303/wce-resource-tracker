import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import DateTimePicker from "../components/DateTimePicker";
import RNEInput from "../components/RNEInput";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import { Feather } from "@expo/vector-icons";
import { colors } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import MessageModal from "../components/MessageModal";
import { getResource } from "../apis/resource";
import { Departments } from "../configs/variables";
import useAuth from "../auth/useAuth";
import { makeRequest } from "../apis/request";
import { Modal } from "react-native";

export default function MakeRequest() {
  const [deptValue, setDeptValue] = useState("");
  const [deptOpen, setDeptOpen] = useState(false);
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  const [modal, setModalState] = useState(false);
  const [resources, setResources] = useState([]);
  const [currResource, setCurrResource] = useState(null);
  const [resourceModalVisible, setResourceModalVisible] = useState(false);
  const [message, setMessage] = useState(null);

  // const [items, setItems] = useState([
  //   { label: "Classroom 20", value: "classroom20" },
  //   { label: "Classroom 21", value: "classroom21" },
  //   { label: "Classroom 22", value: "classroom22" },
  //   { label: "Classroom 23", value: "classroom23" },
  //   { label: "Mini CCF", value: "miniCCF" },
  //   { label: "PG Lab", value: "pgLab" },
  // ]);\
  const { user } = useAuth();
  // console.log(user);

  const handleOnSubmit = async (values) => {
    values.resource = currResource;
    const body = {
      applicant: user.name,
      club: user.representative_club,
      resources: {
        list: [values.resource],
        department: deptValue,
      },
      time: {
        from: values.fromDate,
        to: values.toDate,
      },
      letter: values.letterLink,
      details: values.details,
    };
    //console.log({ body });
    try {
      const res = await makeRequest(body);
      //console.log(res)
      // console.log(res);

      if (res.ok && res.data.status == "success") {
        // console.log(res.data)
        setModalState(true);
      } else {
        if (res.data.err.msg === "Resources already occupied for given time period") {
          const request = res.data.err.request[0];
          //console.log(request);
          const msg = {
            message: res.data.err.msg,
            applicant: request.applicant,
            club: request.club,
            status: request.status,

          }
          setMessage(msg);
          setResourceModalVisible(true);
        }

      }
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    const loadResources = async () => {
      try {
        const res = await getResource({ department: deptValue });
        if (res.ok && res.data.status == "success") {
          const list = res.data.data.map((item) => {
            return { label: item.name, value: item.name };
          });
          // console.log(user);
          // console.log({ list });
          setResources(list);
        } else {
          // console.log(res.data.status);
        }
      } catch (err) {
        //console.log(err);
      }
    };

    loadResources();
  }, [deptValue]);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          resource: "",
          fromDate: new Date(),
          toDate: new Date(),
          letterLink: "",
          details: "",
        }}
        onSubmit={(values) => handleOnSubmit(values)}
      >
        {({ setFieldValue, values, submitForm }) => (
          <>
            <View>
              <Text style={styles.title}>Select Department</Text>
              <DropDownPicker
                containerProps={{ style: styles.dropdown }}
                open={deptOpen}
                value={deptValue}
                items={Departments}
                setOpen={setDeptOpen}
                setValue={setDeptValue}
                setItems={deptValue}
              />

              <Text style={styles.title}>Select Resource</Text>

              <DropDownPicker
                containerProps={{ style: styles.dropdown }}
                open={open}
                value={currResource}
                items={resources}
                setOpen={setOpen}
                setValue={setCurrResource}
                setItems={setResources}
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

            <View>
              <MessageModal
                visible={modal}
                message="Request Submitted Sucessfully"
                buttonComponent={
                  <AppButton
                    title="OK"
                    buttonStyles={{
                      width: 150,
                      paddingVertical: 10,
                    }}
                    onPress={() => {
                      setModalState(!modal);
                    }}
                  />
                }
              />
            </View>
          </>
        )}
      </Formik>

      <Modal
        animationType="slide"//slide, fade, none
        transparent={true}
        visible={resourceModalVisible}
        onRequestClose={() => {
          setResourceModalVisible(!resourceModalVisible);
        }}

      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {message && (
              <>
                <Text style={styles.modalText}>{message.message}</Text>
                <Text style={styles.modalText}>{message.applicant}</Text>
                <Text style={styles.modalText}>{message.club}</Text>
                <Text style={styles.modalText}>{message.status}</Text>
              </>
            )}

            <AppButton
              onPress={() => setResourceModalVisible(!resourceModalVisible)}
              buttonStyles={{ padding: 12 }}
              title={"OK"}
            />
          </View>
        </View>
      </Modal>
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
  }
});
