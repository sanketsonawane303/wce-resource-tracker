import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import RNEInput from "../components/RNEInput";
import AppButton from "../components/AppButton";
import { Formik } from "formik";
import DropDownPicker from "react-native-dropdown-picker";
import { colors, Departments, Clubs, Roles } from "../configs/variables";
import {signUp} from "../apis/auth";

// Department items

export default function AddUser() {
  const [deptOpen, setDeptOpen] = useState(false);
  const [deptValue, setDeptValue] = useState(null);

  const [clubOpen, setClubOpen] = useState(false);
  const [clubValue, setClubValue] = useState(null);

  const [roleOpen, setRoleOpen] = useState(false);
  const [roleValue, setRoleValue] = useState(null);

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
        onSubmit={(values) => {
          const body = {
            department: deptValue,
            club: roleValue === 'representative' ? clubValue : [clubValue] ,
            role: roleValue === 'hodAndAdvisor' ? ['hod', 'advisor'] : [roleValue],
            name: values.name,
            email: values.email,
            password: values.password,
            mobile: values.mobile,
          };
          console.log(body);

          try{
            const res = signUp(body);
            console.log(res);
            if(res.ok && res.data.status === 'success'){
              console.log('success');

            }
            else{
              console.log(res.data)
            }

          }catch(e){
            console.log(e);
          }

        }}
      >
        {({ setFieldValue, values, submitForm, }) => (
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
              
              {
                ["representative", "advisor", "hodAndAdvisor"].includes(roleValue) && (
                  <>
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
                  </>
                )
              }
              

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
    marginHorizontal: 5,
  },
  dropdown: {
    marginHorizontal: 5,
    marginBottom: 5,
  },
});