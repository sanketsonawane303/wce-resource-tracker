import { View, Text } from 'react-native'
import React from 'react'

import QRCode from 'react-native-qrcode-svg'

export default function QrCode() {
  return (
    <View>
      <Text>QrCode</Text>
      <QRCode
      value='hiii'
      size={290}
      color='white'
      backgroundColor='black'
      >

      </QRCode>
    </View>
  )
}