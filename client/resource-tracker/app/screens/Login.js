import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Formik } from "formik";
import RNEInput from "../components/RNEInput";
import AppButton from "../components/AppButton";
import { colors } from "../configs/variables";
import authApi from '../apis/auth';
import useAuth from "../auth/useAuth";
export default function Login() {
  const { logIn, user } = useAuth();
  const handleSignin = async (values) => {

    try {
      const res = await authApi.signIn(values);
      console.log(res);
      if (res.ok && res.data.status == "success") {
        const token = res.data.data.token;
        // console.log(token);
        logIn(token);

        // console.log(user)
      }
      else {
        console.log(res.data.status);
      }
    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Image
          style={{ width: 180, height: 180, marginBottom: 30 }}
          source={require("../../assets/icon.png")}
        />
      </View>

      {/* {wrong && (
        <View
          style={{
            marginHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {error}
          </Text>
        </View>
      )} */}

      <View style={styles.userdetailscontainer}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          //   validationSchema={validationSchema}
          onSubmit={handleSignin}
        >
          {({ values, errors, touched, setFieldValue, submitForm }) => (
            <>
              <View>
                <RNEInput
                  placeholder="E-mail"
                  onInputChange={() => { }}
                  bg="white"
                  name="email"
                  error={touched.email && errors.email}
                />
                <RNEInput
                  placeholder="Password"
                  onInputChange={() => { }}
                  bg="white"
                  name="password"
                  error={touched.password && errors.password}
                />
              </View>
              {/* {loading && (
                <View
                  style={{
                    alignSelf: "flex-start",
                    marginHorizontal: 10,
                  }}
                >
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )} */}

              <View style={styles.loginbuttons}>
                <View>
                  <AppButton
                    title="Sign In"
                    onPress={submitForm}
                    buttonStyles={{
                      paddingHorizontal: 20,
                      borderRadius: 5,
                      paddingVertical: 10,
                    }}
                  />
                </View>
              </View>
              <View style={styles.text}>
                <Text style={{ fontSize: 15 }}>Don't have an account?</Text>

                <Text
                  onPress={() => {
                    // navigation.navigate("Signup");
                  }}
                  style={{
                    fontSize: 15,
                    paddingLeft: 10,
                    opacity: 0.7,
                    color: colors.primary,
                    textDecorationLine: "underline",
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </Text>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },
  imagecontainer: {
    margin: 10,
    flexDirection: "row",
  },
  userdetailscontainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  loginbuttons: {
    paddingHorizontal: 10,
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 0,
  },
  text: {
    marginTop: 0,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  password: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
