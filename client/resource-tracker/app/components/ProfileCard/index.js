import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors } from 'react-native-elements'
import useAuth from '../../auth/useAuth'

export default function ProfileCard() {
  const { user } = useAuth()

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <View style={styles.container}>
      <View style={{
      }}>
        <View style={styles.imagecontainer}>
          <Image style={styles.image} source={require("../../../assets/user-icon.png")} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Name:  </Text>
          <Text style={styles.info}>{user.name}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Email:  </Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={styles.label}> Department:  </Text>
          <Text style={styles.info}> {user.department}</Text>
        </View>
        
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Club:  </Text>
          {
            user.role[0] === "representative" && <Text style={styles.info}>{user.representative_club}</Text>}
          {
            user.role[0] === "advisor" && <Text style={styles.info}>{user.advisor_clubs}</Text>
          }
          
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Role  </Text>
          { user.role.map((role, index) => {
            return <Text style={styles.info}> {capitalizeFirstLetter(role)} </Text>
          }
          )}
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Contact:  </Text>
          <Text style={styles.info}>{user.mobile_number}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    resizeMode: "contain",
  },
  container: {
    margin: 10,
    padding: 10,
    borderColor: colors.grey3,
    borderWidth: 2,
    borderRadius: 5
  },
  info: {
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold"
  },

  imagecontainer: {
    paddingVertical: 10,
    marginBottom: 10
  }

})