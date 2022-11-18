import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors } from 'react-native-elements'

export default function ProfileCard() {
  return (
    <View style={styles.container}>
      <View style={{
      }}>
        <View style={styles.imagecontainer}>
          <Image style={styles.image} source={require("../../../assets/user-icon.png")} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Name:  </Text>
          <Text style={styles.info}>Vinayak Gaikwad</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Email:  </Text>
          <Text style={styles.info}>vinayak@wlug.org</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={styles.label}> Department:  </Text>
          <Text style={styles.info}> Computer Science and Engineering</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Club:  </Text>
          <Text style={styles.info}>WLUG</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Contact:  </Text>
          <Text style={styles.info}>9798578596</Text>
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