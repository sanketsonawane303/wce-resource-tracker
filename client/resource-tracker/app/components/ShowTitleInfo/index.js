import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ShowTitleInfo({title, data}) {
  return (
   
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>
    
  )
}

const styles = StyleSheet.create({
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
  });
  