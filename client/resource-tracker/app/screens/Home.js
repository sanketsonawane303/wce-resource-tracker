import { View, Text, Image } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={{
      flex: 1,
      paddingTop: 50,
      alignItems: 'center',
      backgroundColor: "white"
    }}>
      <Image source={require("../images/wce.jpg")} style={{
        width: 200,
        height: 200,
      }} />
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black"
        }}>Welcome to WCE Resource Tracker</Text>
      </View>
    </View>
  )
}

export default Home