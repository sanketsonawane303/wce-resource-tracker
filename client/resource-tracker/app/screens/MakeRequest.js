import { View, Text } from 'react-native'
import React from 'react'
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'

export default function MakeRequest() {
  return (
    <View>
        <Text>MakeRequest</Text>
        <Text>Select Resource</Text>
        <Text> ----Resource 1</Text>
        <Text> ----resource 2</Text>

        <Text>Time and Date</Text>
        <Text>Time and Date Selector</Text>
        
        <Text>Link</Text>
        <AppTextInput/>
        <AppButton title={"submit"}/>
      
    </View>
  )
}