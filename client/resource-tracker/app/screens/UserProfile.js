import { View, Text } from 'react-native'
import React from 'react'
import ProfileCard from '../components/ProfileCard'

export default function UserProfile() {
  return (
    <View style={{
      flex: 1,
      marginTop: 50
    }}>
      <ProfileCard />
    </View>
  )
}