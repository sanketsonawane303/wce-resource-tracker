import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "react-native-elements";
import useAuth from "../../auth/useAuth";

export default function ProfileCard() {
  const { user } = useAuth();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image
          style={styles.image}
          source={require("../../images/user.jpg")}
        />

        <View style={styles.textContainer}>
          {/* <Text style={styles.label}> Name: </Text> */}
          <Text style={{ fontSize: 26, fontWeight: "500" }}>{user.name}</Text>

          <Text style={styles.info}>{user.email}</Text>
        </View>
      </View>

      {/* <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Email: </Text>
          <Text style={styles.info}>{user.email}</Text>
        </View> */}
      <View style={styles.textContainer}>
        <Text style={styles.label}>Department</Text>
        <Text style={styles.info}>{user.department}</Text>
      </View>

      <View style={styles.textContainer}>
        {user.role[0] === "representative" && (
          <>
            <Text style={styles.label}>Club: </Text>
            <Text style={styles.info}>{user.representative_club}</Text>
          </>
        )}
        {user.role[0] === "advisor" && (
          <Text style={styles.info}>{user.advisor_clubs}</Text>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.label}>Role </Text>
        {user.role.map((role, index) => {
          return (
            <Text style={styles.info}>{capitalizeFirstLetter(role)} </Text>
          );
        })}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.label}>Contact </Text>
        <Text style={styles.info}>{user.mobile_number}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    resizeMode: "contain",
    marginRight: 20,
  },
  container: {
    paddingHorizontal: 20,
    borderColor: colors.grey3,
  },
  info: {
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },

  imagecontainer: {
    flexDirection: "row",
    paddingVertical: 10,
    marginBottom: 10,
    // justifyContent: 'space-between',
  },

  textContainer: {
    flexDirection: "column",
    paddingVertical: 5,
  },
});
