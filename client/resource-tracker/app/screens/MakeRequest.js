import { View, Text } from 'react-native'
import React from 'react'
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'

const resourceList = [
  {label: "Classroom 20", value: "classroom20"},
  {label: "Classroom 21", value: "classroom21"},
  {label: "Classroom 22", value: "classroom22"},
  {label: "Classroom 23", value: "classroom23"},
  {label: "Mini CCF", value: "miniCCF"},
  {label: "PG Lab", value: "pgLab"},


]

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