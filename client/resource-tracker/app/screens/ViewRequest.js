import { View, Text} from 'react-native'
import React from 'react'
import AppButton from '../components/AppButton'

export default function ViewRequest() {
  return (
    <View>
        <Text>Applicat</Text>
        <Text>Resource</Text>
        <Text>time: from :: to</Text>
        <Text>Letter Link</Text>
        
        <AppButton title={"Suggestions"} />
        <AppButton title={"Submit"}/>

    </View>
  )
}