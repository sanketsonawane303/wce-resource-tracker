import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import ProfileCard from "../components/ProfileCard";
import useAuth from "../auth/useAuth";
import { colors } from "../configs/variables";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function UserProfile() {
  const { user } = useAuth();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image
          style={styles.image}
          source={require("../images/user.jpg")}
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
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5 name="building" size={20} color="black" />
          <Text style={styles.label}>Department</Text>
        </View>
        <Text style={styles.info}>{user.department}</Text>
      </View>

      {user.role[0] === "representative" && (
        <View style={styles.textContainer}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5 name="building" size={20} color="black" />
            <Text style={styles.label}>Representative Club </Text>
          </View>

          <Text style={styles.info}>{user.representative_club}</Text>
        </View>
      )}

      {user.role[0] === "advisor" && (
        <View style={styles.textContainer}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5 name="building" size={20} color="black" />
            <Text style={styles.label}>Advisor Club </Text>
          </View>

          {user.advisor_club.map((club, index) => {
            return (
              <Text style={styles.info}>{capitalizeFirstLetter(club)} </Text>
            );
          })}
        </View>
      )}

      <View style={styles.textContainer}>
        <View style={{ flexDirection: "row" }}>
          <Feather name="user" size={20} color="black" />
          <Text style={styles.label}>Role </Text>
        </View>
        {user.role.map((role, index) => {
          return (
            <Text key={index} style={styles.info}>{capitalizeFirstLetter(role)} </Text>
          );
        })}
      </View>

      <View style={styles.textContainer}>
        <View style={{ flexDirection: "row" }}>
          <Entypo name="mobile" size={20} color="black" />
          <Text style={styles.label}>Contact </Text>
        </View>
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
    marginLeft: 10,
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
    paddingVertical: 10,
  },
});
