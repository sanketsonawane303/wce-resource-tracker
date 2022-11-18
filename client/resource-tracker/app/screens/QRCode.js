import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>

      <View>
        <View style={styles.heading}>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold"
          }}>Scan The QR code</Text>
        </View>
        <View style={{
          alignItems: "center"
        }}>
          <View style={styles.scanner}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

          </View>

        </View>

      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  scanner: {
    justifyContent: "center",
    width: 300,
    height: 300,
    marginTop: 50
  },
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: "center"

  },
  heading: {
    alignItems: "center"
  }
}); 