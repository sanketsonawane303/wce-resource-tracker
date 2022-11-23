import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import DropDownPicker from 'react-native-dropdown-picker';
import AppButton from '../components/AppButton';
import AppImagePicker from '../components/ImagePicker';
import ResourceInfoCard from '../components/ResourceInfoCard';
import RequestCard from '../components/RequestCard';
import RequestInfoShortCard from '../components/RequestInfoShortCard';

const items = [{
  label: "Handover Keys", value: "handover"
},
{ label: "Return", value: "return" }
]

export default function ApproveResource() {
  const [photo, setPhoto] = useState({})
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);


  const handleCamera = async () => {
    try {
      const result = await launchImageLibrary()

    } catch (error) {
      console.log(error)
    }

  }

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
      <ScrollView>
        <View style={styles.form}>
          <View style={{
            marginBottom: 20
          }}>
            <DropDownPicker
              containerProps={{ style: styles.dropdown }}
              open={open}
              value={value}
              items={items}
              placeholder="Select Exchange Type"
              setOpen={setOpen}
              setValue={setValue}
              onChangeValue={(value) => {
              }}
            />
          </View>
          <View style={styles.scanner}>
            <Text style={{
              fontWeight: "bold",
              marginBottom: 5,
              fontSize: 20
            }}>
              Scan the QR Code of Request
            </Text>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              // style={StyleSheet.absoluteFillObject}
              style={{
                width: 200,
                height: 200
              }}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

          </View>

          <View style={styles.resourceinfo}>
            <RequestInfoShortCard />
          </View>

          <View style={styles.capture}>
            <View>
              <Text style={styles.heading}>Attach the Image</Text>
            </View>
            <AppImagePicker
              imageUri={photo?.uri}
              onChangeImage={(val) => {
                setPhoto(val)
              }}
            />
          </View>
        </View>



      </ScrollView>
      <View>
        <AppButton
          title={"Submit"}
          onPress={() => {

          }}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  scanner: {
    marginHorizontal: 10,
    alignItems: "center"
  },
  form: {
    marginVertical: 10
  },
  resourceinfo: {
    marginTop: 20
  },
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: "space-between"

  },
  heading: {
    fontSize: 20,
    fontWeight: "bold"
  },
  capture: {
    marginHorizontal: 10,
    marginTop: 10,
  }
}); 