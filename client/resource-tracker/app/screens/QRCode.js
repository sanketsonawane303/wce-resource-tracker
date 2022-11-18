import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeScreen = (props) => {
   
    return (
        <QRCode
        value="http://awesome.link.qr"
      />
    );
};

export default QRCodeScreen;