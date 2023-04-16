import { useState } from "react";
import { View, Text, StyleSheet, ScrollView,  } from "react-native";
import React from "react";
import RNEInput from "../components/RNEInput";
import AppButton from "../components/AppButton";
import { Formik } from "formik";
import DropDownPicker from "react-native-dropdown-picker";
import { colors, Departments, Clubs, Roles } from "../configs/variables";
import { signUp } from "../apis/auth";
import { Modal } from "react-native";

// Department items

export default function AddUser() {
  const [deptOpen, setDeptOpen] = useState(false);
  const [deptValue, setDeptValue] = useState(null);

  const [clubOpen, setClubOpen] = useState(false);
  const [clubValue, setClubValue] = useState(null);

  const [roleOpen, setRoleOpen] = useState(false);
  const [roleValue, setRoleValue] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          department: "",
          club: "",
          role: "",
          name: "",
          email: "",
          password: "",
          mobile: "",
        }}
        onSubmit={async (values) => {
          const body = {
            department: deptValue,
            role:
              roleValue === "hodAndAdvisor" ? ["hod", "advisor"] : [roleValue],
            name: values.name,
            email: values.email,
            password: values.password,
            mobile_number: values.mobile,
          };
          if (roleValue === "hodAndAdvisor" || roleValue === "advisor") {
            body.advisor_club = [clubValue];
          } else if (roleValue === "representative") {
            body.representative_club = clubValue;
          }

          console.log({ body });

          try {
            const res = await signUp(body);
            console.log(res);
            if (res.ok && res.data.status === "success") {
              console.log("success");
              setModalVisible(!modalVisible);
              values.name = "";
              values.email = "";
              values.password = "";
              values.mobile = "";

              //TODO: back to home screen
            } else {
              console.log(res.data);
            }
          } catch (e) {
            console.log(e);
          }
        }}
      >

        {({ setFieldValue, values, submitForm }) => (
          <>
            <View>
              <RNEInput
                bg={colors.grey5}
                placeholder={"Name"}
                name="name"
                label={"Name"}
              />
              <Text style={styles.title}>Role</Text>
              <DropDownPicker
                containerProps={{ style: styles.dropdown }}
                open={roleOpen}
                value={roleValue}
                items={Roles}
                placeholder="Select Role"
                setOpen={setRoleOpen}
                setValue={setRoleValue}
                onChangeValue={(value) => {
                  setFieldValue("role", value);
                }}
              />
              <RNEInput
                bg={colors.grey5}
                multiline={true}
                placeholder={"Email"}
                name="email"
                label="Email"
              />
              <RNEInput
                bg={colors.grey5}
                multiline={true}
                placeholder={"Password"}
                name="password"
                label="Password"
              />
              <RNEInput
                bg={colors.grey5}
                multiline={true}
                placeholder={"Mobile No."}
                name="mobile"
                label="Mobile"
                keyboardType="numeric"
              />

              {["representative", "advisor", "hodAndAdvisor"].includes(
                roleValue
              ) && (
                  <>
                  <View>
                    <Text style={styles.title}>Club</Text>
                    <DropDownPicker
                      containerProps={{ style: styles.dropdown }}
                      open={clubOpen}
                      value={clubValue}
                      items={Clubs}
                      placeholder="Select Club"
                      setOpen={setClubOpen}
                      setValue={setClubValue}
                      onChangeValue={(value) => {
                        setFieldValue("club", value);
                      }}
                    />
                    </View>
                  </>
                )}
              
              <Text style={styles.title}>Department</Text>
              <DropDownPicker
                containerProps={{ style: styles.dropdown }}
                open={deptOpen}
                value={deptValue}
                items={Departments}
                placeholder="Select Department"
                setOpen={setDeptOpen}
                setValue={setDeptValue}
                onChangeValue={(value) => {
                  setFieldValue("department", value);
                }}

              />
              
              <AppButton title={"submit"} onPress={submitForm} />
            </View>

            {/* <AppButton title={"submit"} onPress={submitForm} /> */}

          </>
          

        )}
      
      </Formik>



      <Modal
        animationType="slide" //slide, fade, none
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>User Added</Text>
            <AppButton
              onPress={() => setModalVisible(!modalVisible)}
              buttonStyles={{ padding: 12 }}
              title={"Submit"}
            />
          </View>
        </View>
      </Modal>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    marginHorizontal: 15,
    marginVertical: 0,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 0,
    marginHorizontal: 10,
  },
  dropdown: {
    marginHorizontal: 2,
    marginBottom: 2,
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

});
