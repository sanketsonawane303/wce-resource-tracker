import { View, Text } from 'react-native'
import React from 'react'
import AppTextInput from '../components/AppTextInput'


export default function SIgnIn() {
  return (
    <View>
      <Text>SIgnIn</Text>
      <Text>Username</Text>
      <AppTextInput placeholder= {"Username"}/>
      <Text>Password</Text>
      <AppTextInput placeholder={"Password"} />
      
    </View>
  )
}